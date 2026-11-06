'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FlipHorizontal, Sparkles, RefreshCw, Layers } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

export default function InvertColorsTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);

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

  // Canvas Invert Live Render
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
    ctx.save();
    ctx.filter = 'invert(100%)';
    ctx.drawImage(imageEl, 0, 0, w, h);
    ctx.restore();
  }, [imageEl]);

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

        ctx.filter = 'invert(100%)';
        ctx.drawImage(imageEl, 0, 0, nw, nh);

        const dataUrl = outCanvas.toDataURL('image/jpeg', 0.95);
        const head = 'data:image/jpeg;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-inverted.jpg`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('Invert error:', err);
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
          title="Upload image to invert colors"
          subtitle="Generate negative film effects or flip color values · 100% private"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" />
                Invert Colors & Negative Effect
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                All RGB color channels are inverted to create a negative image
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

          <div className="flex items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl overflow-hidden min-h-[320px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[440px] object-contain shadow-md rounded border border-border/40"
            />
          </div>

          <div className="pt-2 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Inverting Color Channels..."
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Download Inverted Image
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
          title="Inverted Image Ready!"
          subtitle="Color negative effect has been applied across all pixel channels."
          resetLabel="Invert Another Image"
        />
      )}
    </div>
  );
}
