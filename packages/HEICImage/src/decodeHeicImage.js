// @ts-expect-error
import libheif from 'libheif-js';
const decodeQueue = [];

export function decodeHeicImage(buffer) {
  return new Promise((resolve) => {
    decodeQueue.push({ buffer, resolve });
    if (decodeQueue.length === 1) {
      decodeHeicImageImpl();
    } else {
      decodeQueue.push({ buffer, resolve });
    }
  });
}

function decodeHeicImageImpl() {
  const { buffer, resolve } = decodeQueue[0];
  const decoder = new libheif.HeifDecoder();
  const [image] = decoder.decode(buffer);
  const width = image.get_width();
  const height = image.get_height();
  const data = new Uint8ClampedArray(width * height * 4);
  image.display({ data, width, height }, async () => {
    const newImage = new ImageData(data, width, height);
    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext('2d');
    ctx?.putImageData(newImage, 0, 0);
    const blob = await offscreenCanvas.convertToBlob();
    const imageUrl = URL.createObjectURL(blob);
    image.free();
    resolve(imageUrl);
    decodeQueue.shift();
    if (decodeQueue.length > 0) {
      decodeHeicImageImpl();
    }
  });
}
