'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EyeOff, Sparkles, RefreshCw, Sliders, Shield, Eraser } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function BlurCensorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [blurMode, setBlurMode] = useState<'selective' | 'entire'>('selective');
  const [censorType, setCensorType] = useState<'blur' | 'pixelate' | 'blackout'>('pixelate');
  const [blurRadius, setBlurRadius] = useState<number>(12); // 1 to 40
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [activeBox, setActiveBox] = useState<Box | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isProcessing, progress, startProgress, finishProgress } = useProgressAction();
  const [result, setResult] = useState<{
    dataUrl: string;
    newSize: number;
    filename: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!file) {
      setImageSrc(null);
      setImageEl(null);
      setResult(null);
      setBoxes([]);
      return;
    }
    const url = URL.createObjectURL(file);
    setImageSrc(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageEl(img);
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Live Canvas Render
  useEffect(() => {
    if (!imageEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxDim = 520;
    const aspect = imageEl.naturalWidth / imageEl.naturalHeight;
    let w = maxDim;
    let h = maxDim / aspect;
    if (aspect < 1) {
      h = maxDim;
      w = maxDim * aspect;
    }

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    if (blurMode === 'entire') {
      if (censorType === 'blur') {
        ctx.save();
        ctx.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(imageEl, 0, 0, w, h);
        ctx.restore();
      } else if (censorType === 'pixelate') {
        // Pixelate via downscale/upscale
        const scale = Math.max(1, Math.round(w / (blurRadius * 3)));
        const offCanvas = document.createElement('canvas');
        offCanvas.width = scale;
        offCanvas.height = Math.round(h / (w / scale));
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.drawImage(imageEl, 0, 0, offCanvas.width, offCanvas.height);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(offCanvas, 0, 0, offCanvas.width, offCanvas.height, 0, 0, w, h);
          ctx.imageSmoothingEnabled = true;
        }
      } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
      }
    } else {
      // Draw base unblurred image
      ctx.drawImage(imageEl, 0, 0, w, h);

      // Apply boxes
      const allBoxes = activeBox ? [...boxes, activeBox] : boxes;

      allBoxes.forEach((b) => {
        const bx = Math.min(b.x, b.x + b.w);
        const by = Math.min(b.y, b.y + b.h);
        const bw = Math.abs(b.w);
        const bh = Math.abs(b.h);
        if (bw === 0 || bh === 0) return;

        if (censorType === 'blackout') {
          ctx.fillStyle = '#000000';
          ctx.fillRect(bx, by, bw, bh);
        } else if (censorType === 'pixelate') {
          const pixelSize = Math.max(4, Math.round(blurRadius / 1.5));
          const subCanvas = document.createElement('canvas');
          subCanvas.width = Math.max(1, Math.floor(bw / pixelSize));
          subCanvas.height = Math.max(1, Math.floor(bh / pixelSize));
          const subCtx = subCanvas.getContext('2d');
          if (subCtx) {
            subCtx.drawImage(canvas, bx, by, bw, bh, 0, 0, subCanvas.width, subCanvas.height);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(subCanvas, 0, 0, subCanvas.width, subCanvas.height, bx, by, bw, bh);
            ctx.imageSmoothingEnabled = true;
          }
        } else {
          // Blur box
          const subCanvas = document.createElement('canvas');
          subCanvas.width = bw;
          subCanvas.height = bh;
          const subCtx = subCanvas.getContext('2d');
          if (subCtx) {
            subCtx.filter = `blur(${blurRadius}px)`;
            subCtx.drawImage(imageEl, (bx / w) * imageEl.naturalWidth, (by / h) * imageEl.naturalHeight, (bw / w) * imageEl.naturalWidth, (bh / h) * imageEl.naturalHeight, 0, 0, bw, bh);
            ctx.drawImage(subCanvas, bx, by, bw, bh);
          }
        }

        // Draw selection frame
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(bx, by, bw, bh);
        ctx.setLineDash([]);
      });
    }
  }, [imageEl, blurMode, censorType, blurRadius, boxes, activeBox]);

  // Mouse drag handlers for drawing boxes
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (blurMode !== 'selective' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    setIsDrawing(true);
    setActiveBox({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !activeBox || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const curX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const curY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    setActiveBox({
      ...activeBox,
      w: curX - activeBox.x,
      h: curY - activeBox.y,
    });
  };

  const handleMouseUp = () => {
    if (isDrawing && activeBox) {
      if (Math.abs(activeBox.w) > 5 && Math.abs(activeBox.h) > 5) {
        setBoxes([...boxes, activeBox]);
      }
      setActiveBox(null);
      setIsDrawing(false);
    }
  };

  const handleExport = () => {
    if (!imageEl || !file) return;
    startProgress();

    setTimeout(() => {
      try {
        const nw = imageEl.naturalWidth;
        const nh = imageEl.naturalHeight;
        const outCanvas = document.createElement('canvas');
        outCanvas.width = nw;
        outCanvas.height = nh;
        const ctx = outCanvas.getContext('2d');
        if (!ctx) return;

        if (blurMode === 'entire') {
          if (censorType === 'blur') {
            ctx.filter = `blur(${blurRadius * (nw / 500)}px)`;
            ctx.drawImage(imageEl, 0, 0, nw, nh);
          } else if (censorType === 'pixelate') {
            const scale = Math.max(2, Math.round(nw / (blurRadius * 5)));
            const off = document.createElement('canvas');
            off.width = scale;
            off.height = Math.round(nh / (nw / scale));
            const octx = off.getContext('2d');
            if (octx) {
              octx.drawImage(imageEl, 0, 0, off.width, off.height);
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, nw, nh);
            }
          } else {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, nw, nh);
          }
        } else {
          // Selective boxes
          ctx.drawImage(imageEl, 0, 0, nw, nh);
          const ratioX = nw / (canvasRef.current?.width || nw);
          const ratioY = nh / (canvasRef.current?.height || nh);

          boxes.forEach((b) => {
            const bx = Math.min(b.x, b.x + b.w) * ratioX;
            const by = Math.min(b.y, b.y + b.h) * ratioY;
            const bw = Math.abs(b.w) * ratioX;
            const bh = Math.abs(b.h) * ratioY;
            if (bw <= 0 || bh <= 0) return;

            if (censorType === 'blackout') {
              ctx.fillStyle = '#000000';
              ctx.fillRect(bx, by, bw, bh);
            } else if (censorType === 'pixelate') {
              const pixelSize = Math.max(6, Math.round((blurRadius * ratioX) / 1.5));
              const sub = document.createElement('canvas');
              sub.width = Math.max(1, Math.floor(bw / pixelSize));
              sub.height = Math.max(1, Math.floor(bh / pixelSize));
              const sctx = sub.getContext('2d');
              if (sctx) {
                sctx.drawImage(outCanvas, bx, by, bw, bh, 0, 0, sub.width, sub.height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(sub, 0, 0, sub.width, sub.height, bx, by, bw, bh);
                ctx.imageSmoothingEnabled = true;
              }
            } else {
              const sub = document.createElement('canvas');
              sub.width = bw;
              sub.height = bh;
              const sctx = sub.getContext('2d');
              if (sctx) {
                sctx.filter = `blur(${blurRadius * ratioX}px)`;
                sctx.drawImage(imageEl, bx, by, bw, bh, 0, 0, bw, bh);
                ctx.drawImage(sub, bx, by, bw, bh);
              }
            }
          });
        }

        const dataUrl = outCanvas.toDataURL('image/jpeg', 0.92);
        const head = 'data:image/jpeg;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-censored.jpg`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('Blur error:', err);
      }
    }, 150);
  };

  return (
    <div className="w-full space-y-8">
      {!file && (
        <UploadZone
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple={false}
          onFilesSelected={(selected) => {
            if (selected.length > 0) setFile(selected[0]);
          }}
          title="Upload image to blur or censor sensitive info"
          subtitle="Blur faces, license plates, numbers, or full photo · 100% private"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Privacy Blur & Censor Tool
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {blurMode === 'selective'
                  ? 'Click & drag boxes over faces, names, or sensitive numbers to censor'
                  : 'Blur intensity applied to the entire image'}
              </p>
            </div>
            <div className="flex gap-2">
              {boxes.length > 0 && blurMode === 'selective' && (
                <button
                  type="button"
                  onClick={() => setBoxes([])}
                  className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/40 hover:bg-red-500/10 transition-colors"
                >
                  <Eraser className="w-3.5 h-3.5" /> Clear Boxes ({boxes.length})
                </button>
              )}
              <button
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setBoxes([]);
                }}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Change Photo
              </button>
            </div>
          </div>

          {/* Canvas Display */}
          <div className="flex items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl overflow-hidden min-h-[320px]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className={`max-w-full max-h-[440px] object-contain shadow-md rounded border border-border/40 ${
                blurMode === 'selective' ? 'cursor-crosshair' : 'cursor-default'
              }`}
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Mode: Selective vs Entire */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">Censor Area</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBlurMode('selective')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    blurMode === 'selective'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Select Areas (Drag)
                </button>
                <button
                  type="button"
                  onClick={() => setBlurMode('entire')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    blurMode === 'entire'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Entire Image
                </button>
              </div>
            </div>

            {/* Censor Style */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">Censor Style</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCensorType('pixelate')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    censorType === 'pixelate'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Pixelate (Mosaic)
                </button>
                <button
                  type="button"
                  onClick={() => setCensorType('blur')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    censorType === 'blur'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Gaussian Blur
                </button>
                <button
                  type="button"
                  onClick={() => setCensorType('blackout')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    censorType === 'blackout'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Black Bar
                </button>
              </div>
            </div>

            {/* Blur Strength */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" /> Censor Intensity
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{blurRadius}px</span>
              </div>
              <input
                type="range"
                min="3"
                max="40"
                step="1"
                value={blurRadius}
                onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Applying Blur..."
            >
              <Shield className="w-4 h-4 mr-2" />
              Download Censored Image
            </ProcessingButton>
          </div>
        </div>
      )}

      {result && (
        <ResultCard
          originalSize={file?.size}
          newSize={result.newSize}
          filename={result.filename}
          dataUrl={result.dataUrl}
          dimensions={{ width: result.width, height: result.height }}
          format="JPG"
          onReset={() => {
            setFile(null);
            setResult(null);
            setBoxes([]);
          }}
          title="Privacy Blur Complete!"
          subtitle="Sensitive areas have been safely blurred and censored."
          resetLabel="Censor Another Image"
        />
      )}
    </div>
  );
}
