import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import MakeTransparentTool from '@/components/tools/MakeTransparentTool';

const tool = getToolBySlug('remove-white-background')!;

export const metadata: Metadata = {
  title: 'Remove White Background from Image Online - 1-Click Transparent PNG',
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

export default function RemoveWhiteBackgroundPage() {
  return (
    <ToolLayout tool={tool}>
      <MakeTransparentTool defaultMode="white" />
    </ToolLayout>
  );
}
