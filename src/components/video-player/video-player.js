import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ movie, isActive }) => {
  const { poster, preview } = movie;
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        videoRef.current.play();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isActive]);

  return (
    <video width='280' muted height='175' poster={poster} ref={videoRef}>
      <source src={preview} type='video/webm' />
    </video>
  );
};

export default VideoPlayer;
