'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, Download, RefreshCw, FileText, ImageIcon } from 'lucide-react';
import UploadZone from '@/components/ui/UploadZone';
import { formatBytes } from '@/lib/utils/formatters';

export default function ImageBase64Tool() {
  const [tab, setTab] = useState<'encode' | 'decode'>('encode');

  // Encode state
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [rawBase64, setRawBase64] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Decode state
  const [inputBase64, setInputBase64] = useState<string>('');
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);
  const [decodeError, setDecodeError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      setDataUrl(res);
      const commaIdx = res.indexOf(',');
      setRawBase64(commaIdx !== -1 ? res.slice(commaIdx + 1) : res);
    };
    reader.readAsDataURL(f);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDecode = (text: string) => {
    setInputBase64(text);
    setDecodeError(null);
    if (!text.trim()) {
      setDecodedUrl(null);
      return;
    }

    let formatted = text.trim();
    if (!formatted.startsWith('data:image/')) {
      // Auto-prefix data uri if user just pasted raw base64
      formatted = `data:image/png;base64,${formatted}`;
    }

    // Test image validity
    const img = new Image();
    img.onload = () => {
      setDecodedUrl(formatted);
      setDecodeError(null);
    };
    img.onerror = () => {
      setDecodedUrl(null);
      setDecodeError('Invalid Base64 image string. Please check the text format.');
    };
    img.src = formatted;
  };

  return (
    <div className="w-full space-y-8">
      {/* Tab Switcher */}
      <div className="flex border-b border-border/60">
        <button
          type="button"
          onClick={() => setTab('encode')}
          className={`pb-3 px-6 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            tab === 'encode'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Code className="w-4 h-4" /> Image to Base64
        </button>
        <button
          type="button"
          onClick={() => setTab('decode')}
          className={`pb-3 px-6 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            tab === 'decode'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Base64 to Image
        </button>
      </div>

      {/* Tab 1: Image to Base64 */}
      {tab === 'encode' && (
        <div className="space-y-6">
          {!file && (
            <UploadZone
              accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
              multiple={false}
              onFilesSelected={(selected) => {
                if (selected.length > 0) handleFile(selected[0]);
              }}
              title="Upload image to convert to Base64"
              subtitle="Generates Data URI, HTML tag, CSS snippet · 100% private"
            />
          )}

          {file && dataUrl && (
            <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={dataUrl}
                    alt="Preview"
                    className="w-14 h-14 object-cover rounded-lg border border-border/80 shadow-xs"
                  />
                  <div>
                    <h3 className="text-base font-bold text-foreground">{file.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {formatBytes(file.size)} • {file.type || 'image/png'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setDataUrl('');
                    setRawBase64('');
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Convert Another Image
                </button>
              </div>

              {/* Data URI snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Data URI (Ready for Browser / API)</label>
                  <button
                    onClick={() => handleCopy(dataUrl, 'datauri')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedKey === 'datauri' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'datauri' ? 'Copied!' : 'Copy Data URI'}
                  </button>
                </div>
                <div className="relative bg-muted/40 p-3 rounded-lg border border-border/60 font-mono text-xs text-muted-foreground break-all max-h-24 overflow-y-auto">
                  {dataUrl}
                </div>
              </div>

              {/* HTML <img> tag snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">HTML Image Tag</label>
                  <button
                    onClick={() => handleCopy(`<img src="${dataUrl}" alt="${file.name}" />`, 'html')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'html' ? 'Copied!' : 'Copy HTML'}
                  </button>
                </div>
                <div className="relative bg-muted/40 p-3 rounded-lg border border-border/60 font-mono text-xs text-muted-foreground break-all max-h-20 overflow-y-auto">
                  {`<img src="${dataUrl}" alt="${file.name}" />`}
                </div>
              </div>

              {/* Raw Base64 string */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Raw Base64 String (Without prefix)</label>
                  <button
                    onClick={() => handleCopy(rawBase64, 'raw')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedKey === 'raw' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'raw' ? 'Copied!' : 'Copy Raw Base64'}
                  </button>
                </div>
                <div className="relative bg-muted/40 p-3 rounded-lg border border-border/60 font-mono text-xs text-muted-foreground break-all max-h-20 overflow-y-auto">
                  {rawBase64}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Base64 to Image */}
      {tab === 'decode' && (
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-foreground">Paste Base64 String</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Paste a raw Base64 string or a data URI (`data:image/...;base64,...`) to decode and download
            </p>
          </div>

          <textarea
            rows={5}
            value={inputBase64}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="Paste your Base64 string here..."
            className="w-full p-3 rounded-xl border border-border/80 bg-background font-mono text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />

          {decodeError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-600 dark:text-red-400 font-medium">
              {decodeError}
            </div>
          )}

          {decodedUrl && (
            <div className="p-6 bg-muted/20 border border-border/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={decodedUrl}
                  alt="Decoded output"
                  className="max-w-[200px] max-h-[160px] object-contain rounded-lg border border-border shadow-xs bg-card"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">Decoded Image</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Ready for download</p>
                </div>
              </div>

              <a
                href={decodedUrl}
                download="decoded-image.png"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" /> Download Decoded Image (PNG)
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
