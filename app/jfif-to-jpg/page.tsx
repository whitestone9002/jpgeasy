import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('jfif-to-jpg')!;

export const metadata: Metadata = {
  title: 'JFIF to JPG Converter Online Free - Convert JFIF to JPG/JPEG',
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

export default function JfifToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="jfif" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
