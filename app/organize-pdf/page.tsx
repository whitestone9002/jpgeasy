import React from 'react';
import type { Metadata } from 'next';
import VisualPdfOrganizerTool from '@/components/tools/VisualPdfOrganizerTool';
import ToolLayout from '@/components/ui/ToolLayout';
import { TOOLS } from '@/lib/config/tools';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Online Free - Visual Reorder, Delete & Rotate',
  description:
    'Visually reorder, rotate, sort, and delete pages in your PDF document for free. Interactive thumbnail previews with 100% private in-browser processing and zero server uploads.',
  keywords: [
    'organize pdf',
    'reorder pdf pages',
    'delete pages from pdf',
    'how to delete a page in pdf',
    'sort pdf',
    'rotate pdf pages',
    'delete page from pdf',
    'organize pdf pages online free',
  ],
  alternates: {
    canonical: 'https://jpgeasy.com/organize-pdf',
  },
  openGraph: {
    title: 'Organize PDF Pages Online Free - Visual Reorder, Delete & Rotate',
    description:
      'Visually reorder, rotate, sort, and delete pages in your PDF document for free with live thumbnail previews.',
  },
};

export default function OrganizePdfPage() {
  const tool = TOOLS.find((t) => t.slug === 'organize-pdf') || {
    id: 'organize-pdf',
    name: 'Organize PDF Pages',
    slug: 'organize-pdf',
    description: 'Reorder, rotate, delete, and organize PDF pages visually with live thumbnail previews.',
    longDescription: 'Our visual PDF organizer renders interactive thumbnail previews of every page in your document. Easily drag to reorder, rotate individual pages, delete unwanted pages, and export your organized PDF.',
    category: 'pdf' as const,
    icon: 'Layers',
    acceptedTypes: 'application/pdf',
    keywords: ['organize pdf', 'reorder pdf pages', 'delete pages from pdf', 'sort pdf', 'rotate pdf pages'],
    features: [
      'Live interactive thumbnail previews of all pages',
      'One-click multi-page rotation and deletion',
      'Batch selection: All, Odd, or Even pages',
      'Drag & drop page reordering',
      '100% In-memory processing with zero database storage'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'View all rendered page previews in the interactive workspace.' },
      { step: '3', text: 'Drag pages to reorder, rotate with the rotate button, or click trash to remove.' },
      { step: '4', text: 'Click "Save & Download" to export your organized PDF.' }
    ],
    faqs: [
      {
        q: 'Can I remove specific pages from my PDF?',
        a: 'Yes! Simply click the trash can icon on any page thumbnail to delete it from the final document.'
      },
      {
        q: 'Are my pages uploaded to an external server?',
        a: 'No! All page extraction, thumbnail rendering, and PDF restructuring are computed client-side in your browser memory.'
      }
    ]
  };

  return (
    <ToolLayout tool={tool}>
      <VisualPdfOrganizerTool />
    </ToolLayout>
  );
}
