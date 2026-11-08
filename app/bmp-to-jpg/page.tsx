import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('bmp-to-jpg')!;

export const metadata: Metadata = {
  title: 'BMP to JPG Converter Online Free - Convert Bitmap to JPEG',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/bmp-to-jpg',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function BmpToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="any" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
