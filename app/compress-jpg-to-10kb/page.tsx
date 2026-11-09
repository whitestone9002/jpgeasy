import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import TargetCompressorTool from '@/components/tools/TargetCompressorTool';

const tool = getToolBySlug('compress-jpg-to-10kb')!;

export const metadata: Metadata = {
  title: 'Compress JPG to 10KB Online Free - Reduce JPEG Size to 10 KB',
  description:
    'Compress JPG and JPEG images to 10KB or less online for free. Perfect for government exam portals, signatures, ID cards, and job applications. 100% private in-browser compression with no file size limits.',
  keywords: [
    'compress jpg to 10 kb',
    'compress jpeg less than 10 kb',
    'compress image to 10kb online',
    'photo resizer in 10 kb',
    'convert photo to 10kb',
    'image compressor 10kb',
    'jpg to 10kb',
    'compress photo to 10kb',
  ],
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'Compress JPG to 10KB Online Free - Reduce JPEG Size to 10 KB',
    description:
      'Compress JPG and JPEG images to 10KB or less online for free. Ideal for government portals, signatures, and ID cards with instant client-side processing.',
  },
};

export default function CompressJpgTo10KbPage() {
  return (
    <ToolLayout tool={tool}>
      <TargetCompressorTool defaultTargetKb={10} fixedTarget={true} />
    </ToolLayout>
  );
}
