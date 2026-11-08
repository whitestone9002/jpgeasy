import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('gif-to-pdf')!;

export const metadata: Metadata = {
  title: 'GIF to PDF Converter Online Free - Convert GIF Images to PDF',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/gif-to-pdf',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function GifToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool accept=".gif,image/gif,image/*" fileTypeLabel="GIF" />
    </ToolLayout>
  );
}
