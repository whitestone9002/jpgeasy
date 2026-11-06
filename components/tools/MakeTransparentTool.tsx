'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pipette, Sparkles, RefreshCw, Sliders, CheckCircle2 } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

export default function MakeTransparentTool({ defaultMode = 'custom' }: { defaultMode?: 'custom' | 'white' }) {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [targetColor, setTargetColor] = useState<{ r: number; g: number; b: number }>(
    defaultMode === 'white' ? { r: 255, g: 255, b: 255 } : { r: 255, g: 255, b: 255 }
  );
  const [tolerance, setTolerance] = useState<number>(defaultMode === 'white' ? 25 : 20); // 0 to 100
  const [isPickingColor, setIsPickingColor] = useState<boolean>(false);

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

  // Live Canvas Rendering with Transparency Keying
  useEffect(() => {
    if (!imageEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const maxDim = 500;
    const aspect = imageEl.naturalWidth / imageEl.naturalHeight;
    let w = maxDim;
    let h = maxDim / aspect;
    if (aspect < 1) {
      h = maxDim;
      w = maxDim * aspect;
    }

    canvas.width = w;
    canvas.height = h;

    // Draw image first
    ctx.drawImage(imageEl, 0, 0, w, h);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const maxDist = Math.sqrt(255 * 255 * 3);
    const threshold = (tolerance / 100) * maxDist;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate Euclidean color distance from target color
      const dist = Math.sqrt(
        (r - targetColor.r) ** 2 +
        (g - targetColor.g) ** 2 +
        (b - targetColor.b) ** 2
      );

      if (dist <= threshold) {
        // Linear fade / feathering for clean edges
        if (dist <= threshold * 0.7) {
          data[i + 3] = 0; // Completely transparent
        } else {
          const factor = (dist - threshold * 0.7) / (threshold * 0.3);
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [imageEl, targetColor, tolerance]);

  // Click on canvas to sample color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imageEl) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    // Read original pixel color
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.drawImage(imageEl, 0, 0, canvas.width, canvas.height);
    const p = tempCtx.getImageData(x, y, 1, 1).data;

    setTargetColor({ r: p[0], g: p[1], b: p[2] });
    setIsPickingColor(false);
  };

  const handleExport = () => {
    if (!imageEl || !file) return;
    startProgress();

    setTimeout(() => {
      try {
        const outCanvas = document.createElement('canvas');
        const nw = imageEl.naturalWidth;
        const nh = imageEl.naturalHeight;
        outCanvas.width = nw;
        outCanvas.height = nh;
        const ctx = outCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(imageEl, 0, 0, nw, nh);
        const imgData = ctx.getImageData(0, 0, nw, nh);
        const data = imgData.data;

        const maxDist = Math.sqrt(255 * 255 * 3);
        const threshold = (tolerance / 100) * maxDist;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const dist = Math.sqrt(
            (r - targetColor.r) ** 2 +
            (g - targetColor.g) ** 2 +
            (b - targetColor.b) ** 2
          );

          if (dist <= threshold) {
            if (dist <= threshold * 0.7) {
              data[i + 3] = 0;
            } else {
              const factor = (dist - threshold * 0.7) / (threshold * 0.3);
              data[i + 3] = Math.round(data[i + 3] * factor);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        const dataUrl = outCanvas.toDataURL('image/png', 0.95);
        const head = 'data:image/png;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-transparent.png`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('Make transparent error:', err);
      }
    }, 150);
  };

  const targetHex = `#${((1 << 24) + (targetColor.r << 16) + (targetColor.g << 8) + targetColor.b).toString(16).slice(1)}`;

  return (
    <div className="w-full space-y-8">
      {!file && (
        <UploadZone
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple={false}
          onFilesSelected={(selected) => {
            if (selected.length > 0) setFile(selected[0]);
          }}
          title="Upload image to make transparent"
          subtitle="Supports JPG, PNG, WEBP · 100% private in browser"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Select Color to Remove
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click any part of the image to pick the background color, then adjust tolerance
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Change Photo
            </button>
          </div>

          {/* Checkerboard Preview Area */}
          <div
            className="flex items-center justify-center p-6 border border-border/60 rounded-xl overflow-hidden min-h-[320px]"
            style={{
              backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              backgroundColor: '#f8fafc',
            }}
          >
            <div className="relative group cursor-crosshair">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="max-w-full max-h-[440px] object-contain shadow-md rounded border border-border/40"
              />
              <div className="absolute top-2 right-2 bg-black/75 text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm">
                Click image to pick color
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Color Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Color to Make Transparent</span>
                <span className="font-mono text-xs text-muted-foreground">{targetHex.toUpperCase()}</span>
              </label>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-border shadow-inner"
                  style={{ backgroundColor: targetHex }}
                />
                <div className="flex gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() => setTargetColor({ r: 255, g: 255, b: 255 })}
                    className="flex-1 py-1.5 px-2 text-xs rounded-lg border border-border hover:bg-muted/50 font-medium"
                  >
                    White
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetColor({ r: 0, g: 0, b: 0 })}
                    className="flex-1 py-1.5 px-2 text-xs rounded-lg border border-border hover:bg-muted/50 font-medium"
                  >
                    Black
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetColor({ r: 0, g: 255, b: 0 })}
                    className="flex-1 py-1.5 px-2 text-xs rounded-lg border border-border hover:bg-muted/50 font-medium"
                  >
                    Green
                  </button>
                </div>
              </div>
            </div>

            {/* Tolerance Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" /> Color Tolerance
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{tolerance}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="75"
                step="1"
                value={tolerance}
                onChange={(e) => setTolerance(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
              <p className="text-[11px] text-muted-foreground">
                Higher tolerance removes slight shadows and gradients around the edges.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Removing Background..."
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Download Transparent PNG
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
          format="PNG"
          onReset={() => {
            setFile(null);
            setResult(null);
          }}
          title="Transparent Image Ready!"
          subtitle="Selected background color has been completely removed with a transparent alpha channel."
          resetLabel="Process Another Image"
        />
      )}
    </div>
  );
}
