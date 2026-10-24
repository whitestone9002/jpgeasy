import React from 'react';
import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us - JPGEASY Image & PDF Tools Support',
  description: 'Get in touch with the JPGEASY team for technical support, tool suggestions, feedback, or DMCA inquiries.',
  alternates: {
    canonical: 'https://jpgeasy.com/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
