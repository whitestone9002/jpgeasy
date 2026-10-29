import sharp from 'sharp';
// @ts-ignore
import heicDecode from 'heic-decode';
// @ts-ignore
import heicConvert from 'heic-convert';

export interface ConvertOptions {
  targetFormat: 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff' | 'gif';
  quality?: number;
}

export async function convertImageFormat(
  inputBuffer: Buffer,
  options: ConvertOptions
) {
  const originalSize = inputBuffer.length;
  let workingBuffer = inputBuffer;

  // Detect HEIC/HEIF container
  const isHeic =
    workingBuffer.length > 12 &&
    workingBuffer.subarray(4, 12).toString('latin1').includes('ftyp') &&
    (workingBuffer.subarray(8, 16).toString('latin1').includes('heic') ||
      workingBuffer.subarray(8, 16).toString('latin1').includes('mif1') ||
      workingBuffer.subarray(8, 16).toString('latin1').includes('heix') ||
      workingBuffer.subarray(8, 16).toString('latin1').includes('hevc'));

  let rawDecoded: { width: number; height: number; data: Uint8Array | Buffer } | null = null;

  if (isHeic) {
    try {
      const decodeFn = (heicDecode as any)?.default || heicDecode;
      if (typeof decodeFn === 'function') {
        const decoded = await decodeFn({ buffer: workingBuffer });
        if (decoded && decoded.data) {
          rawDecoded = {
            width: decoded.width,
            height: decoded.height,
            data: decoded.data,
          };
        }
      }
    } catch (decodeErr) {
      console.warn('heic-decode failed, attempting heic-convert fallback:', decodeErr);
      try {
        const convertFn = (heicConvert as any)?.default || heicConvert;
        if (typeof convertFn === 'function') {
          const jpegConverted = await convertFn({
            buffer: workingBuffer,
            format: 'JPEG',
            quality: (options.quality || 90) / 100,
          });
          workingBuffer = Buffer.from(jpegConverted);
        }
      } catch (heicErr) {
        console.warn('heic-convert fallback failed:', heicErr);
      }
    }
  }

  let pipeline: sharp.Sharp;
  let originalWidth = 800;
  let originalHeight = 600;

  if (rawDecoded) {
    originalWidth = rawDecoded.width;
    originalHeight = rawDecoded.height;
    pipeline = sharp(Buffer.from(rawDecoded.data.buffer), {
      raw: {
        width: rawDecoded.width,
        height: rawDecoded.height,
        channels: 4,
      },
      failOnError: false,
    });
  } else {
    let metadata;
    try {
      metadata = await sharp(workingBuffer, { failOnError: false }).metadata();
    } catch (err: any) {
      if (!isHeic) {
        try {
          const convertFn = (heicConvert as any)?.default || heicConvert;
          if (typeof convertFn === 'function') {
            const jpegConverted = await convertFn({
              buffer: workingBuffer,
              format: 'JPEG',
              quality: (options.quality || 90) / 100,
            });
            workingBuffer = Buffer.from(jpegConverted);
            metadata = await sharp(workingBuffer, { failOnError: false }).metadata();
          } else {
            throw err;
          }
        } catch {
          throw err;
        }
      } else {
        throw err;
      }
    }

    const isTransposed = metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8;
    originalWidth = (isTransposed ? metadata.height : metadata.width) || 800;
    originalHeight = (isTransposed ? metadata.width : metadata.height) || 600;

    const isSvg =
      workingBuffer.length > 20 &&
      (workingBuffer.subarray(0, 200).toString('utf8').includes('<svg') ||
        workingBuffer.subarray(0, 200).toString('utf8').includes('<?xml'));
    const isAnimatedTarget = options.targetFormat === 'gif';
    const sharpOptions = isSvg
      ? { density: 300, failOnError: false }
      : { animated: isAnimatedTarget, failOnError: false };

    pipeline = sharp(workingBuffer, sharpOptions).rotate();
  }

  const quality = options.quality || 90;

  if (options.targetFormat === 'jpeg') {
    // For JPEG output: flatten alpha transparency onto clean white background
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (options.targetFormat === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else if (options.targetFormat === 'webp') {
    pipeline = pipeline.webp({ quality, effort: 5 });
  } else if (options.targetFormat === 'avif') {
    pipeline = pipeline.avif({ quality, effort: 4 });
  } else if (options.targetFormat === 'tiff') {
    pipeline = pipeline.tiff({ quality });
  } else if (options.targetFormat === 'gif') {
    pipeline = pipeline.gif();
  }

  const { data: resultBuffer, info } = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    buffer: resultBuffer,
    size: resultBuffer.length,
    originalSize,
    width: info.width || originalWidth,
    height: (info as any).pageHeight || info.height || originalHeight,
    format: options.targetFormat,
    reductionPercentage:
      originalSize > 0
        ? parseFloat((((originalSize - resultBuffer.length) / originalSize) * 100).toFixed(1))
        : 0,
  };
}
