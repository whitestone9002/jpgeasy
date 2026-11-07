export interface ToolMeta {
  id: string;
  name: string;
  shortName?: string;
  slug: string;
  description: string;
  longDescription: string;
  category: 'compress' | 'convert' | 'resize' | 'edit' | 'pdf';
  badge?: string;
  icon: string;
  popular?: boolean;
  acceptedTypes: string;
  maxFiles?: number;
  keywords: string[];
  features: string[];
  howTo: { step: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const TOOLS: ToolMeta[] = [
  // --- Compression Tools ---
  {
    id: 'compress-jpg',
    name: 'Compress JPG / JPEG',
    shortName: 'Compress JPG',
    slug: 'compress-jpg',
    description: 'Compress JPG images to a target file size or custom quality level while retaining maximum visual sharpness.',
    longDescription: 'Our intelligent JPG compressor reduces file sizes by up to 90% using advanced quantization and chroma subsampling. Choose between automatic target sizes (10KB, 20KB, 50KB, 100KB) or fine-tune with a precision quality slider.',
    category: 'compress',
    badge: 'Popular',
    icon: 'Minimize2',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg',
    maxFiles: 10,
    keywords: ['compress jpg', 'jpg optimizer', 'reduce jpg size', 'compress jpeg', 'image shrinker', 'photo compressor'],
    features: [
      'Target-size engine (10KB, 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, or Custom)',
      'Intelligent quality and dimension optimization',
      'Instant side-by-side visual comparison',
      'Zero quality degradation with smart image compression',
      '100% In-memory processing with complete privacy'
    ],
    howTo: [
      { step: '1', text: 'Select or drag & drop your JPG/JPEG image into the upload box.' },
      { step: '2', text: 'Choose your desired target size (e.g. 50KB) or set a custom quality percentage.' },
      { step: '3', text: 'Click "Compress JPG" to run the high-precision optimization.' },
      { step: '4', text: 'Preview the compressed image and click "Download JPG".' }
    ],
    faqs: [
      {
        q: 'How does the target-size compression work?',
        a: 'Our smart optimization engine intelligently balances compression parameters and dimensions to guarantee your image stays under the target size with the highest possible visual clarity.'
      },
      {
        q: 'Will compressing my JPG reduce quality noticeably?',
        a: 'Our smart compression removes invisible metadata and optimizes color artifacts first, ensuring the image looks crisp and natural to the human eye.'
      },
      {
        q: 'Are my photos saved on your servers?',
        a: 'Never. All processing happens entirely in memory and is discarded immediately after sending the result back to your browser.'
      }
    ]
  },
  {
    id: 'compress-jpg-to-10kb',
    name: 'Compress JPG to 10KB',
    shortName: 'JPG to 10KB',
    slug: 'compress-jpg-to-10kb',
    description: 'Reduce JPG image size to 10KB or less for online forms, passports, signatures, job applications, and exam portals.',
    longDescription: 'Compress any JPG/JPEG image down to exactly 10KB or less without creating blurry artifacts. Ideal for government portals, college admissions, state PSC exams, UPSC, SSC, and passport signature requirements.',
    category: 'compress',
    badge: 'Specialized',
    icon: 'Sparkles',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    maxFiles: 5,
    keywords: ['compress jpg to 10kb', 'jpg 10kb', 'resize photo to 10kb', '10kb photo compressor', 'signature 10kb', 'compress image 10 kb'],
    features: [
      'Guaranteed file size under 10 KB',
      'Optimized for passport photos, signatures & exam portals',
      'Instant before & after size verification',
      'No registration or watermark'
    ],
    howTo: [
      { step: '1', text: 'Upload your photo, signature, or document image.' },
      { step: '2', text: 'The target is pre-configured to 10 KB.' },
      { step: '3', text: 'Click "Compress to 10KB" to adapt quality and dimensions.' },
      { step: '4', text: 'Download your verified sub-10KB file immediately.' }
    ],
    faqs: [
      {
        q: 'Why do official portals require images under 10KB?',
        a: 'Government and academic portals enforce strict file size limits to save storage and speed up processing. Our tool ensures your image satisfies these requirements without rejection.'
      },
      {
        q: 'What if my original photo is very large (e.g. 5MB)?',
        a: 'Our optimization automatically performs step-wise scaling to safely bring 5MB+ photos down below 10KB while preserving visual clarity.'
      }
    ]
  },
  {
    id: 'compress-jpg-to-20kb',
    name: 'Compress JPG to 20KB',
    shortName: 'JPG to 20KB',
    slug: 'compress-jpg-to-20kb',
    description: 'Compress JPG images to 20KB or less for portals, exam forms, ID cards, and web upload constraints.',
    longDescription: 'Quickly shrink photos, scanned certificates, and ID documents to 20KB or less. Perfect for online registration portals requiring 10KB–20KB uploads.',
    category: 'compress',
    icon: 'Minimize2',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['compress jpg to 20kb', '20kb', '20 kb', 'jpg 20kb', 'jpg to 20kb', 'compress to 20kb', '20kb photo converter', 'resize image 20 kb', '20kb photo', 'passport 20kb'],
    features: [
      'Target 20 KB precision optimization',
      'Maintains legible text and facial clarity',
      '100% private in-memory processing'
    ],
    howTo: [
      { step: '1', text: 'Upload the image you need to reduce.' },
      { step: '2', text: 'Confirm 20 KB target size is selected.' },
      { step: '3', text: 'Click Compress and download the optimized image.' }
    ],
    faqs: [
      {
        q: 'Is 20KB enough for legible text?',
        a: 'Yes, our engine applies crisp edge preservation so ID numbers, names, and faces stay readable.'
      }
    ]
  },
  {
    id: 'compress-jpg-to-50kb',
    name: 'Compress JPG to 50KB',
    shortName: 'JPG to 50KB',
    slug: 'compress-jpg-to-50kb',
    description: 'Compress any JPG/JPEG image to 50KB or below for web optimization, visa applications, and portals.',
    longDescription: 'Compress your image to 50KB without noticeable quality loss. Perfect for visa applications, government forms, resumes, and high-speed web publishing.',
    category: 'compress',
    icon: 'Minimize2',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['compress jpg to 50kb', '50kb', '50 kb', 'jpg 50kb', 'jpg to 50kb', 'compress to 50kb', '50kb photo compressor', 'resize photo to 50kb', 'visa photo 50kb', 'compress 50kb'],
    features: [
      'Accurate 50 KB ceiling output',
      'Preserves color fidelity and sharpness',
      'Batch processing supported'
    ],
    howTo: [
      { step: '1', text: 'Upload your image.' },
      { step: '2', text: 'Click "Compress to 50KB".' },
      { step: '3', text: 'Download your 50KB JPG.' }
    ],
    faqs: [
      {
        q: 'Does this work on smartphones?',
        a: 'Yes, our tool is fully responsive and works smoothly on Android, iPhone, iPad, Mac, and Windows.'
      }
    ]
  },
  {
    id: 'compress-jpg-to-100kb',
    name: 'Compress JPG to 100KB',
    shortName: 'JPG to 100KB',
    slug: 'compress-jpg-to-100kb',
    description: 'Compress JPG images to 100KB or less with high visual clarity for websites and email attachments.',
    longDescription: 'Easily reduce large camera photos (3MB–10MB) to 100KB. Great for fast website loading, email attachments, and web stores.',
    category: 'compress',
    icon: 'Minimize2',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['compress jpg to 100kb', '100kb', '100 kb', 'jpg 100kb', 'jpg to 100kb', 'compress to 100kb', '100kb image converter', 'shrink photo to 100kb'],
    features: ['Crisp 100KB output', 'Ideal for e-commerce and websites', 'Instant processing'],
    howTo: [
      { step: '1', text: 'Upload your JPG image.' },
      { step: '2', text: 'Click "Compress to 100KB".' },
      { step: '3', text: 'Download your optimized file.' }
    ],
    faqs: []
  },
  {
    id: 'compress-jpg-to-200kb',
    name: 'Compress JPG to 200KB',
    shortName: 'JPG to 200KB',
    slug: 'compress-jpg-to-200kb',
    description: 'Compress JPG images to 200KB or less for online forms, documents, and blogs.',
    longDescription: 'Bring high-resolution images down to 200KB while preserving pristine details, textures, and rich colors.',
    category: 'compress',
    icon: 'Minimize2',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['compress jpg to 200kb', '200kb', '200 kb', 'jpg 200kb', 'jpg to 200kb', 'compress to 200kb', '200kb photo converter', 'shrink image to 200kb'],
    features: ['High quality 200KB output', 'Fast in-memory compression'],
    howTo: [
      { step: '1', text: 'Upload your image.' },
      { step: '2', text: 'Click "Compress to 200KB".' },
      { step: '3', text: 'Download the result.' }
    ],
    faqs: []
  },
  {
    id: 'compress-jpg-to-500kb',
    name: 'Compress JPG to 500KB',
    shortName: 'JPG to 500KB',
    slug: 'compress-jpg-to-500kb',
    description: 'Compress high-res photos to 500KB for quick social sharing and web publishing.',
    longDescription: 'Shrink multi-megapixel DSLR and smartphone photos to 500KB without losing sharpness.',
    category: 'compress',
    icon: 'Minimize2',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['compress jpg to 500kb', '500kb', '500 kb', 'jpg 500kb', 'jpg to 500kb', 'compress to 500kb', '500kb photo compressor'],
    features: ['Retains near-lossless clarity', 'Ultra-fast conversion'],
    howTo: [
      { step: '1', text: 'Upload your file.' },
      { step: '2', text: 'Click "Compress to 500KB".' },
      { step: '3', text: 'Download your file.' }
    ],
    faqs: []
  },
  {
    id: 'compress-image',
    name: 'General Image Compressor',
    shortName: 'Compress Image',
    slug: 'compress-image',
    description: 'Compress JPG, PNG, and WebP images with custom quality settings, metadata stripping, and format flexibility.',
    longDescription: 'A versatile image compression utility supporting JPG, PNG, and WebP files. Adjust compression level from 1% to 100%, compare before/after results, and download instantly.',
    category: 'compress',
    badge: 'Multi-Format',
    icon: 'SlidersHorizontal',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    maxFiles: 10,
    keywords: ['compress image size', 'compress image', 'png compressor', 'webp compressor', 'image optimizer', 'shrink photo', 'reduce image size'],
    features: [
      'Supports JPG, PNG, and WebP formats',
      'Live quality slider from 1% to 100%',
      'Strips unnecessary EXIF metadata to shave extra bytes',
      'Batch compression support'
    ],
    howTo: [
      { step: '1', text: 'Upload one or multiple JPG, PNG, or WebP images.' },
      { step: '2', text: 'Adjust the quality slider to your desired balance.' },
      { step: '3', text: 'Click "Compress Image" and preview the savings.' },
      { step: '4', text: 'Download single files or all as a ZIP archive.' }
    ],
    faqs: [
      {
        q: 'How does PNG compression work?',
        a: 'For PNG images, our engine uses 8-bit palette quantization and zlib level 9 compression to shrink file sizes up to 70% while preserving alpha transparency.'
      }
    ]
  },

  // --- Resizing & Transformation Tools ---
  {
    id: 'resize-image',
    name: 'Image Resizer',
    shortName: 'Resize Image',
    slug: 'resize-image',
    description: 'Resize image dimensions by pixels or percentage with aspect ratio lock and presets for social media.',
    longDescription: 'Easily resize JPG, PNG, and WebP images to exact pixel widths and heights, scale by percentage (e.g. 50%, 75%), or choose from popular presets for Instagram, YouTube, Facebook, and Twitter.',
    category: 'resize',
    badge: 'Popular',
    icon: 'Maximize2',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    maxFiles: 10,
    keywords: ['resize image', 'image resizer', 'change photo dimensions', 'scale image', 'pixel resizer', 'social media photo size'],
    features: [
      'Resize by exact width & height in pixels',
      'Maintain aspect ratio lock / unlock toggle',
      'Scale by percentage (25%, 50%, 75%, custom)',
      'Presets for Instagram, YouTube thumbnail, Facebook cover, Twitter header',
      'High-definition optical resampling for clean edges'
    ],
    howTo: [
      { step: '1', text: 'Upload your image to inspect current dimensions.' },
      { step: '2', text: 'Enter target width & height or select a quick preset.' },
      { step: '3', text: 'Toggle aspect ratio lock to prevent distortion.' },
      { step: '4', text: 'Click "Resize Image" and download the resized file.' }
    ],
    faqs: [
      {
        q: 'Will resizing degrade image clarity or make text blurry?',
        a: 'No. Our high-precision scaling filter preserves sharp contrast and line fidelity whether scaling up or down.'
      }
    ]
  },
  {
    id: 'crop-image',
    name: 'Image Cropper',
    shortName: 'Crop Image',
    slug: 'crop-image',
    description: 'Crop images freely or using standard aspect ratios (1:1, 16:9, 4:3, 9:16) with pixel precision.',
    longDescription: 'Crop any image with an intuitive interactive bounding box. Select custom dimensions or standard aspect ratios like 1:1 square for profile pictures or 16:9 for widescreen headers.',
    category: 'edit',
    icon: 'Crop',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['crop image', 'image cropper', 'photo crop', 'cut image', 'square crop photo'],
    features: [
      'Interactive crop viewport',
      'Aspect ratio presets: 1:1 (Square), 16:9, 4:3, 3:2, 9:16 (Story)',
      'Manual pixel coordinate inputs',
      'Instant preview before downloading'
    ],
    howTo: [
      { step: '1', text: 'Upload the image you want to crop.' },
      { step: '2', text: 'Drag the crop handles or select an aspect ratio preset.' },
      { step: '3', text: 'Click "Crop Image" to apply the crop.' },
      { step: '4', text: 'Download your cropped picture.' }
    ],
    faqs: []
  },
  {
    id: 'rotate-image',
    name: 'Image Rotator',
    shortName: 'Rotate Image',
    slug: 'rotate-image',
    description: 'Rotate images 90° clockwise, 90° counter-clockwise, or 180° upside down with lossless quality.',
    longDescription: 'Fix sideways or upside-down photos instantly. Rotate left, rotate right, or flip upside-down without re-compression degradation.',
    category: 'edit',
    icon: 'RotateCw',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['rotate image', 'turn photo 90 degrees', 'fix sideways photo', 'image rotator'],
    features: ['90° Left, 90° Right, 180° Rotate', 'Batch rotation support', 'Lossless rotation'],
    howTo: [
      { step: '1', text: 'Upload your image.' },
      { step: '2', text: 'Click the Rotate Left, Rotate Right, or 180° buttons.' },
      { step: '3', text: 'Download your rotated image.' }
    ],
    faqs: []
  },
  {
    id: 'flip-image',
    name: 'Image Flipper',
    shortName: 'Flip Image',
    slug: 'flip-image',
    description: 'Flip images horizontally (mirror effect) or vertically with a single click.',
    longDescription: 'Mirror your photos horizontally or flip them vertically upside-down. Perfect for fixing inverted selfies or creating reflective artistic effects.',
    category: 'edit',
    icon: 'FlipHorizontal',
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    keywords: ['flip image', 'mirror photo', 'flip image horizontally', 'flip image vertically'],
    features: ['Horizontal mirror flip', 'Vertical upside-down flip', 'Maintains 100% original quality'],
    howTo: [
      { step: '1', text: 'Upload your image.' },
      { step: '2', text: 'Select "Flip Horizontally" or "Flip Vertically".' },
      { step: '3', text: 'Download your mirrored image.' }
    ],
    faqs: []
  },

  // --- Format Conversion Tools ---
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    shortName: 'JPG to PNG',
    slug: 'jpg-to-png',
    description: 'Convert JPG/JPEG images to lossless PNG format with zero quality loss.',
    longDescription: 'Convert JPG photos into high-definition PNG images. PNG format provides lossless compression, crisp lines, and compatibility with graphic design tools.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg',
    maxFiles: 10,
    keywords: ['jpg to png', 'convert jpg to png', 'jpeg to png converter', 'turn jpg into png'],
    features: ['Lossless PNG conversion', 'High color depth retention', 'Batch conversion with ZIP download'],
    howTo: [
      { step: '1', text: 'Upload your JPG or JPEG files.' },
      { step: '2', text: 'Click "Convert to PNG".' },
      { step: '3', text: 'Download your converted PNG files individually or as a ZIP.' }
    ],
    faqs: [
      {
        q: 'Why convert JPG to PNG?',
        a: 'PNG is a lossless format ideal for screenshots, digital art, text graphics, and editing where you want to prevent generation loss.'
      }
    ]
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    shortName: 'PNG to JPG',
    slug: 'png-to-jpg',
    description: 'Convert PNG images to JPG with custom background color for transparent areas.',
    longDescription: 'Convert transparent or opaque PNG images to lightweight JPGs. Choose a custom background color (white, black, or custom hex) to fill transparent pixels smoothly.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: 'image/png',
    maxFiles: 10,
    keywords: ['png to jpg converter', 'png to jpg', 'convert png to jpg', 'png to jpeg', 'jpeg to png converter', 'change png to jpg with white background'],
    features: [
      'Smart transparency handling with background color selector',
      'Quality control slider',
      'Massive file size reduction compared to PNG',
      'Batch conversion support'
    ],
    howTo: [
      { step: '1', text: 'Upload your PNG image(s).' },
      { step: '2', text: 'Choose background color for transparent pixels (Default: White).' },
      { step: '3', text: 'Click "Convert to JPG" and download the result.' }
    ],
    faqs: [
      {
        q: 'What happens to transparent pixels in PNG when converting to JPG?',
        a: 'Because JPG does not support alpha transparency, transparent areas are automatically replaced with your chosen background color (default is clean white).'
      }
    ]
  },
  {
    id: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    shortName: 'JPG to WebP',
    slug: 'jpg-to-webp',
    description: 'Convert JPG/JPEG images to next-gen WebP format for 30%+ smaller file sizes and faster web pages.',
    longDescription: 'Upgrade your JPG photos to modern WebP format. WebP produces 30% smaller files than JPEG at equivalent visual quality, dramatically boosting Core Web Vitals and Google PageSpeed scores.',
    category: 'convert',
    icon: 'Zap',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg',
    maxFiles: 10,
    keywords: ['jpg to webp', 'convert jpeg to webp', 'webp converter', 'modern web image format'],
    features: ['Next-gen WebP compression', 'Up to 35% smaller than JPEG', 'Perfect for web developers and bloggers'],
    howTo: [
      { step: '1', text: 'Upload your JPG images.' },
      { step: '2', text: 'Click "Convert to WebP".' },
      { step: '3', text: 'Download your optimized WebP images.' }
    ],
    faqs: []
  },
  {
    id: 'png-to-webp',
    name: 'PNG to WebP Converter',
    shortName: 'PNG to WebP',
    slug: 'png-to-webp',
    description: 'Convert PNG images to WebP while preserving full alpha transparency at much smaller file sizes.',
    longDescription: 'Convert bulky transparent PNGs into modern WebP format. WebP preserves 100% alpha transparency while cutting file sizes by up to 50%–70%.',
    category: 'convert',
    icon: 'Zap',
    acceptedTypes: 'image/png',
    maxFiles: 10,
    keywords: ['png to webp', 'convert transparent png to webp', 'webp transparency converter'],
    features: ['Full alpha channel preservation', 'Dramatic size reduction', 'Lossless or lossy WebP modes'],
    howTo: [
      { step: '1', text: 'Upload your PNG files.' },
      { step: '2', text: 'Click "Convert to WebP".' },
      { step: '3', text: 'Download your high-speed WebP files.' }
    ],
    faqs: []
  },
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    shortName: 'WebP to JPG',
    slug: 'webp-to-jpg',
    description: 'Convert WebP images back to universally compatible JPG/JPEG format for any device.',
    longDescription: 'Easily convert downloaded .webp web images into standard .jpg format so they open seamlessly in older photo viewers, Microsoft Office, and mobile galleries.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: 'image/webp',
    maxFiles: 10,
    keywords: ['convert webp to jpg', 'webp to jpg converter', 'webp to jpg', 'convert webp to jpeg', 'open webp as jpg', 'webp converter to jpg'],
    features: ['Universal device compatibility', 'Quality preservation', 'Batch conversion'],
    howTo: [
      { step: '1', text: 'Upload your WebP file(s).' },
      { step: '2', text: 'Click "Convert to JPG".' },
      { step: '3', text: 'Download your universally compatible JPGs.' }
    ],
    faqs: []
  },
  {
    id: 'webp-to-png',
    name: 'WebP to PNG Converter',
    shortName: 'WebP to PNG',
    slug: 'webp-to-png',
    description: 'Convert WebP images to PNG with full transparency and lossless quality.',
    longDescription: 'Convert WebP images into editable PNG files for Photoshop, Figma, Illustrator, and Canva while preserving transparency.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: 'image/webp',
    maxFiles: 10,
    keywords: ['webp to png', 'convert webp to png with transparency', 'webp to png transparent'],
    features: ['Lossless conversion', 'Transparent background preserved', 'Fast batch conversion'],
    howTo: [
      { step: '1', text: 'Upload WebP files.' },
      { step: '2', text: 'Click "Convert to PNG".' },
      { step: '3', text: 'Download your PNG files.' }
    ],
    faqs: []
  },

  // --- PDF Tools ---
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Converter',
    shortName: 'Image to PDF',
    slug: 'image-to-pdf',
    description: 'Combine multiple JPG, PNG, and WebP images into a single professional PDF document.',
    longDescription: 'Create clean, high-resolution PDF documents from your pictures. Customize page size (A4, US Letter, Fit to Image), page orientation (Portrait, Landscape), and margins. Drag to reorder images effortlessly.',
    category: 'pdf',
    badge: 'Popular',
    icon: 'FileText',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg,image/png,image/webp',
    maxFiles: 30,
    keywords: ['image to pdf', 'convert photos to pdf', 'combine images into pdf', 'jpg to pdf', 'png to pdf', 'make pdf from photos'],
    features: [
      'Supports JPG, PNG, and WebP images',
      'Drag & drop to reorder pages easily',
      'Page sizes: A4, US Letter, or Fit to Image dimensions',
      'Orientation: Portrait, Landscape, or Auto',
      'Adjustable margin options (None, Small, Large)',
      '100% In-memory PDF synthesis'
    ],
    howTo: [
      { step: '1', text: 'Upload one or multiple images.' },
      { step: '2', text: 'Drag images to rearrange their page order.' },
      { step: '3', text: 'Configure page size, orientation, and margin settings.' },
      { step: '4', text: 'Click "Generate PDF" and download your document.' }
    ],
    faqs: [
      {
        q: 'How many images can I merge into a PDF?',
        a: 'You can upload and convert up to 30 images at once in your browser without any watermarks or fees.'
      }
    ]
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    shortName: 'JPG to PDF',
    slug: 'jpg-to-pdf',
    description: 'Convert single or multiple JPG images into a high-quality PDF document instantly.',
    longDescription: 'Turn scanned receipts, assignments, photo albums, and documents into a clean PDF with custom page formatting and zero quality loss.',
    category: 'pdf',
    icon: 'FileText',
    popular: true,
    acceptedTypes: 'image/jpeg,image/jpg',
    maxFiles: 30,
    keywords: ['jpg to pdf', 'convert jpeg to pdf', 'combine jpg to pdf', 'photos to pdf document'],
    features: ['A4 & Letter standard formats', 'Reorder pages', 'Fast in-memory processing'],
    howTo: [
      { step: '1', text: 'Upload your JPG images.' },
      { step: '2', text: 'Arrange page sequence if needed.' },
      { step: '3', text: 'Click "Convert to PDF" and download.' }
    ],
    faqs: []
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    shortName: 'PDF to JPG',
    slug: 'pdf-to-jpg',
    description: 'Extract PDF pages as high-resolution JPG images. Download individual pages or all as a ZIP.',
    longDescription: 'Convert any PDF document into crisp, high-resolution JPEG images. Render all pages or select specific page numbers, preview them in the browser, and download individually or packaged in a ZIP archive.',
    category: 'pdf',
    badge: 'Popular',
    icon: 'Image',
    popular: true,
    acceptedTypes: 'application/pdf',
    maxFiles: 1,
    keywords: ['convert pdf to jpg', 'pdf to jpg converter', 'pdf to jpg', 'convert pdf to image', 'extract pages from pdf to jpg', 'pdf to jpeg converter', 'pdf to photo'],
    features: [
      'High DPI page rendering for crisp text and graphics',
      'Select all pages or specific page ranges (e.g. 1, 3-5)',
      'Preview every extracted page directly in the browser',
      'Download individual images or all pages as a ZIP'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Choose to convert all pages or specific pages.' },
      { step: '3', text: 'Click "Convert PDF to JPG".' },
      { step: '4', text: 'Preview extracted pages and download individual JPGs or the full ZIP.' }
    ],
    faqs: [
      {
        q: 'What resolution are the extracted JPGs?',
        a: 'Pages are rendered at high resolution (150–300 DPI) to ensure sharp readability of all text, charts, and embedded images.'
      }
    ]
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF Files',
    shortName: 'Merge PDF',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into one consolidated PDF document in the exact order you want.',
    longDescription: 'Merge two or more PDF files into a single unified document. Drag and drop PDF cards to reorder documents before merging.',
    category: 'pdf',
    badge: 'Popular',
    icon: 'Layers',
    popular: true,
    acceptedTypes: 'application/pdf',
    maxFiles: 20,
    keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'pdf binder', 'merge pdfs online free'],
    features: [
      'Combine up to 20 PDF documents into one',
      'Drag-and-drop to reorder files',
      'Preserves original page orientation, bookmarks, and links',
      'Instant client & serverless processing'
    ],
    howTo: [
      { step: '1', text: 'Upload two or more PDF files.' },
      { step: '2', text: 'Drag the files to put them in the desired order.' },
      { step: '3', text: 'Click "Merge PDF".' },
      { step: '4', text: 'Download your combined PDF document.' }
    ],
    faqs: [
      {
        q: 'Is there a page limit for merging PDFs?',
        a: 'You can merge documents containing hundreds of pages. The processing occurs smoothly without watermarks.'
      }
    ]
  },
  {
    id: 'split-pdf',
    name: 'Split PDF Pages',
    shortName: 'Split PDF',
    slug: 'split-pdf',
    description: 'Extract specific pages or page ranges from a PDF, or split all pages into separate PDF files.',
    longDescription: 'Separate one or more pages from your PDF document. Extract custom page ranges (e.g. 1-3, 5, 8-10) or split every single page into an individual PDF packed in a convenient ZIP file.',
    category: 'pdf',
    icon: 'Scissors',
    popular: true,
    acceptedTypes: 'application/pdf',
    maxFiles: 1,
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'split pdf online free', 'cut pdf'],
    features: [
      'Extract custom page ranges (e.g. 1-4, 7, 9-12)',
      'Split every page into separate individual PDF files',
      'Interactive page preview and selection',
      'ZIP download for multi-file splits'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Specify the page numbers or ranges you want to extract.' },
      { step: '3', text: 'Click "Split PDF".' },
      { step: '4', text: 'Download your extracted PDF or ZIP archive.' }
    ],
    faqs: [
      {
        q: 'How do I specify page ranges?',
        a: 'You can enter comma-separated numbers and hyphens, for example "1-3, 5, 8-10" to extract pages 1, 2, 3, 5, 8, 9, and 10.'
      }
    ]
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF File',
    shortName: 'Compress PDF',
    slug: 'compress-pdf',
    description: 'Reduce PDF file size by optimizing stream structures and compressing internal objects.',
    longDescription: 'Optimize and shrink your PDF document size for email sharing and online submissions. Strips duplicate fonts, compresses metadata streams, and optimizes internal object dictionaries.',
    category: 'pdf',
    icon: 'Minimize2',
    acceptedTypes: 'application/pdf',
    maxFiles: 5,
    keywords: ['compress pdf', 'free compress pdf', 'how to compress pdf', 'compress pdf file size', 'reduce pdf size', 'shrink pdf', 'pdf optimizer', 'make pdf smaller'],
    features: [
      'PDF object and cross-reference stream compression',
      'Removes unreferenced redundant data',
      'Real-time before/after file size calculation',
      'Preserves original formatting and text vectors'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Click "Compress PDF".' },
      { step: '3', text: 'Review the file size savings and download your optimized PDF.' }
    ],
    faqs: [
      {
        q: 'Does compressing PDF affect text sharpness?',
        a: 'No, vector text and font curves remain perfectly crisp and sharp at any zoom level.'
      }
    ]
  },
  {
    id: 'organize-pdf',
    name: 'Organize PDF Pages',
    shortName: 'Organize PDF',
    slug: 'organize-pdf',
    description: 'Reorder, rotate, delete, and organize PDF pages visually with live thumbnail previews.',
    longDescription: 'Our visual PDF organizer renders interactive thumbnail previews of every page in your document. Easily drag to reorder, rotate individual pages, delete unwanted pages, and export your organized PDF.',
    category: 'pdf',
    badge: 'Visual Preview',
    icon: 'Layers',
    popular: true,
    acceptedTypes: 'application/pdf',
    keywords: ['organize pdf', 'reorder pdf pages', 'sort pdf', 'rotate pdf pages'],
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
      { step: '3', text: 'Reorder, rotate, or delete pages as desired.' },
      { step: '4', text: 'Click "Finish" and download your organized PDF.' }
    ],
    faqs: [
      {
        q: 'Can I reorder pages in my PDF visually?',
        a: 'Yes! The visual organizer generates real-time thumbnails for each page, allowing you to move, rotate, and delete pages seamlessly.'
      }
    ]
  },
  {
    id: 'extract-pdf-pages',
    name: 'Extract PDF Pages',
    shortName: 'Extract Pages',
    slug: 'extract-pdf-pages',
    description: 'Select and extract specific pages from a PDF with interactive visual thumbnail previews.',
    longDescription: 'Choose the exact pages you want to keep from your PDF with visual thumbnail cards. Export your extracted pages into a single new PDF document or download separate individual page PDFs.',
    category: 'pdf',
    badge: 'Visual Preview',
    icon: 'Scissors',
    popular: true,
    acceptedTypes: 'application/pdf',
    keywords: ['extract pdf pages', 'separate pdf', 'save specific pdf pages', 'split pdf visually'],
    features: [
      'Visual thumbnail page picker with zoom preview',
      'Batch selection: All, Odd, or Even pages',
      'Export as combined PDF or ZIP of separate pages',
      'Instant client-side rendering with no data retention'
    ],
    howTo: [
      { step: '1', text: 'Select or drop your PDF document.' },
      { step: '2', text: 'Click on page cards to select the pages you want to extract.' },
      { step: '3', text: 'Optionally toggle "Separate PDFs" if you want each page as its own file.' },
      { step: '4', text: 'Click "Finish" to download your extracted document.' }
    ],
    faqs: [
      {
        q: 'Can I extract non-consecutive pages?',
        a: 'Yes! You can click any combination of pages to extract only those pages into a new file.'
      }
    ]
  },
  {
    id: 'delete-pdf-pages',
    name: 'Delete PDF Pages',
    shortName: 'Delete Pages',
    slug: 'delete-pdf-pages',
    description: 'Quickly remove unwanted or blank pages from your PDF with visual thumbnail selection.',
    longDescription: 'Select pages to delete or click the trash icon on individual thumbnail cards to instantly remove them from your PDF file.',
    category: 'pdf',
    badge: 'Visual Preview',
    icon: 'Trash2',
    acceptedTypes: 'application/pdf',
    keywords: ['delete pdf pages', 'remove pages from pdf', 'cut pdf pages', 'delete blank pdf pages'],
    features: [
      'Interactive visual thumbnail selector',
      'One-click trash action on any page card',
      'Instant removal with zero quality loss',
      '100% In-memory processing and strict privacy'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Click the trash icon on the pages you want to discard.' },
      { step: '3', text: 'Click "Finish" to download your cleaned PDF.' }
    ],
    faqs: [
      {
        q: 'Does deleting pages reduce the PDF file size?',
        a: 'Yes, removing unwanted pages will noticeably decrease your total PDF file size.'
      }
    ]
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF Pages',
    shortName: 'Rotate PDF',
    slug: 'rotate-pdf',
    description: 'Rotate individual pages or entire PDF documents with live thumbnail previews.',
    longDescription: 'Fix upside-down or sideways scans. Rotate specific pages 90° clockwise, counter-clockwise, or 180° with live visual feedback.',
    category: 'pdf',
    badge: 'Visual Preview',
    icon: 'RotateCw',
    acceptedTypes: 'application/pdf',
    keywords: ['rotate pdf', 'turn pdf', 'rotate upside down pdf', 'rotate pdf pages online'],
    features: [
      'Visual thumbnail page picker',
      'Rotate individual pages or all pages at once',
      'Lossless rotation without quality degradation',
      '100% In-memory processing'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Use the rotation buttons on page cards or top toolbar.' },
      { step: '3', text: 'Click "Finish" to download your permanently rotated PDF.' }
    ],
    faqs: [
      {
        q: 'Can I rotate only page 1 and leave the rest unchanged?',
        a: 'Yes! Hover over page 1 and click the rotate icon to adjust only that page.'
      }
    ]
  },
  {
    id: 'add-page-numbers-to-pdf',
    name: 'Add Page Numbers to PDF',
    shortName: 'Page Numbers',
    slug: 'add-page-numbers-to-pdf',
    description: 'Insert page numbers into headers or footers with customizable format and placement.',
    longDescription: 'Number your PDF pages with ease. Choose your desired position (bottom center, top right, etc.), format ("Page 1 of N", "1 of N", or "1"), font size, and starting page offset.',
    category: 'pdf',
    icon: 'Hash',
    acceptedTypes: 'application/pdf',
    keywords: ['add page numbers to pdf', 'number pdf pages', 'pdf pagination', 'page numbering online'],
    features: [
      '6 Visual placement positions: Top/Bottom, Left/Center/Right',
      'Flexible numbering styles: "Page X of Y", "X of Y", or "1, 2, 3..."',
      'Custom starting page and font sizing',
      'Instant in-memory stamping with no storage'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Select your preferred position on the page (e.g. Bottom Center).' },
      { step: '3', text: 'Choose the numbering format and font size.' },
      { step: '4', text: 'Click "Add Page Numbers" to download your numbered PDF.' }
    ],
    faqs: [
      {
        q: 'Can I start numbering from page 2 (skipping cover page)?',
        a: 'Yes! Simply set "Start Numbering From Page" to 2 in the tool settings.'
      }
    ]
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark PDF',
    shortName: 'Watermark PDF',
    slug: 'watermark-pdf',
    description: 'Add custom text stamps (like CONFIDENTIAL, DRAFT) or company image logos to your PDF.',
    longDescription: 'Protect your documents by stamping custom text or logos across every page with adjustable opacity and rotation angle.',
    category: 'pdf',
    icon: 'Stamp',
    acceptedTypes: 'application/pdf',
    keywords: ['watermark pdf', 'add watermark to pdf', 'stamp pdf', 'confidential watermark'],
    features: [
      'Text watermarks with custom color & text',
      'Image logo watermark upload',
      'Adjustable transparency (opacity) and rotation angle',
      'Instant in-memory processing'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Choose text or image watermark and customize opacity/rotation.' },
      { step: '3', text: 'Click "Apply Watermark" to download your stamped document.' }
    ],
    faqs: [
      {
        q: 'Will the watermark appear on every page?',
        a: 'Yes, the watermark is applied consistently across all pages of your PDF document.'
      }
    ]
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF Online',
    shortName: 'Sign PDF',
    slug: 'sign-pdf',
    description: 'Draw, type, or upload your electronic signature and stamp it securely onto your PDF.',
    longDescription: 'Sign contracts, agreements, and forms easily. Use our smooth drawing pad, type your name with an elegant handwriting font, or upload a transparent signature image.',
    category: 'pdf',
    badge: 'eSign',
    icon: 'PenTool',
    popular: true,
    acceptedTypes: 'application/pdf',
    keywords: ['sign pdf', 'esign pdf', 'sign document online', 'electronic signature pdf', 'free pdf signer'],
    features: [
      'Draw smooth signatures with mouse or touchscreen',
      'Type signatures with stylish cursive calligraphy fonts',
      'Upload pre-existing signature images',
      '100% In-memory processing with zero document storage'
    ],
    howTo: [
      { step: '1', text: 'Upload the PDF document you want to sign.' },
      { step: '2', text: 'Draw your signature, type your name, or upload a signature image.' },
      { step: '3', text: 'Click "Sign & Finish" to download your signed PDF.' }
    ],
    faqs: [
      {
        q: 'Is this electronic signature legal?',
        a: 'Yes, electronic signatures created with standard tools are widely recognized for contracts and agreements.'
      }
    ]
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG Converter',
    shortName: 'PDF to PNG',
    slug: 'pdf-to-png',
    description: 'Convert PDF document pages into high-resolution, crystal-clear PNG images.',
    longDescription: 'Extract every page of your PDF as a lossless high-DPI PNG image. Preview all rendered pages in real time and download them individually or as a complete ZIP bundle.',
    category: 'convert',
    icon: 'Image',
    acceptedTypes: 'application/pdf',
    keywords: ['pdf to png', 'convert pdf to png', 'pdf to png converter', 'extract png from pdf', 'pdf pages to images', 'pdf to png high resolution'],
    features: [
      'High-DPI 2.0x retina image rendering',
      'Preview every page thumbnail before downloading',
      'One-click Download All (ZIP Archive)',
      '100% Client-side and in-memory execution'
    ],
    howTo: [
      { step: '1', text: 'Select or drag & drop your PDF file.' },
      { step: '2', text: 'Wait a few seconds for all pages to render in your browser.' },
      { step: '3', text: 'Download single pages or click "Download All Images (ZIP)".' }
    ],
    faqs: [
      {
        q: 'What is the difference between PDF to JPG and PDF to PNG?',
        a: 'PNG provides lossless compression which keeps text and graphics extremely sharp with zero compression artifacts.'
      }
    ]
  },
  {
    id: 'txt-to-pdf',
    name: 'TXT to PDF Converter',
    shortName: 'TXT to PDF',
    slug: 'txt-to-pdf',
    description: 'Convert plain text files (.txt) or pasted raw text into clean, formatted PDF documents.',
    longDescription: 'Turn notes, code snippets, documentation, or meeting transcripts into high-quality PDF files with clean Helvetica typography and automatic word wrapping.',
    category: 'convert',
    icon: 'FileCode',
    acceptedTypes: '.txt,.text,.md,.log',
    keywords: ['txt to pdf', 'convert txt to pdf', 'txt to pdf converter', 'text to pdf', 'convert text to pdf', 'notepad to pdf online'],
    features: [
      'Automatic word wrapping and page break pagination',
      'Supports file upload or direct text copy-paste',
      'Clean document margins and title headings',
      'Instant in-memory processing'
    ],
    howTo: [
      { step: '1', text: 'Upload your .txt file or paste your text into the box.' },
      { step: '2', text: 'Click "Convert to PDF" to generate the document.' },
      { step: '3', text: 'Download your finalized PDF.' }
    ],
    faqs: [
      {
        q: 'Can I convert long documents with many pages?',
        a: 'Yes! The converter automatically paginates and breaks long text across multiple pages seamlessly.'
      }
    ]
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF Converter',
    shortName: 'HTML to PDF',
    slug: 'html-to-pdf',
    description: 'Convert HTML code, snippets, and markdown text into clean PDF files.',
    longDescription: 'Turn raw HTML content, web templates, or code documentation into printable PDF documents in seconds.',
    category: 'convert',
    icon: 'FileCode',
    acceptedTypes: '.html,.htm,.txt',
    keywords: ['html to pdf', 'convert html to pdf', 'web page to pdf', 'code to pdf'],
    features: [
      'Strips tags or preserves code typography',
      'Clean PDF pagination and margins',
      'Instant client-side / in-memory compilation',
      'Zero storage guarantee'
    ],
    howTo: [
      { step: '1', text: 'Paste your HTML snippet or upload an HTML file.' },
      { step: '2', text: 'Click "Convert to PDF" to format the output.' },
      { step: '3', text: 'Download your PDF file.' }
    ],
    faqs: [
      {
        q: 'Can I convert raw HTML code directly without saving a file first?',
        a: 'Yes! Simply paste your HTML code into the text area and click convert.'
      }
    ]
  },
  {
    id: 'pdf-scanner',
    name: 'Camera PDF Scanner',
    shortName: 'PDF Scanner',
    slug: 'pdf-scanner',
    description: 'Capture documents, receipts, and pages with your device camera and convert directly to PDF.',
    longDescription: 'Turn your computer webcam or smartphone browser into a document scanner. Snap multi-page photos and combine them into a single clean PDF document in seconds.',
    category: 'pdf',
    badge: 'Camera',
    icon: 'Camera',
    acceptedTypes: 'image/*',
    keywords: ['pdf scanner', 'scan to pdf', 'camera to pdf', 'online document scanner', 'mobile pdf scan'],
    features: [
      'Live camera viewfinder with document alignment guide',
      'Multi-page scan capture and sequence ordering',
      'Automatic high-resolution PDF generation',
      'Works seamlessly on mobile and desktop browsers'
    ],
    howTo: [
      { step: '1', text: 'Click "Open Camera" and allow camera permissions.' },
      { step: '2', text: 'Align your document inside the viewfinder and click "Capture Page".' },
      { step: '3', text: 'Capture additional pages if needed, then click "Convert Scans to PDF".' }
    ],
    faqs: [
      {
        q: 'Does it work on mobile phones without an app?',
        a: 'Yes! It runs directly in Chrome, Safari, and Firefox on iOS and Android without downloading any app.'
      }
    ]
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    shortName: 'Flatten PDF',
    slug: 'flatten-pdf',
    description: 'Merge fillable form fields, annotations, and layers into an uneditable, secure PDF.',
    longDescription: 'Lock and secure your PDF forms and annotations by flattening all active interactive fields into a permanent, non-editable document layer.',
    category: 'pdf',
    icon: 'Layers',
    acceptedTypes: 'application/pdf',
    keywords: ['flatten pdf', 'lock pdf form', 'make pdf uneditable', 'merge pdf layers'],
    features: [
      'Locks interactive form fields and signatures permanently',
      'Prevents unauthorized field modifications',
      'Optimizes document rendering across all PDF viewers',
      '100% In-memory processing'
    ],
    howTo: [
      { step: '1', text: 'Upload your interactive PDF or filled form.' },
      { step: '2', text: 'Click "Flatten PDF" to merge all interactive layers.' },
      { step: '3', text: 'Download your finalized, locked PDF.' }
    ],
    faqs: [
      {
        q: 'Why should I flatten a PDF?',
        a: 'Flattening prevents other people from editing fillable fields, checkboxes, or comments, making it safe for legal submission and archiving.'
      }
    ]
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    shortName: 'Crop PDF',
    slug: 'crop-pdf',
    description: 'Trim margins and crop page dimensions across all pages in your PDF document.',
    longDescription: 'Remove excess blank margins or trim outer boundaries uniformly across all pages of your PDF in seconds.',
    category: 'pdf',
    icon: 'Crop',
    acceptedTypes: 'application/pdf',
    keywords: ['crop pdf', 'trim pdf margins', 'resize pdf pages', 'cut pdf margins'],
    features: [
      'Uniform margin trimming slider (0px - 100px)',
      'Adjusts PDF MediaBox and CropBox boundaries',
      'Lossless content preservation',
      'Zero storage guarantee'
    ],
    howTo: [
      { step: '1', text: 'Upload your PDF document.' },
      { step: '2', text: 'Select how many pixels of margin you want to trim.' },
      { step: '3', text: 'Click "Crop PDF" to download your trimmed document.' }
    ],
    faqs: [
      {
        q: 'Does cropping reduce PDF quality?',
        a: 'No! Cropping simply adjusts the visible page viewport boundaries without recompressing text or images.'
      }
    ]
  },
  {
    id: 'pdf-ocr',
    name: 'PDF OCR & Text Extractor',
    shortName: 'PDF OCR',
    slug: 'pdf-ocr',
    description: 'Extract readable and selectable text from scanned PDF documents.',
    longDescription: 'Extract text layers and recognize characters from scanned PDF documents and image files directly in memory.',
    category: 'convert',
    badge: 'OCR',
    icon: 'ScanText',
    acceptedTypes: 'application/pdf',
    keywords: ['pdf ocr', 'scanned pdf to text', 'extract text from pdf', 'searchable pdf'],
    features: [
      'Extracts text streams and embedded character data',
      'Download as .txt or .doc Word file',
      'One-click Copy to clipboard',
      'Zero storage guarantee'
    ],
    howTo: [
      { step: '1', text: 'Upload your scanned PDF document.' },
      { step: '2', text: 'View the recognized text in the editor.' },
      { step: '3', text: 'Copy text or download as a text/word file.' }
    ],
    faqs: [
      {
        q: 'How does this OCR extractor work?',
        a: 'It scans the underlying character streams and fonts embedded in your PDF document to reconstruct the plain text.'
      }
    ]
  }
