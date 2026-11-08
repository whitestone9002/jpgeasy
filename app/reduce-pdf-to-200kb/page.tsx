import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import CompressPdfTool from '@/components/tools/CompressPdfTool';

const tool = getToolBySlug('reduce-pdf-to-200kb')!;

export const metadata: Metadata = {
  title: 'Reduce PDF to 200KB Online Free - Shrink PDF Documents',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/reduce-pdf-to-200kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function ReducePdfTo200kbPage() {
  return (
    <ToolLayout tool={tool}>
      <CompressPdfTool />
    </ToolLayout>
  );
}
