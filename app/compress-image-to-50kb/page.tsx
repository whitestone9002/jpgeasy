import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import TargetCompressorTool from '@/components/tools/TargetCompressorTool';

const tool = getToolBySlug('compress-image-to-50kb')!;

export const metadata: Metadata = {
  title: 'Compress Image to 50KB Online Free - Passport & Visa Photo Compressor',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/compress-image-to-50kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function CompressImageTo50kbPage() {
  return (
    <ToolLayout tool={tool}>
      <TargetCompressorTool defaultTargetKb={50} fixedTarget={true} />
    </ToolLayout>
  );
}
