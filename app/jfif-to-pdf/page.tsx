import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('jfif-to-pdf')!;

export const metadata: Metadata = {
  title: 'JFIF to PDF Converter Online Free - Convert JFIF Images to PDF',
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

export default function JfifToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool
        accept=".jfif,image/jpeg,image/*"
        fileTypeLabel="JFIF"
      />
    </ToolLayout>
  );
}
