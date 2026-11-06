import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import CircleCropTool from '@/components/tools/CircleCropTool';

const tool = getToolBySlug('circle-crop')!;

export const metadata: Metadata = {
  title: 'Circle Crop Image Online - Free Circular Photo Cropper & Avatar Maker',
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

export default function CircleCropPage() {
  return (
    <ToolLayout tool={tool}>
      <CircleCropTool />
    </ToolLayout>
  );
}
