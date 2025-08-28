import { useState, useEffect } from '@lynx-js/react';
// @ts-expect-error
import libheif from 'libheif-js';

interface HeicImageProps {
  src: string | null;
}

export const HeicImage = ({
  src,
}: HeicImageProps): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    //@ts-expect-error
    if (SystemInfo.platform !== 'web') {
      setImageSrc(src);
    }
    else if (src) {
      let revoked = false;
      const decodeImage = async () => {
        const decoder = new libheif.HeifDecoder();
        const buffer = await fetch(src).then((response) =>
          response.arrayBuffer(),
        );
        const [image] = decoder.decode(buffer);
        const width = image.get_width();
        const height = image.get_height();
        const data = new Uint8ClampedArray(width * height * 4);
        const { promise, resolve } = Promise.withResolvers();
        image.display({ data, width, height }, async () => {
          const newImage = new ImageData(data, width, height);
          const offscreenCanvas = new OffscreenCanvas(width, height);
          const ctx = offscreenCanvas.getContext('2d');
          ctx?.putImageData(newImage, 0, 0);
          const blob = await offscreenCanvas.convertToBlob();
          const imageUrl = URL.createObjectURL(blob);
          image.free();
          if (!revoked) {
            setImageSrc(imageUrl);
          }
          resolve(null);
        });
        await promise;
      };

      decodeImage();

      return () => {
        revoked = true;
        if (imageSrc) {
          URL.revokeObjectURL(imageSrc);
        }
      };
    } else {
      setImageSrc(null);
    }
  }, [src]);
  return imageSrc ? <image className={'skeleton'} src={imageSrc} /> : <view className={'skeleton'} />

};
