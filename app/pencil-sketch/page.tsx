import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import PencilSketchTool from '@/components/tools/PencilSketchTool';

const tool = getToolBySlug('pencil-sketch')!;

export const metadata: Metadata = {
  title: 'Pencil Sketch Effect - Turn Photo into Pencil Drawing Online',
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

export default function PencilSketchPage() {
  return (
    <ToolLayout tool={tool}>
      <PencilSketchTool />
    </ToolLayout>
  );
}
