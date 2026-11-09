import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import MergePdfTool from '@/components/tools/MergePdfTool';

const tool = getToolBySlug('merge-pdf')!;

export const metadata: Metadata = {
  title: 'Merge PDF Online Free - Combine PDF Files Instantly (No Upload)',
  description:
    'Combine multiple PDF files into a single document online for free. Fast, private client-side merging with drag-and-drop reordering, zero server uploads, and no file limits.',
  keywords: [
    'merge pdf',
    'combine pdf',
    'merge pdf files online free',
    'combine multiple pdfs',
    'join pdf files',
    'pdf merger online',
    'pdf and image merge',
    'merge pdf free',
  ],
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: 'Merge PDF Online Free - Combine PDF Files Instantly',
    description:
      'Combine multiple PDF files into one clean document online for free with instant in-browser processing.',
  },
};

export default function MergePdfPage() {
  return (
    <ToolLayout tool={tool}>
      <MergePdfTool />
    </ToolLayout>
  );
}
