import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageBase64Tool from '@/components/tools/ImageBase64Tool';

const tool = getToolBySlug('image-to-base64')!;

export const metadata: Metadata = {
  title: 'Image to Base64 & Base64 to Image - Online Converter & Decoder',
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

export default function ImageBase64Page() {
  return (
    <ToolLayout tool={tool}>
      <ImageBase64Tool />
    </ToolLayout>
  );
}
