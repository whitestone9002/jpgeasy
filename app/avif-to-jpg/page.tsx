import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('avif-to-jpg')!;

export const metadata: Metadata = {
  title: 'AVIF to JPG Converter Online Free - Fast In-Browser AVIF to JPEG',
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

export default function AvifToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="avif" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
