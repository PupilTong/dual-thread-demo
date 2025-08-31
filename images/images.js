import Image1Heic from './1.heic';
import Image2Heic from './2.heic';
import Image3Heic from './3.heic';
import Image4Heic from './4.heic';
import Image5Heic from './5.heic';
import Image6Heic from './6.heic';
import Image7Heic from './7.heic';
import Image8Heic from './8.heic';

const baseImageUrls = [
  Image1Heic,
  Image2Heic,
  Image3Heic,
  Image4Heic,
  Image5Heic,
  Image6Heic,
  Image7Heic,
  Image8Heic,
];

export function getImageUrls(index) {
  return baseImageUrls[index % baseImageUrls.length];
}
