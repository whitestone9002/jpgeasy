import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('png-to-jpg')!;

export const metadata: Metadata = {
  title: 'PNG to JPG Converter Online Free - Convert PNG to JPG/JPEG',
  description: 'Convert PNG to JPG online for free with our high-speed PNG to JPG converter. Seamlessly handle transparent backgrounds with custom white background fill.',
  keywords: tool.keywords,
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'PNG to JPG Converter Online Free - JPGEASY',
    description: tool.description,
  },
};

export default function PngToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="png" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
