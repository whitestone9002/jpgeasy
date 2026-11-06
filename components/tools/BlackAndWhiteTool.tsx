'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Sparkles, RefreshCw, Sliders, Contrast, Sun } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

type BWPreset = 'classic' | 'noir' | 'silver' | 'charcoal';

export default function BlackAndWhiteTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [preset, setPreset] = useState<BWPreset>('classic');
  const [contrast, setContrast] = useState<number>(100); // 50 to 200%
  const [brightness, setBrightness] = useState<number>(100); // 50 to 150%

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

  // Live Canvas Rendering
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

    // Apply CSS grayscale and adjustments directly on canvas drawing
    ctx.clearRect(0, 0, w, h);
    ctx.save();

    let extraContrast = contrast;
    let extraBrightness = brightness;

    if (preset === 'noir') {
      extraContrast += 40;
      extraBrightness -= 10;
    } else if (preset === 'silver') {
      extraContrast -= 15;
      extraBrightness += 10;
    } else if (preset === 'charcoal') {
      extraContrast += 70;
      extraBrightness -= 20;
    }

    ctx.filter = `grayscale(100%) contrast(${extraContrast}%) brightness(${extraBrightness}%)`;
    ctx.drawImage(imageEl, 0, 0, w, h);
    ctx.restore();
  }, [imageEl, preset, contrast, brightness]);

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

        let extraContrast = contrast;
        let extraBrightness = brightness;
        if (preset === 'noir') {
          extraContrast += 40;
          extraBrightness -= 10;
        } else if (preset === 'silver') {
          extraContrast -= 15;
          extraBrightness += 10;
        } else if (preset === 'charcoal') {
          extraContrast += 70;
          extraBrightness -= 20;
        }

        ctx.filter = `grayscale(100%) contrast(${extraContrast}%) brightness(${extraBrightness}%)`;
        ctx.drawImage(imageEl, 0, 0, nw, nh);

        const dataUrl = outCanvas.toDataURL('image/jpeg', 0.92);
        const head = 'data:image/jpeg;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-black-and-white.jpg`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('B&W error:', err);
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
          title="Upload image to convert to Black & White"
          subtitle="Supports JPG, PNG, WEBP · 100% private in browser"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Contrast className="w-5 h-5 text-blue-500" />
                Monochrome & Greyscale Studio
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose an artistic tone or fine-tune contrast and highlights
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
          <div className="flex items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl overflow-hidden min-h-[320px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[440px] object-contain shadow-md rounded border border-border/40"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground block">Artistic B&W Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPreset('classic')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                  preset === 'classic'
                    ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                }`}
              >
                Classic Neutral
              </button>
              <button
                type="button"
                onClick={() => setPreset('noir')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                  preset === 'noir'
                    ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                }`}
              >
                Film Noir (Punchy)
              </button>
              <button
                type="button"
                onClick={() => setPreset('silver')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                  preset === 'silver'
                    ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                }`}
              >
                Vintage Silver
              </button>
              <button
                type="button"
                onClick={() => setPreset('charcoal')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                  preset === 'charcoal'
                    ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                }`}
              >
                Dramatic Deep Black
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Contrast */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Contrast className="w-3.5 h-3.5 text-blue-500" /> Contrast
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{contrast}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="180"
                step="5"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-blue-500" /> Brightness
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{brightness}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                step="5"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Converting to Monochrome..."
            >
              <Contrast className="w-4 h-4 mr-2" />
              Download Black & White Photo
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
          }}
          title="Black & White Image Ready!"
          subtitle="Your photo has been converted to high-definition monochrome."
          resetLabel="Convert Another Photo"
        />
      )}
    </div>
  );
}
