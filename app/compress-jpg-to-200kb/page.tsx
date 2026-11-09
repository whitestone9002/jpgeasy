import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import TargetCompressorTool from '@/components/tools/TargetCompressorTool';

const tool = getToolBySlug('compress-jpg-to-200kb')!;

export const metadata: Metadata = {
  title: 'Compress JPG to 200KB Online Free - Reduce JPEG Size to 200 KB',
  description:
    'Compress JPG and JPEG images to 200KB or less online for free. Perfect for document portals, exam forms, visa applications, and web uploads. 100% private in-browser compression.',
  keywords: [
    'compress jpg to 200kb',
    'compress image to 200kb',
    'jpg compress 200kb',
    '200 kb jpg converter',
    '200kb compress',
    'jpg 200kb',
    'reduce jpeg size to 200kb',
    'compress jpeg to 200kb',
    'jpg under 200kb',
  ],
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'Compress JPG to 200KB Online Free - Reduce JPEG Size to 200 KB',
    description:
      'Compress JPG and JPEG images to 200KB or less online for free with instant in-browser processing.',
  },
};

export default function CompressJpgTo200KbPage() {
  return (
    <ToolLayout tool={tool}>
      <TargetCompressorTool defaultTargetKb={200} fixedTarget={true} />
    </ToolLayout>
  );
}
