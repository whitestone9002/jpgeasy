import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('tiff-to-pdf')!;

export const metadata: Metadata = {
  title: 'TIFF to PDF Converter Online Free - Convert Scanned TIFF to PDF Document',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function TiffToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool
        accept=".tiff,.tif,image/tiff,image/*"
        fileTypeLabel="TIFF"
      />
    </ToolLayout>
  );
}
