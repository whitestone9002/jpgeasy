import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import TargetCompressorTool from '@/components/tools/TargetCompressorTool';

const tool = getToolBySlug('reduce-photo-size-to-20kb')!;

export const metadata: Metadata = {
  title: 'Reduce Photo Size to 20KB Online Free - Exam Portal Photo Tool',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/reduce-photo-size-to-20kb',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function ReducePhotoSizeTo20kbPage() {
  return (
    <ToolLayout tool={tool}>
      <TargetCompressorTool defaultTargetKb={20} fixedTarget={true} />
    </ToolLayout>
  );
}
