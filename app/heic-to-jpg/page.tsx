import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('heic-to-jpg')!;

export const metadata: Metadata = {
  title: 'HEIC to JPG Converter Online Free - Convert iPhone HEIC Photos to JPG',
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

export default function HeicToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="heic" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
