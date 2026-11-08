import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import TargetCompressorTool from '@/components/tools/TargetCompressorTool';

const tool = getToolBySlug('compress-image-to-20kb')!;

export const metadata: Metadata = {
  title: 'Compress Image to 20KB Online Free - Photo & Signature Compressor',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/compress-image-to-20kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function CompressImageTo20kbPage() {
  return (
    <ToolLayout tool={tool}>
      <TargetCompressorTool defaultTargetKb={20} fixedTarget={true} />
    </ToolLayout>
  );
}