,
  // --- New High-Demand Conversion Tools ---
  {
    id: 'jfif-to-jpg',
    name: 'JFIF to JPG Converter',
    shortName: 'JFIF to JPG',
    slug: 'jfif-to-jpg',
    description: 'Convert JFIF images to standard JPG format online for free. Fix Windows camera and browser download issues with zero quality loss.',
    longDescription: 'Turn downloaded .jfif files into universally recognized .jpg photos instantly. 100% in-browser conversion ensures complete file privacy, rapid processing, and zero server upload delays.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: '.jfif,image/jpeg,image/*',
    maxFiles: 10,
    keywords: ['jfif to jpg', 'convert jfif to jpg', 'jfif to jpeg', 'change jfif to jpg', 'jfif converter', 'convert jfif to jpg online free'],
    features: [
      'Instant client-side canvas conversion',
      'Retains original photo dimensions and DPI',
      'No server uploads – 100% private in-browser',
      'Compatible with Windows, Mac, iOS, and Android'
    ],
    howTo: [
      { step: '1', text: 'Select or drag and drop your .jfif file into the upload area.' },
      { step: '2', text: 'Adjust the quality percentage if needed (default is 90% for high fidelity).' },
      { step: '3', text: 'Click "Convert to JPG" to process the image in your browser.' },
      { step: '4', text: 'Click "Download JPG" to save your standard compatible photo.' }
    ],
    faqs: [
      {
        q: 'What is a JFIF file and why convert it to JPG?',
        a: 'JFIF (JPEG File Interchange Format) is a variation of the standard JPEG format often saved by Windows 10/11 or modern web browsers. Many websites, job portals, and photo editors reject .jfif extensions. Converting JFIF to standard JPG ensures universal compatibility.'
      },
      {
        q: 'Is converting JFIF to JPG on JPGEASY safe and private?',
        a: 'Yes. JPGEASY processes your images directly in your browser memory. Your files are never uploaded to any remote server or stored in the cloud.'
      },
      {
        q: 'Will converting JFIF to JPG reduce image quality?',
        a: 'No. JPGEASY preserves the exact pixel dimensions and color data of the original image with zero perceptible quality loss.'
      }
    ]
  },
  {
    id: 'jfif-to-png',
    name: 'JFIF to PNG Converter',
    shortName: 'JFIF to PNG',
    slug: 'jfif-to-png',
    description: 'Convert JFIF files to lossless PNG images online for free with crystal-clear sharpness.',
    longDescription: 'Convert .jfif images into lossless, high-definition PNG format. Perfect for graphic design, web assets, and presentations requiring clean digital rendering.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: '.jfif,image/jpeg,image/*',
    maxFiles: 10,
    keywords: ['jfif to png', 'convert jfif to png', 'jfif to png converter', 'change jfif to png'],
    features: [
      'Lossless PNG output format',
      'Preserves original resolution and crisp details',
      'Fast client-side processing without server delays',
      '100% free with no file limits or watermarks'
    ],
    howTo: [
      { step: '1', text: 'Upload your .jfif image into the tool.' },
      { step: '2', text: 'Click "Convert to PNG" to process the image.' },
      { step: '3', text: 'Download your crisp, high-definition PNG file.' }
    ],
    faqs: [
      {
        q: 'Why convert JFIF to PNG instead of JPG?',
        a: 'PNG is a lossless format, making it ideal if you plan to edit the image further, print it, or use it in graphic software without compression artifacts.'
      }
    ]
  },
  {
    id: 'jfif-to-pdf',
    name: 'JFIF to PDF Converter',
    shortName: 'JFIF to PDF',
    slug: 'jfif-to-pdf',
    description: 'Convert and merge JFIF images into a clean, professional PDF document online for free.',
    longDescription: 'Easily turn one or multiple JFIF photos into a standard PDF document. Reorder pages, select margins and paper sizes (A4, Letter), and download immediately.',
    category: 'pdf',
    icon: 'FileText',
    acceptedTypes: '.jfif,image/jpeg,image/*',
    maxFiles: 30,
    keywords: ['jfif to pdf', 'convert jfif to pdf', 'combine jfif to pdf', 'jfif to pdf converter'],
    features: [
      'Combine multiple JFIF images into one PDF',
      'Custom page sizes: A4, US Letter, and Fit-to-Image',
      'Drag-and-drop page reordering',
      '100% in-browser generation with complete privacy'
    ],
    howTo: [
      { step: '1', text: 'Drop your JFIF images into the converter box.' },
      { step: '2', text: 'Arrange the page order and choose page orientation (portrait/landscape).' },
      { step: '3', text: 'Click "Convert to PDF" to generate your document.' },
      { step: '4', text: 'Download your compiled PDF file instantly.' }
    ],
    faqs: [
      {
        q: 'Can I combine multiple JFIF photos into a single PDF?',
        a: 'Yes, JPGEASY allows you to upload up to 30 JFIF files at once and combine them into a single, multi-page PDF document.'
      }
    ]
  },
  {
    id: 'avif-to-jpg',
    name: 'AVIF to JPG Converter',
    shortName: 'AVIF to JPG',
    slug: 'avif-to-jpg',
    description: 'Convert AVIF images to standard high-compatibility JPG photos online for free. Fast in-browser conversion.',
    longDescription: 'Easily convert next-generation .avif web images into universal .jpg format. Ensure your photos can be opened on any PC, Mac, mobile device, or photo editing app.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: '.avif,image/avif,image/*',
    maxFiles: 10,
    keywords: ['avif to jpg', 'convert avif to jpg', 'avif to jpeg', 'avif to jpg converter', 'change avif to jpg online free'],
    features: [
      'Next-gen AVIF to universal JPG conversion',
      'Adjustable output quality slider',
      'Ultra-fast client-side processing',
      'Zero server uploads – completely secure'
    ],
    howTo: [
      { step: '1', text: 'Upload your .avif image file.' },
      { step: '2', text: 'Select output quality (default is 90%).' },
      { step: '3', text: 'Click "Convert to JPG".' },
      { step: '4', text: 'Download your universal JPG photo.' }
    ],
    faqs: [
      {
        q: 'Why convert AVIF to JPG?',
        a: 'While AVIF provides high compression for modern browsers, many desktop software programs, older smartphones, and email clients cannot open .avif files. Converting to JPG makes them universally viewable.'
      }
    ]
  },
  {
    id: 'avif-to-png',
    name: 'AVIF to PNG Converter',
    shortName: 'AVIF to PNG',
    slug: 'avif-to-png',
    description: 'Convert AVIF pictures into lossless PNG format online for free with transparent support.',
    longDescription: 'Convert AVIF files to high-quality PNG format. Preserves transparent backgrounds and fine visual details without compression degradation.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: '.avif,image/avif,image/*',
    maxFiles: 10,
    keywords: ['avif to png', 'convert avif to png', 'avif to png converter', 'avif to png transparent'],
    features: [
      'Lossless PNG conversion with alpha transparency support',
      'Instant in-browser processing',
      'Maintains exact native image resolution',
      'Zero limits, zero watermarks'
    ],
    howTo: [
      { step: '1', text: 'Upload your AVIF file.' },
      { step: '2', text: 'Click "Convert to PNG".' },
      { step: '3', text: 'Download your transparent or lossless PNG.' }
    ],
    faqs: [
      {
        q: 'Does converting AVIF to PNG preserve transparency?',
        a: 'Yes. If your original AVIF file has transparent elements, JPGEASY preserves the alpha channel perfectly in the output PNG.'
      }
    ]
  },
  {
    id: 'svg-to-jpg',
    name: 'SVG to JPG Converter',
    shortName: 'SVG to JPG',
    slug: 'svg-to-jpg',
    description: 'Rasterize vector SVG files into crisp, high-resolution JPG images with custom clean background.',
    longDescription: 'Convert scalable vector graphics (.svg) into standard raster JPEG photos. High-resolution canvas rendering ensures lines, curves, and text remain sharp and clear.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: '.svg,image/svg+xml,image/*',
    maxFiles: 10,
    keywords: ['svg to jpg', 'convert svg to jpg', 'svg to jpg converter', 'svg to jpeg', 'rasterize svg to jpg'],
    features: [
      'High-resolution vector rasterization',
      'Clean white background fill for opaque JPEG standard',
      'Fast client-side rendering',
      'Safe and private – zero server uploads'
    ],
    howTo: [
      { step: '1', text: 'Upload your .svg vector graphic.' },
      { step: '2', text: 'Set desired output quality percentage.' },
      { step: '3', text: 'Click "Convert to JPG" to rasterize the graphic.' },
      { step: '4', text: 'Download your high-resolution JPG image.' }
    ],
    faqs: [
      {
        q: 'What happens to the transparent background of an SVG when converted to JPG?',
        a: 'Because JPG does not support transparency, JPGEASY automatically renders a clean, solid white background behind your vector graphic.'
      }
    ]
  },
  {
    id: 'svg-to-png',
    name: 'SVG to PNG Converter',
    shortName: 'SVG to PNG',
    slug: 'svg-to-png',
    description: 'Convert SVG vectors into high-resolution transparent PNG images online for free.',
    longDescription: 'Render your SVG vector files into crystal-clear PNG images with full transparency preserved. Ideal for website icons, logos, and digital graphic design.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: '.svg,image/svg+xml,image/*',
    maxFiles: 10,
    keywords: ['svg to png', 'convert svg to png', 'svg to png converter', 'vector to png', 'svg to png transparent'],
    features: [
      'Full alpha transparency preservation',
      'High-DPI sharp vector rendering',
      'Instant in-browser processing with zero server uploads',
      'Download individual PNGs or batch files'
    ],
    howTo: [
      { step: '1', text: 'Upload your vector SVG image.' },
      { step: '2', text: 'Click "Convert to PNG".' },
      { step: '3', text: 'Download your transparent PNG logo or icon.' }
    ],
    faqs: [
      {
        q: 'Can I convert SVG logos to transparent PNG?',
        a: 'Yes, JPGEASY preserves all transparent areas in your SVG, outputting a clean transparent PNG suitable for any background.'
      }
    ]
  },
  {
    id: 'svg-to-pdf',
    name: 'SVG to PDF Converter',
    shortName: 'SVG to PDF',
    slug: 'svg-to-pdf',
    description: 'Convert vector SVG graphics into print-ready PDF documents with perfect resolution.',
    longDescription: 'Turn vector SVG designs and illustrations into standard PDF documents. Perfect for blueprints, schematics, print presentations, and vector document archiving.',
    category: 'pdf',
    icon: 'FileText',
    acceptedTypes: '.svg,image/svg+xml,image/*',
    maxFiles: 20,
    keywords: ['svg to pdf', 'convert svg to pdf', 'svg to pdf converter', 'vector svg to pdf'],
    features: [
      'Crisp high-resolution rendering',
      'Custom PDF paper sizes (A4, Letter, Fit)',
      'Batch conversion of multiple SVGs into a single PDF',
      '100% private in-browser generation'
    ],
    howTo: [
      { step: '1', text: 'Upload your SVG file(s).' },
      { step: '2', text: 'Select page orientation and margin settings.' },
      { step: '3', text: 'Click "Convert to PDF".' },
      { step: '4', text: 'Download your professional PDF file.' }
    ],
    faqs: [
      {
        q: 'Is SVG to PDF vector quality preserved?',
        a: 'Yes, JPGEASY renders high-DPI vector streams onto clean PDF pages ensuring crisp lines even when zoomed in or printed.'
      }
    ]
  },
  {
    id: 'webp-to-pdf',
    name: 'WebP to PDF Converter',
    shortName: 'WebP to PDF',
    slug: 'webp-to-pdf',
    description: 'Convert single or multiple WebP images into a single formatted PDF document online for free.',
    longDescription: 'Easily transform web-saved .webp images into a clean, multi-page PDF document. Rearrange pages, adjust orientation, and compile reports in seconds.',
    category: 'pdf',
    icon: 'FileText',
    acceptedTypes: '.webp,image/webp,image/*',
    maxFiles: 30,
    keywords: ['webp to pdf', 'convert webp to pdf', 'webp to pdf converter', 'combine webp to pdf'],
    features: [
      'Merge multiple WebP images into one organized PDF',
      'Select A4 or US Letter page formats',
      'Drag-and-drop page reordering',
      'Zero server uploads – fully secure in-browser'
    ],
    howTo: [
      { step: '1', text: 'Upload your WebP images.' },
      { step: '2', text: 'Reorder pages if necessary.' },
      { step: '3', text: 'Click "Convert to PDF".' },
      { step: '4', text: 'Download your merged PDF document.' }
    ],
    faqs: [
      {
        q: 'How many WebP files can I convert to PDF at once?',
        a: 'You can convert up to 30 WebP images simultaneously into a single multi-page PDF document.'
      }
    ]
  },
  {
    id: 'tiff-to-jpg',
    name: 'TIFF to JPG Converter',
    shortName: 'TIFF to JPG',
    slug: 'tiff-to-jpg',
    description: 'Convert heavy TIFF and TIF scanner files into lightweight, universal JPG images online.',
    longDescription: 'Quickly convert large .tiff and .tif scanned documents or photos into compressed, universally compatible JPG images. Shrink file sizes by over 80% while retaining readability.',
    category: 'convert',
    icon: 'FileImage',
    acceptedTypes: '.tiff,.tif,image/tiff,image/*',
    maxFiles: 10,
    keywords: ['tiff to jpg', 'tif to jpg', 'convert tiff to jpg', 'tiff to jpeg converter', 'convert tif to jpg online'],
    features: [
      'Converts heavy TIFF/TIF scans into compact JPGs',
      'Fast processing with automatic rotation correction',
      'Strips bloated header data to reduce file size',
      'Safe, private in-browser and secure processing'
    ],
    howTo: [
      { step: '1', text: 'Select or drag your .tiff or .tif file into the upload zone.' },
      { step: '2', text: 'Adjust the output quality percentage.' },
      { step: '3', text: 'Click "Convert to JPG".' },
      { step: '4', text: 'Download your compact JPG image.' }
    ],
    faqs: [
      {
        q: 'Why are TIFF files so large compared to JPG?',
        a: 'TIFF files typically use uncompressed or lossless raster storage designed for publishing and printing. Converting TIFF to JPG compresses redundant data, reducing file size by 80-90% with virtually no visible difference.'
      }
    ]
  },
  {
    id: 'tiff-to-pdf',
    name: 'TIFF to PDF Converter',
    shortName: 'TIFF to PDF',
    slug: 'tiff-to-pdf',
    description: 'Convert scanned TIFF or TIF documents into clean, searchable, compact PDF files online.',
    longDescription: 'Convert multi-page or high-resolution TIFF scans into standardized PDF files. Ideal for office document archival, legal filing, and medical records.',
    category: 'pdf',
    icon: 'FileText',
    acceptedTypes: '.tiff,.tif,image/tiff,image/*',
    maxFiles: 20,
    keywords: ['tiff to pdf', 'tif to pdf', 'convert tiff to pdf', 'convert tif to pdf', 'tiff to pdf converter'],
    features: [
      'Turn TIFF scanner documents into standard PDFs',
      'Custom page margins and standard document sizing',
      'Easy drag-and-drop page sequencing',
      'High security with private processing'
    ],
    howTo: [
      { step: '1', text: 'Upload your TIFF or TIF scanned files.' },
      { step: '2', text: 'Arrange your desired page sequence.' },
      { step: '3', text: 'Click "Convert to PDF".' },
      { step: '4', text: 'Download your compiled PDF document.' }
    ],
    faqs: [
      {
        q: 'Can I combine multiple scanned TIFF pages into one PDF?',
        a: 'Yes, JPGEASY easily combines multiple single-page or multi-page TIFF scans into a single organized PDF document.'
      }
    ]
  },
  {
    id: 'heic-to-jpg',
    name: 'HEIC to JPG Converter',
    shortName: 'HEIC to JPG',
    slug: 'heic-to-jpg',
    description: 'Convert Apple iPhone HEIC and HEIF photos to standard JPG format online for free with zero quality loss.',
    longDescription: 'Effortlessly turn iPhone and iPad .heic photos into standard .jpg images. Fix compatibility issues on Windows, Android, websites, and government upload portals instantly.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: '.heic,.heif,image/heic,image/heif,image/*',
    maxFiles: 10,
    keywords: ['heic to jpg', 'convert heic to jpg', 'how to convert heic to jpg', 'heic to jpg converter', 'iphone heic to jpg', 'convert heic to jpg online free'],
    features: [
      'Universal Apple iPhone HEIC to JPG conversion',
      'Preserves original EXIF metadata and orientation',
      'Retains true 100% photo resolution and color depth',
      '100% free with instant download'
    ],
    howTo: [
      { step: '1', text: 'Upload your iPhone .heic or .heif photo.' },
      { step: '2', text: 'Select desired quality (default 90% retains maximum fidelity).' },
      { step: '3', text: 'Click "Convert to JPG".' },
      { step: '4', text: 'Download your universally compatible JPG photo.' }
    ],
    faqs: [
      {
        q: 'Why does my Windows computer or website reject iPhone photos?',
        a: 'Apple devices take photos in the high-efficiency HEIC format by default. Most Windows PCs, Android phones, and online upload portals do not support HEIC natively. Converting HEIC to standard JPG makes them open everywhere.'
      },
      {
        q: 'Is converting HEIC to JPG on JPGEASY free?',
        a: 'Yes, JPGEASY is 100% free with no file limits, watermarks, or sign-up requirements.'
      }
    ]
  },
  {
    id: 'webp-to-gif',
    name: 'WebP to GIF Converter',
    shortName: 'WebP to GIF',
    slug: 'webp-to-gif',
    description: 'Convert WebP images and animated WebP files to universal GIF format online for free with full animation support.',
    longDescription: 'Turn static and animated WebP files into universally compatible GIFs. Perfect for Discord, Slack, PowerPoint, forums, and social platforms that lack WebP animation support.',
    category: 'convert',
    badge: 'Popular',
    icon: 'FileImage',
    popular: true,
    acceptedTypes: '.webp,image/webp,image/*',
    maxFiles: 10,
    keywords: ['webp to gif', 'convert webp to gif', 'webp to gif converter', 'animated webp to gif', 'turn webp into gif', 'webp to gif animation free'],
    features: [
      'Converts both static and animated WebP files to GIF',
      'Preserves animation frame timing and loop cycles',
      'Universally compatible with Discord, Slack, and email clients',
      '100% Free, browser-safe, and private with instant download'
    ],
    howTo: [
      { step: '1', text: 'Select or drag & drop your WebP image or animation.' },
      { step: '2', text: 'Click "Convert to GIF" to initiate high-speed animation encoding.' },
      { step: '3', text: 'Preview your animated GIF in the player.' },
      { step: '4', text: 'Click "Download GIF" to save your file.' }
    ],
    faqs: [
      {
        q: 'Does this converter preserve animations in WebP files?',
        a: 'Yes! JPGEASY fully supports animated WebP files, preserving all frame timings, dimensions, and infinite loop cycles in the resulting GIF.'
      },
      {
        q: 'Why should I convert WebP to GIF?',
        a: 'While WebP produces smaller file sizes, many legacy chat applications, forum software, email clients, and presentation apps (like PowerPoint) do not support animated WebP. Converting to GIF ensures your animations play seamlessly everywhere.'
      },
      {
        q: 'Is this WebP to GIF converter free?',
        a: 'Yes, JPGEASY is completely free with no watermarks, registration, or hidden file limits.'
      }
    ]
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Tools', count: TOOLS.length },
  { id: 'compress', name: 'Compression', count: TOOLS.filter(t => t.category === 'compress').length },
  { id: 'convert', name: 'Conversion', count: TOOLS.filter(t => t.category === 'convert').length },
  { id: 'resize', name: 'Resize & Scale', count: TOOLS.filter(t => t.category === 'resize').length },
  { id: 'edit', name: 'Crop & Rotate', count: TOOLS.filter(t => t.category === 'edit').length },
  { id: 'pdf', name: 'PDF Tools', count: TOOLS.filter(t => t.category === 'pdf').length },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
