import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import CompressPdfTool from '@/components/tools/CompressPdfTool';

const tool = getToolBySlug('reduce-pdf-to-100kb')!;

export const metadata: Metadata = {
  title: 'Reduce PDF to 100KB Online Free - Extreme PDF Size Reducer',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/reduce-pdf-to-100kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function ReducePdfTo100kbPage() {
  return (
    <ToolLayout tool={tool}>
      <CompressPdfTool />
    </ToolLayout>
  );
}
