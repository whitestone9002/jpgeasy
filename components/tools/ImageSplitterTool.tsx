'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Grid, Download, RefreshCw, Archive, Sparkles, Sliders } from 'lucide-react';
import JSZip from 'jszip';
import UploadZone from '@/components/ui/UploadZone';
import ProcessingButton from '@/components/ui/ProcessingButton';
import { useProgressAction } from '@/lib/hooks/useProgressAction';
import { formatBytes } from '@/lib/utils/formatters';

export default function ImageSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [slices, setSlices] = useState<{ id: string; row: number; col: number; dataUrl: string; size: number }[]>([]);
  const [zipBlobUrl, setZipBlobUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isProcessing, progress, startProgress, finishProgress } = useProgressAction();

  useEffect(() => {
    if (!file) {
      setImageSrc(null);
      setImageEl(null);
      setSlices([]);
      setZipBlobUrl(null);
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

  // Live Canvas Grid Overlay Preview
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

    // Draw image
    ctx.drawImage(imageEl, 0, 0, w, h);

    // Draw Grid Lines & Numbers
    const cellW = w / cols;
    const cellH = h / rows;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;

    let tileNum = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;

        // Cell border
        ctx.strokeRect(x, y, cellW, cellH);

        // Tile index badge
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(x + 6, y + 6, 24, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(tileNum), x + 18, y + 16);

        tileNum++;
      }
    }
  }, [imageEl, rows, cols]);

  const handleSplit = async () => {
    if (!imageEl || !file) return;
    startProgress();

    setTimeout(async () => {
      try {
        const nw = imageEl.naturalWidth;
        const nh = imageEl.naturalHeight;
        const cellW = Math.floor(nw / cols);
        const cellH = Math.floor(nh / rows);

        const newSlices: { id: string; row: number; col: number; dataUrl: string; size: number }[] = [];
        const zip = new JSZip();
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        let tileCount = 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const tileCanvas = document.createElement('canvas');
            tileCanvas.width = cellW;
            tileCanvas.height = cellH;
            const tCtx = tileCanvas.getContext('2d');
            if (!tCtx) continue;

            const sx = c * cellW;
            const sy = r * cellH;
            tCtx.drawImage(imageEl, sx, sy, cellW, cellH, 0, 0, cellW, cellH);

            const dataUrl = tileCanvas.toDataURL('image/jpeg', 0.95);
            const head = 'data:image/jpeg;base64,';
            const byteLength = Math.round(((dataUrl.length - head.length) * 3) / 4);
            const fileName = `${baseName}_tile_${tileCount}_r${r + 1}_c${c + 1}.jpg`;

            newSlices.push({
              id: fileName,
              row: r + 1,
              col: c + 1,
              dataUrl,
              size: byteLength,
            });

            // Add to zip
            const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
            zip.file(fileName, base64Data, { base64: true });
            tileCount++;
          }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipBlob);

        finishProgress(() => {
          setSlices(newSlices);
          setZipBlobUrl(zipUrl);
          setZipSize(zipBlob.size);
        });
      } catch (err) {
        console.error('Image split error:', err);
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
          title="Upload image to split into a grid"
          subtitle="Create Instagram 3x3 grids, panoramic carousels, or multi-tile splits"
        />
      )}

      {file && imageSrc && slices.length === 0 && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Grid className="w-5 h-5 text-blue-500" />
                Configure Grid Slices
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a standard social grid or enter custom rows & columns
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setSlices([]);
                setZipBlobUrl(null);
              }}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Change Photo
            </button>
          </div>

          {/* Grid Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setRows(3);
                setCols(3);
              }}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                rows === 3 && cols === 3
                  ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Instagram 3×3 Grid (9 Tiles)
            </button>
            <button
              type="button"
              onClick={() => {
                setRows(1);
                setCols(3);
              }}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                rows === 1 && cols === 3
                  ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Panorama 3×1 (3 Tiles)
            </button>
            <button
              type="button"
              onClick={() => {
                setRows(2);
                setCols(2);
              }}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                rows === 2 && cols === 2
                  ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Square 2×2 (4 Tiles)
            </button>
          </div>

          {/* Canvas Display */}
          <div className="flex items-center justify-center p-6 bg-muted/20 border border-border/60 rounded-xl overflow-hidden min-h-[320px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[440px] object-contain shadow-md rounded border border-border/40"
            />
          </div>

          {/* Custom Rows / Cols Controls */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Horizontal Rows ({rows})</label>
              <input
                type="range"
                min="1"
                max="6"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Vertical Columns ({cols})</label>
              <input
                type="range"
                min="1"
                max="6"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <ProcessingButton
              onClick={handleSplit}
              isProcessing={isProcessing}
              progress={progress}
              loadingLabel="Generating Slices..."
            >
              <Grid className="w-4 h-4 mr-2" />
              {`Split Image into ${rows * cols} Tiles`}
            </ProcessingButton>
          </div>
        </div>
      )}

      {/* Slices Output Grid & ZIP Download */}
      {slices.length > 0 && zipBlobUrl && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Archive className="w-5 h-5 text-emerald-500" />
                Image Split Complete! ({slices.length} Tiles)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download all tiles together in a single ZIP, or save individual pieces
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href={zipBlobUrl}
                download={`${file?.name.substring(0, file.name.lastIndexOf('.')) || 'split'}-tiles.zip`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" /> Download All Tiles (ZIP · {formatBytes(zipSize)})
              </a>
              <button
                onClick={() => {
                  setFile(null);
                  setSlices([]);
                  setZipBlobUrl(null);
                }}
                className="px-3.5 py-2.5 rounded-xl text-xs border border-border hover:bg-muted/50 text-muted-foreground font-medium transition-colors"
              >
                Split Another
              </button>
            </div>
          </div>

          {/* Slices Preview Gallery */}
          <div
            className="grid gap-3 p-4 bg-muted/20 border border-border/60 rounded-xl"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {slices.map((s, idx) => (
              <div key={s.id} className="group relative border border-border/80 rounded-lg overflow-hidden bg-card shadow-xs">
                <img src={s.dataUrl} alt={`Tile ${idx + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white">
                  <span className="text-xs font-bold mb-1">Tile #{idx + 1}</span>
                  <a
                    href={s.dataUrl}
                    download={s.id}
                    className="text-[11px] bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-md flex items-center gap-1 font-medium shadow"
                  >
                    <Download className="w-3 h-3" /> Save
                  </a>
                </div>
                <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
