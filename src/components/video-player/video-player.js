import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ movie, isActive }) => {
  const { poster, preview } = movie;
  const videoRef = useRef();

  useEffect(() => {
    if (isActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <video width='280' muted height='175' poster={poster} ref={videoRef}>
      <source src={preview} type='video/webm' />
    </video>
  );
};

VideoPlayer.propTypes = {
  movie: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default VideoPlayer;
