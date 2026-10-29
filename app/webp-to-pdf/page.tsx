import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('webp-to-pdf')!;

export const metadata: Metadata = {
  title: 'WebP to PDF Converter Online Free - Convert WebP Images to PDF',
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

export default function WebpToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool
        accept=".webp,image/webp,image/*"
        fileTypeLabel="WebP"
      />
    </ToolLayout>
  );
}
