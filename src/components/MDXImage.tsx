import React from 'react';

interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const MDXImage: React.FC<MDXImageProps> = ({ src, alt, ...props }) => {
  // Get the base URL from environment variable
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If src starts with /images/, prepend the base URL
  const imageSrc = src.startsWith('/images/') 
    ? `${baseUrl}${src.slice(1)}` // Remove leading slash and prepend base URL
    : src;

  return <img src={imageSrc} alt={alt} {...props} />;
};

export default MDXImage;