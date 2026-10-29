import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
// @ts-ignore
import heicDecode from 'heic-decode';
// @ts-ignore
import heicConvert from 'heic-convert';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'Empty file provided' }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File exceeds 20 MB upload limit per file.' }, { status: 400 });
    }

    let buffer = Buffer.from(await file.arrayBuffer());

    const fileName = (file.name || '').toLowerCase();
    const isHeic =
      fileName.endsWith('.heic') ||
      fileName.endsWith('.heif') ||
      (buffer.length > 12 &&
        buffer.subarray(4, 12).toString('latin1').includes('ftyp') &&
        (buffer.subarray(8, 16).toString('latin1').includes('heic') ||
          buffer.subarray(8, 16).toString('latin1').includes('mif1') ||
          buffer.subarray(8, 16).toString('latin1').includes('heix') ||
          buffer.subarray(8, 16).toString('latin1').includes('hevc')));

    if (isHeic) {
      try {
        const decodeFn = (heicDecode as any)?.default || heicDecode;
        if (typeof decodeFn === 'function') {
          // If multi-image / embedded thumbnail is available, use decode.all to get the fastest thumbnail
          const allFn = decodeFn.all || (heicDecode as any).all;
          if (typeof allFn === 'function') {
            try {
              const images = await allFn({ buffer });
              if (images && images.length > 0) {
                // Find best preview image: prefer embedded thumbnail if available, otherwise primary
                const previewImg = images.find((img: any) => img.width >= 320 && img.width <= 1600) || images[0];
                const naturalW = images[0].width || 800;
                const naturalH = images[0].height || 600;
                const decoded = await previewImg.decode();
                if (typeof images.dispose === 'function') {
                  try { images.dispose(); } catch {}
                }

                const previewBuffer = await sharp(Buffer.from(decoded.data.buffer), {
                  raw: {
                    width: decoded.width,
                    height: decoded.height,
                    channels: 4,
                  },
                })
                  .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
                  .jpeg({ quality: 85 })
                  .toBuffer();

                const dataUrl = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`;
                return NextResponse.json({
                  success: true,
                  previewUrl: dataUrl,
                  width: naturalW,
                  height: naturalH,
                  format: 'jpeg',
                });
              }
            } catch (allErr) {
              console.warn('decode.all failed, falling back to single decode:', allErr);
            }
          }

          // Single decode fallback
          const decoded = await decodeFn({ buffer });
          const previewBuffer = await sharp(Buffer.from(decoded.data.buffer), {
            raw: {
              width: decoded.width,
              height: decoded.height,
              channels: 4,
            },
          })
            .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 85 })
            .toBuffer();

          const dataUrl = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`;
          return NextResponse.json({
            success: true,
            previewUrl: dataUrl,
            width: decoded.width,
            height: decoded.height,
            format: 'jpeg',
          });
        }
      } catch (decodeErr) {
        console.warn('heic-decode failed, trying heic-convert:', decodeErr);
        try {
          const convertFn = (heicConvert as any)?.default || heicConvert;
          if (typeof convertFn === 'function') {
            const jpegConverted = await convertFn({
              buffer,
              format: 'JPEG',
              quality: 0.8,
            });
            buffer = Buffer.from(jpegConverted);
          }
        } catch (heicErr) {
          console.warn('heic-convert preview fallback failed:', heicErr);
        }
      }
    }

    const rawImage = sharp(buffer, { failOnError: false });
    const metadata = await rawImage.metadata();

    const isRotated90 = metadata.orientation && [5, 6, 7, 8].includes(metadata.orientation);
    const naturalWidth = isRotated90 ? (metadata.height || 800) : (metadata.width || 800);
    const naturalHeight = isRotated90 ? (metadata.width || 600) : (metadata.height || 600);

    // Auto-orient according to EXIF and downscale to max 1600px for instant thumbnail/preview
    const previewBuffer = await rawImage
      .rotate()
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const dataUrl = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`;

    return NextResponse.json({
      success: true,
      previewUrl: dataUrl,
      width: naturalWidth,
      height: naturalHeight,
      format: metadata.format || 'jpeg',
    });
  } catch (err: any) {
    console.error('Image preview extraction error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to generate preview' }, { status: 500 });
  }
}
