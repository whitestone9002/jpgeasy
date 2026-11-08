import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('avif-to-webp')!;

export const metadata: Metadata = {
  title: 'AVIF to WebP Converter Online Free - Modern Web Image Converter',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/avif-to-webp',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function AvifToWebpPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="avif" targetFormat="webp" fixedTarget={true} />
    </ToolLayout>
  );
}
