import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('gif-to-jpg')!;

export const metadata: Metadata = {
  title: 'GIF to JPG Converter Online Free - Convert GIF to JPEG Photo',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/gif-to-jpg',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function GifToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="any" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
