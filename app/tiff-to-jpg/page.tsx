import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('tiff-to-jpg')!;

export const metadata: Metadata = {
  title: 'TIFF to JPG Converter Online Free - Convert TIF/TIFF to JPG Image',
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

export default function TiffToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="tiff" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
