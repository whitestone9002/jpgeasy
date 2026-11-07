import { PDFDocument, PageSizes } from 'pdf-lib';
import sharp from 'sharp';
import { convertImageFormat } from '@/lib/image/converter';

export interface ImageToPdfOptions {
  pageSize?: 'A4' | 'LETTER' | 'FIT';
  orientation?: 'portrait' | 'landscape' | 'auto';
  margin?: 'none' | 'small' | 'large'; // none: 0, small: 20, large: 40
}

export interface ImageInputItem {
  buffer: Buffer;
  name: string;
}

export async function convertImagesToPdf(
  images: ImageInputItem[],
  options: ImageToPdfOptions = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  const marginMap = {
    none: 0,
    small: 20,
    large: 40,
  };
  const margin = marginMap[options.margin || 'small'] ?? 20;

  for (const item of images) {
    let imageBuffer = item.buffer;
    const isHeic =
      (item.name || '').toLowerCase().endsWith('.heic') ||
      (item.name || '').toLowerCase().endsWith('.heif') ||
      (imageBuffer.length > 12 &&
        imageBuffer.subarray(4, 12).toString('latin1').includes('ftyp') &&
        (imageBuffer.subarray(8, 16).toString('latin1').includes('heic') ||
          imageBuffer.subarray(8, 16).toString('latin1').includes('mif1') ||
          imageBuffer.subarray(8, 16).toString('latin1').includes('heix') ||
          imageBuffer.subarray(8, 16).toString('latin1').includes('hevc')));

    if (isHeic) {
      try {
        const conv = await convertImageFormat(imageBuffer, { targetFormat: 'jpeg', quality: 92 });
        imageBuffer = conv.buffer;
      } catch (heicErr) {
        console.warn('HEIC decode in imageToPdf failed:', heicErr);
      }
    }

    // Normalize image to clean JPEG or PNG using sharp
    const meta = await sharp(imageBuffer).metadata();
    const hasAlpha = !!meta.hasAlpha;

    let embedImage;
    if (hasAlpha || meta.format === 'png') {
      const pngBuffer = await sharp(imageBuffer).png().toBuffer();
      embedImage = await pdfDoc.embedPng(pngBuffer);
    } else {
      const jpgBuffer = await sharp(imageBuffer)
        .jpeg({ quality: 92, mozjpeg: true })
        .toBuffer();
      embedImage = await pdfDoc.embedJpg(jpgBuffer);
    }

    const imgWidth = embedImage.width;
    const imgHeight = embedImage.height;

    let pageWidth: number;
    let pageHeight: number;

    const chosenPageSize = options.pageSize || 'A4';

    if (chosenPageSize === 'FIT') {
      pageWidth = imgWidth + margin * 2;
      pageHeight = imgHeight + margin * 2;
    } else {
      const standardSize = chosenPageSize === 'LETTER' ? PageSizes.Letter : PageSizes.A4;
      const isLandscape =
        options.orientation === 'landscape' ||
        (options.orientation === 'auto' && imgWidth > imgHeight);

      pageWidth = isLandscape ? standardSize[1] : standardSize[0];
      pageHeight = isLandscape ? standardSize[0] : standardSize[1];
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate image render dimensions fitting inside page with margin
    const availWidth = pageWidth - margin * 2;
    const availHeight = pageHeight - margin * 2;

    const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;

    const x = margin + (availWidth - renderWidth) / 2;
    const y = margin + (availHeight - renderHeight) / 2;

    page.drawImage(embedImage, {
      x,
      y,
      width: renderWidth,
      height: renderHeight,
    });
  }

  return await pdfDoc.save();
}
