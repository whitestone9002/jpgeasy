import React from 'react';
import type { Metadata } from 'next';
import PdfToJpgTool from '@/components/tools/PdfToJpgTool';
import ToolLayout from '@/components/ui/ToolLayout';

export const metadata: Metadata = {
  title: 'PDF to PNG - Convert PDF to PNG High-Resolution Online Free',
  description: 'Convert PDF to PNG online for free. Extract individual pages or entire documents as high-resolution, crystal-clear PNG images with transparent support.',
  keywords: ['pdf to png', 'convert pdf to png', 'pdf to png converter', 'extract png from pdf', 'pdf pages to images'],
  alternates: {
    canonical: 'https://jpgeasy.com/pdf-to-png',
  },
  openGraph: {
    title: 'PDF to PNG - Convert PDF to PNG Online Free | JPGEASY',
    description: 'Convert PDF document pages into high-resolution, crystal-clear PNG images.',
  },
};

export default function PdfToPngPage() {
  const tool = {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    slug: 'pdf-to-png',
    description: 'Convert PDF document pages into high-resolution, crystal-clear PNG images.',
    longDescription: 'Extract every page of your PDF as a lossless high-DPI PNG image. Preview all rendered pages in real time and download them individually or as a complete ZIP bundle.',
    category: 'convert' as const,
    icon: 'Image',
    acceptedTypes: 'application/pdf',
    keywords: ['pdf to png', 'convert pdf to png', 'extract png from pdf', 'pdf pages to images'],
    features: [
      'High-DPI 2.0x retina image rendering',
      'Preview every page thumbnail before downloading',
      'One-click Download All (ZIP Archive)',
      '100% Client-side and in-memory execution'
    ],
    howTo: [
      { step: '1', text: 'Select or drag & drop your PDF file.' },
      { step: '2', text: 'Wait a few seconds for all pages to render in your browser.' },
      { step: '3', text: 'Download single pages or click "Download All Images (ZIP)".' }
    ],
    faqs: [
      {
        q: 'What is the difference between PDF to JPG and PDF to PNG?',
        a: 'PNG provides lossless compression which keeps text and graphics extremely sharp with zero compression artifacts.'
      }
    ]
  };

  return (
    <ToolLayout tool={tool}>
      <PdfToJpgTool outputFormat="png" />
    </ToolLayout>
  );
}
