import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('heic-to-pdf')!;

export const metadata: Metadata = {
  title: 'HEIC to PDF Converter Online Free - Convert iPhone Photos to PDF Document',
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

export default function HeicToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool
        accept=".heic,.heif,image/heic,image/heif,image/*"
        fileTypeLabel="HEIC"
      />
    </ToolLayout>
  );
}
