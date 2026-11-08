import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import CompressPdfTool from '@/components/tools/CompressPdfTool';

const tool = getToolBySlug('compress-pdf-to-400kb')!;

export const metadata: Metadata = {
  title: 'Compress PDF to 400KB Online Free - Reduce PDF Size to 400 KB',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/compress-pdf-to-400kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function CompressPdfTo400kbPage() {
  return (
    <ToolLayout tool={tool}>
      <CompressPdfTool />
    </ToolLayout>
  );
}
