import React from 'react';
import DefaultAvatar from './DefaultAvatar';

const getUserKey = (key, username) => `${key}_${username}`;

const AvatarWithFallback = ({ avatar, name, size = 48, username }) => {
  let finalAvatar = avatar;
  if (!finalAvatar && username) {
    const saved = localStorage.getItem(getUserKey('avatar', username));
    if (saved) finalAvatar = saved;
  }
  return finalAvatar ? (
    <img
      src={finalAvatar}
      alt={name}
      className={`rounded-full object-cover`}
      style={{ width: size, height: size }}
    />
  ) : (
    <div className="rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold" style={{ width: size, height: size, fontSize: size / 2 }}>
      {name ? name[0].toUpperCase() : '?'}
    </div>
  );
};

export default AvatarWithFallback; 