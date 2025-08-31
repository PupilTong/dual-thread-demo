import { useState, useEffect } from 'react';
import { decodeHeicImage } from './decodeHeicImage.js';

export function createHEICImage(Container, ImageRender) {
  const HEICImage = ({ src }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      if (src) {
        const fetchImage = async () => {
          const buffer = await fetch(src).then((response) =>
            response.arrayBuffer()
          );
          const decodedImage = await decodeHeicImage(buffer);
          setImageSrc(decodedImage);
        };
        fetchImage();
        return () => {
          if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
          }
          setImageSrc(undefined);
        };
      }
    }, [src]);

    return (
      imageSrc
        ? <ImageRender className={'image'} src={imageSrc} />
        : <Container className={'skeleton'} />
    );
  };
  return HEICImage;
}
