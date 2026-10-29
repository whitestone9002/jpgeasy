import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import GeneralCompressorTool from '@/components/tools/GeneralCompressorTool';

const tool = getToolBySlug('compress-image')!;

export const metadata: Metadata = {
  title: 'Compress Image Size Online Free - Reduce Photo & Image KB/MB',
  description: 'Compress image size online for free. Reduce JPG, PNG, and WebP file sizes with custom quality settings while preserving crystal-clear sharpness.',
  keywords: tool.keywords,
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'Compress Image Size Online Free - JPGEASY',
    description: tool.description,
  },
};

export default function CompressImagePage() {
  return (
    <ToolLayout tool={tool}>
      <GeneralCompressorTool />
    </ToolLayout>
  );
}
