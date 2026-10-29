import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('svg-to-pdf')!;

export const metadata: Metadata = {
  title: 'SVG to PDF Converter Online Free - Convert Vector SVG to PDF',
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

export default function SvgToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool
        accept=".svg,image/svg+xml,image/*"
        fileTypeLabel="SVG"
      />
    </ToolLayout>
  );
}
