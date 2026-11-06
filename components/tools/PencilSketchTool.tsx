'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Sparkles, RefreshCw, Sliders } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';

export default function PencilSketchTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [intensity, setIntensity] = useState<number>(8); // blur radius for dodge blend (2 to 20)

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

  // Generate Sketch on Canvas (Color Dodge Blend Algorithm)
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

    // 1. Base grayscale
    const grayCanvas = document.createElement('canvas');
    grayCanvas.width = w;
    grayCanvas.height = h;
    const gCtx = grayCanvas.getContext('2d', { willReadFrequently: true });
    if (!gCtx) return;
    gCtx.filter = 'grayscale(100%)';
    gCtx.drawImage(imageEl, 0, 0, w, h);
    const grayData = gCtx.getImageData(0, 0, w, h).data;

    // 2. Inverted blurred grayscale
    const blurCanvas = document.createElement('canvas');
    blurCanvas.width = w;
    blurCanvas.height = h;
    const bCtx = blurCanvas.getContext('2d', { willReadFrequently: true });
    if (!bCtx) return;
    bCtx.filter = `grayscale(100%) invert(100%) blur(${intensity}px)`;
    bCtx.drawImage(imageEl, 0, 0, w, h);
    const blurData = bCtx.getImageData(0, 0, w, h).data;

    // 3. Color dodge blend: out = min(255, (base * 256) / (256 - blend))
    const outImgData = ctx.createImageData(w, h);
    const outData = outImgData.data;

    for (let i = 0; i < grayData.length; i += 4) {
      const g = grayData[i];
      const b = blurData[i];
      let val = 255;
      if (b < 255) {
        val = Math.min(255, (g * 256) / (255 - b));
      }
      outData[i] = val;
      outData[i + 1] = val;
      outData[i + 2] = val;
      outData[i + 3] = 255;
    }

    ctx.putImageData(outImgData, 0, 0);
  }, [imageEl, intensity]);

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
        const ctx = outCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const ratio = nw / 500;
        const effectiveIntensity = Math.max(3, Math.round(intensity * ratio));

        // 1. Base grayscale
        const grayCanvas = document.createElement('canvas');
        grayCanvas.width = nw;
        grayCanvas.height = nh;
        const gCtx = grayCanvas.getContext('2d', { willReadFrequently: true });
        if (!gCtx) return;
        gCtx.filter = 'grayscale(100%)';
        gCtx.drawImage(imageEl, 0, 0, nw, nh);
        const grayData = gCtx.getImageData(0, 0, nw, nh).data;

        // 2. Inverted blur
        const blurCanvas = document.createElement('canvas');
        blurCanvas.width = nw;
        blurCanvas.height = nh;
        const bCtx = blurCanvas.getContext('2d', { willReadFrequently: true });
        if (!bCtx) return;
        bCtx.filter = `grayscale(100%) invert(100%) blur(${effectiveIntensity}px)`;
        bCtx.drawImage(imageEl, 0, 0, nw, nh);
        const blurData = bCtx.getImageData(0, 0, nw, nh).data;

        // 3. Color dodge blend
        const outImgData = ctx.createImageData(nw, nh);
        const outData = outImgData.data;

        for (let i = 0; i < grayData.length; i += 4) {
          const g = grayData[i];
          const b = blurData[i];
          let val = 255;
          if (b < 255) {
            val = Math.min(255, (g * 256) / (255 - b));
          }
          outData[i] = val;
          outData[i + 1] = val;
          outData[i + 2] = val;
          outData[i + 3] = 255;
        }

        ctx.putImageData(outImgData, 0, 0);

        const dataUrl = outCanvas.toDataURL('image/jpeg', 0.95);
        const head = 'data:image/jpeg;base64,';
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: `${baseName}-pencil-sketch.jpg`,
            width: nw,
            height: nh,
          });
        });
      } catch (err) {
        console.error('Sketch error:', err);
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
          title="Upload image to turn into a pencil sketch"
          subtitle="Generate artistic hand-drawn sketches instantly · 100% private"
        />
      )}

      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-500" />
                Hand-Drawn Pencil Sketch Art
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Color dodge blend algorithm converts photo edges into fine pencil strokes
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

          {/* Stroke Intensity Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-semibold text-foreground">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-500" /> Pencil Stroke Shading
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{intensity}</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              step="1"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Fine Line Art (Lower)</span>
              <span>Deep Shading (Higher)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Drawing Pencil Sketch..."
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Download Pencil Sketch Drawing
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
          title="Pencil Sketch Ready!"
          subtitle="Your photo has been converted to an artistic pencil drawing."
          resetLabel="Sketch Another Photo"
        />
      )}
    </div>
  );
}
