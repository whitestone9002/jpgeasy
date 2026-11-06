'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Square, Download, RefreshCw, Sliders, Sparkles, CheckCircle2 } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

export default function RoundCornersTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [radiusPercent, setRadiusPercent] = useState<number>(15); // 0 to 50%
  const [bgColor, setBgColor] = useState<string>('transparent');

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

  // Live Canvas Preview
  useEffect(() => {
    if (!imageEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxDim = 460;
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

    // Transparency Checkerboard
    if (bgColor === 'transparent') {
      const tileSize = 10;
      for (let y = 0; y < h; y += tileSize) {
        for (let x = 0; x < w; x += tileSize) {
          ctx.fillStyle = ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0) ? '#f8fafc' : '#e2e8f0';
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
    }

    // Draw Rounded Image
    ctx.save();
    const actualRadius = (Math.min(w, h) / 2) * (radiusPercent / 50);

    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, w, h, actualRadius);
    } else {
      // Fallback for older browsers
      ctx.moveTo(actualRadius, 0);
      ctx.lineTo(w - actualRadius, 0);
      ctx.quadraticCurveTo(w, 0, w, actualRadius);
      ctx.lineTo(w, h - actualRadius);
      ctx.quadraticCurveTo(w, h, w - actualRadius, h);
      ctx.lineTo(actualRadius, h);
      ctx.quadraticCurveTo(0, h, 0, h - actualRadius);
      ctx.lineTo(0, actualRadius);
      ctx.quadraticCurveTo(0, 0, actualRadius, 0);
      ctx.closePath();
    }
    ctx.clip();
    ctx.drawImage(imageEl, 0, 0, w, h);
    ctx.restore();
  }, [imageEl, radiusPercent, bgColor]);

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
        const ctx = outCanvas.getContext('2d');
        if (!ctx) return;

        if (bgColor !== 'transparent') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, nw, nh);
        }

        const actualRadius = (Math.min(nw, nh) / 2) * (radiusPercent / 50);

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(0, 0, nw, nh, actualRadius);
        } else {
          ctx.moveTo(actualRadius, 0);
          ctx.lineTo(nw - actualRadius, 0);
          ctx.quadraticCurveTo(nw, 0, nw, actualRadius);
          ctx.lineTo(nw, nh - actualRadius);
          ctx.quadraticCurveTo(nw, nh, nw - actualRadius, nh);
          ctx.lineTo(actualRadius, nh);
          ctx.quadraticCurveTo(0, nh, 0, nh - actualRadius);
          ctx.lineTo(0, actualRadius);
          ctx.quadraticCurveTo(0, 0, actualRadius, 0);
          ctx.closePath();
        }
        ctx.clip();
        ctx.drawImage(imageEl, 0, 0, nw, nh);

        const dataUrl = outCanvas.toDataURL('image/png', 0.95);
        const head = 'data:image/png;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);

        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-rounded.png`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('Round corner error:', err);
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
          title="Upload image to round corners"
          subtitle="Supports JPG, PNG, WEBP · 100% private in browser"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Square className="w-5 h-5 text-blue-500 rounded-md" />
                Customize Corner Radius
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag slider to adjust curvature • Transparent PNG export
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

          {/* Canvas Display */}
          <div className="flex items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl overflow-hidden min-h-[300px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[420px] object-contain shadow-sm border border-border/40 rounded-lg"
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Radius Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" /> Corner Curvature
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{radiusPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={radiusPercent}
                onChange={(e) => setRadiusPercent(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRadiusPercent(5)}
                  className="px-2.5 py-1 text-xs rounded border border-border hover:bg-muted/50 text-muted-foreground"
                >
                  Subtle (5%)
                </button>
                <button
                  type="button"
                  onClick={() => setRadiusPercent(15)}
                  className="px-2.5 py-1 text-xs rounded border border-border hover:bg-muted/50 text-muted-foreground"
                >
                  Medium (15%)
                </button>
                <button
                  type="button"
                  onClick={() => setRadiusPercent(30)}
                  className="px-2.5 py-1 text-xs rounded border border-border hover:bg-muted/50 text-muted-foreground"
                >
                  Pill / Large (30%)
                </button>
                <button
                  type="button"
                  onClick={() => setRadiusPercent(50)}
                  className="px-2.5 py-1 text-xs rounded border border-border hover:bg-muted/50 text-muted-foreground"
                >
                  Circle (50%)
                </button>
              </div>
            </div>

            {/* Background Style */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">
                Corner Fill (Outside Curve)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBgColor('transparent')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    bgColor === 'transparent'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Transparent (PNG)
                </button>
                <button
                  type="button"
                  onClick={() => setBgColor('#ffffff')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    bgColor === '#ffffff'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  White Fill
                </button>
                <button
                  type="button"
                  onClick={() => setBgColor('#000000')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    bgColor === '#000000'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Black Fill
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Rendering Rounded Corners..."
            >
              <Square className="w-4 h-4 mr-2" />
              Download Rounded Image (PNG)
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
          title="Rounded Corners Ready!"
          subtitle="Image corners have been smoothed with a transparent PNG background."
          resetLabel="Round Another Image"
        />
      )}
    </div>
  );
}
