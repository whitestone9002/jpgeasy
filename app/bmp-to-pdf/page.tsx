import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('bmp-to-pdf')!;

export const metadata: Metadata = {
  title: 'BMP to PDF Converter Online Free - Convert Bitmap Images to PDF',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/bmp-to-pdf',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function BmpToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool accept=".bmp,image/bmp,image/*" fileTypeLabel="BMP" />
    </ToolLayout>
  );
}
