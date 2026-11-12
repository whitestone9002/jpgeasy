/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'pdf-lib'],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/word-to-pdf',
        destination: '/tools',
        permanent: false,
      },
      {
        source: '/pdf-to-word',
        destination: '/tools',
        permanent: false,
      },
      // 301 Permanent Redirects for Google Search Console 404 Resolution
      {
        source: '/image-to-base64',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/remove-white-background',
        destination: '/jpg-to-png',
        permanent: true,
      },
      {
        source: '/pencil-sketch',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/make-transparent',
        destination: '/jpg-to-png',
        permanent: true,
      },
      {
        source: '/split-image',
        destination: '/crop-image',
        permanent: true,
      },
      {
        source: '/black-and-white',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/round-corners',
        destination: '/crop-image',
        permanent: true,
      },
      {
        source: '/uimzf-otqow',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
