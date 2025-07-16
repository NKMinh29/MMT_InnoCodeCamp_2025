import React from 'react';

const DefaultAvatar = ({ size = 48 }) => (
  <div
    className="bg-gray-300 rounded-full flex items-center justify-center"
    style={{ width: size, height: size }}
  >
    <div
      className="bg-gray-400 rounded-full"
      style={{ width: size * 0.6, height: size * 0.6 }}
    />
  </div>
);

export default DefaultAvatar; 