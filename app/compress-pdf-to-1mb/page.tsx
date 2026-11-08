import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import CompressPdfTool from '@/components/tools/CompressPdfTool';

const tool = getToolBySlug('compress-pdf-to-1mb')!;

export const metadata: Metadata = {
  title: 'Compress PDF to 1MB Online Free - Reduce PDF Size Under 1 MB',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/compress-pdf-to-1mb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function CompressPdfTo1mbPage() {
  return (
    <ToolLayout tool={tool}>
      <CompressPdfTool />
    </ToolLayout>
  );
}
