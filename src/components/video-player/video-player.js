import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ movie, isActive }) => {
  const { poster, preview } = movie;
  const videoRef = useRef();

  useEffect(() => {
    let playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      if (isActive) {
        playPromise
          .then(_ => {})
          .catch(error => {
            return error;
          });
      }
    }
  }, [isActive]);

  return (
    <video
      width='280'
      muted
      height='175'
      poster={poster}
      ref={videoRef}
      src={preview}
    >
      {/* <source src={preview} /> */}
    </video>
  );
};

VideoPlayer.propTypes = {
  movie: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default VideoPlayer;
