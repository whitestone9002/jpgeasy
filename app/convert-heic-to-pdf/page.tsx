import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';

const tool = getToolBySlug('convert-heic-to-pdf')!;

export const metadata: Metadata = {
  title: 'Convert HEIC to PDF Online Free - Merge iPhone Photos to PDF',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/heic-to-pdf',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function ConvertHeicToPdfPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageToPdfTool accept=".heic,.heif,image/heic,image/heif,image/*" fileTypeLabel="HEIC" />
    </ToolLayout>
  );
}
