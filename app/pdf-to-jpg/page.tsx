import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import PdfToJpgTool from '@/components/tools/PdfToJpgTool';

const tool = getToolBySlug('pdf-to-jpg')!;

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Online Free - PDF to JPG Converter (High Res)',
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

export default function PdfToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <PdfToJpgTool />
    </ToolLayout>
  );
}
