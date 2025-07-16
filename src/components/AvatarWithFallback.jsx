import React, { useState } from 'react';
import DefaultAvatar from './DefaultAvatar';

const AvatarWithFallback = ({ src, alt, size = 48, className = '' }) => {
  const [error, setError] = useState(false);
  if (!src || error) {
    return <DefaultAvatar size={size} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default AvatarWithFallback; 