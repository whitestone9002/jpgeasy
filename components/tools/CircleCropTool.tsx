'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Circle, Download, RefreshCw, ZoomIn, ZoomOut, Move, Sparkles, CheckCircle2 } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import ResultCard from '@/components/ui/ResultCard';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';
import { formatBytes } from '@/lib/utils/formatters';

export default function CircleCropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [outputFormat, setOutputFormat] = useState<'png' | 'webp'>('png');
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

  // Load uploaded image
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
      setScale(1);
      setPan({ x: 0, y: 0 });
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Draw interactive circle preview on canvas
  useEffect(() => {
    if (!imageEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 360; // preview canvas dimensions
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Draw background grid for transparency check
    if (bgColor === 'transparent') {
      const tileSize = 12;
      for (let y = 0; y < size; y += tileSize) {
        for (let x = 0; x < size; x += tileSize) {
          ctx.fillStyle = ((x / tileSize + y / tileSize) % 2 === 0) ? '#f1f5f9' : '#e2e8f0';
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Save context for circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.clip();

    // Calculate image dimensions to fit and scale
    const imgAspect = imageEl.naturalWidth / imageEl.naturalHeight;
    let baseW = size;
    let baseH = size;
    if (imgAspect > 1) {
      baseW = size * imgAspect;
    } else {
      baseH = size / imgAspect;
    }

    const drawW = baseW * scale;
    const drawH = baseH * scale;
    const drawX = (size - drawW) / 2 + pan.x;
    const drawY = (size - drawH) / 2 + pan.y;

    ctx.drawImage(imageEl, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Draw subtle guide ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.restore();
  }, [imageEl, scale, pan, bgColor]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch pan handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Process & Export full resolution circular image
  const handleExport = async () => {
    if (!imageEl || !file) return;
    startProgress();

    // Short timeout to let progress animation render
    setTimeout(() => {
      try {
        const outSize = Math.min(Math.max(imageEl.naturalWidth, imageEl.naturalHeight), 2048);
        const outCanvas = document.createElement('canvas');
        outCanvas.width = outSize;
        outCanvas.height = outSize;
        const ctx = outCanvas.getContext('2d');
        if (!ctx) return;

        // Background
        if (bgColor !== 'transparent') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, outSize, outSize);
        }

        // Circular clip
        ctx.beginPath();
        ctx.arc(outSize / 2, outSize / 2, outSize / 2, 0, Math.PI * 2);
        ctx.clip();

        // Calculate scaling ratio from preview canvas (size 360) to outCanvas
        const ratio = outSize / 360;
        const imgAspect = imageEl.naturalWidth / imageEl.naturalHeight;
        let baseW = 360;
        let baseH = 360;
        if (imgAspect > 1) {
          baseW = 360 * imgAspect;
        } else {
          baseH = 360 / imgAspect;
        }

        const drawW = baseW * scale * ratio;
        const drawH = baseH * scale * ratio;
        const drawX = ((360 - baseW * scale) / 2 + pan.x) * ratio;
        const drawY = ((360 - baseH * scale) / 2 + pan.y) * ratio;

        ctx.drawImage(imageEl, drawX, drawY, drawW, drawH);

        const mime = outputFormat === 'webp' ? 'image/webp' : 'image/png';
        const dataUrl = outCanvas.toDataURL(mime, 0.95);

        // Calculate byte size
        const head = `data:${mime};base64,`;
        const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);

        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const outName = `${baseName}-circle.${outputFormat}`;

        finishProgress(() => {
          setResult({
            dataUrl,
            newSize: byteLength,
            filename: outName,
            width: outSize,
            height: outSize,
          });
        });
      } catch (err) {
        console.error('Circle crop error:', err);
      }
    }, 150);
  };

  return (
    <div className="w-full space-y-8">
      {/* Upload Zone */}
      {!file && (
        <UploadZone
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple={false}
          onFilesSelected={(selected) => {
            if (selected.length > 0) setFile(selected[0]);
          }}
          title="Upload image to crop into a circle"
          subtitle="Supports JPG, PNG, WEBP · 100% private in browser"
        />
      )}

      {/* Interactive Editor */}
      {file && imageSrc && !result && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Circle className="w-5 h-5 text-blue-500" />
                Position Your Circular Crop
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag to reposition • Use slider to zoom in or out
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

          {/* Canvas Preview Area */}
          <div className="flex flex-col items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl">
            <div className="relative group cursor-grab active:cursor-grabbing select-none shadow-md rounded-full overflow-hidden border-2 border-border/80">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] block"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <span className="text-xs bg-black/75 text-white px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow">
                  <Move className="w-3 h-3" /> Drag to pan
                </span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Zoom Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-500" /> Zoom Level
                </span>
                <span className="text-muted-foreground font-mono">{Math.round(scale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <button onClick={() => setScale(1)} className="hover:text-blue-500 underline">Reset Zoom</button>
                <button onClick={() => setPan({ x: 0, y: 0 })} className="hover:text-blue-500 underline">Center Photo</button>
              </div>
            </div>

            {/* Background Style */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">
                Background (Outside Circle)
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
                  Transparent
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
                  White
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
                  Black
                </button>
              </div>
            </div>

            {/* Output Format */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">
                Format
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOutputFormat('png')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    outputFormat === 'png'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  PNG (Crisp)
                </button>
                <button
                  type="button"
                  onClick={() => setOutputFormat('webp')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    outputFormat === 'webp'
                      ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  WEBP (Smaller)
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleExport}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Rendering Circle..."
            >
              <Circle className="w-4 h-4 mr-2" />
              Crop & Download Circle Image
            </ProcessingButton>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <ResultCard
          originalSize={file?.size}
          newSize={result.newSize}
          filename={result.filename}
          dataUrl={result.dataUrl}
          dimensions={{ width: result.width, height: result.height }}
          format={outputFormat.toUpperCase()}
          onReset={() => {
            setFile(null);
            setResult(null);
          }}
          title="Circular Crop Ready!"
          subtitle="Your circular photo has been cropped with transparent edges."
          resetLabel="Crop Another Image"
        />
      )}
    </div>
  );
}
