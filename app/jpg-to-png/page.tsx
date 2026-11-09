import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('jpg-to-png')!;

export const metadata: Metadata = {
  title: 'JPG to PNG Converter - Free, Fast & Transparent Online',
  description:
    'Convert JPG images to PNG format online for free with lossless clarity and transparent background support. Instant in-browser conversion with zero server uploads and no file limits.',
  keywords: [
    'jpg to png',
    'jpg to png converter',
    'convert jpg to png',
    'jpg to png transparent',
    'jpg into png',
    'convertir jpg a png',
    'transform jpg to png',
    'jpg to png online free',
  ],
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'JPG to PNG Converter - Free, Fast & Transparent Online',
    description:
      'Convert JPG images to PNG format online for free with lossless clarity and transparent background support. Instant in-browser conversion.',
  },
};

export default function JpgToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="jpg" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
