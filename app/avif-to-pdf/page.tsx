import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('avif-to-pdf')!;

export const metadata: Metadata = {
  title: 'AVIF to PDF Converter Online Free - Convert AVIF to PDF Document',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/avif-to-pdf',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function AvifToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool accept=".avif,image/avif,image/*" fileTypeLabel="AVIF" />
    </ToolLayout>
  );
}
