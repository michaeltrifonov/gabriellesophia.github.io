import React from 'react';
import { getAssetPath } from '../utils/assets';

interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const MDXImage: React.FC<MDXImageProps> = ({ src, alt, ...props }) => {
  // If src starts with /images/, use getAssetPath to handle base URL
  const imageSrc = src.startsWith('/images/') ? getAssetPath(src) : src;

  return <img src={imageSrc} alt={alt} {...props} />;
};

export default MDXImage;