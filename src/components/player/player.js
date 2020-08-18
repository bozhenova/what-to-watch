import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieById } from '../../redux/reducer/data/selectors';
import history from '../../history';
import { parseVideoRuntime } from '../../utils';

const Player = () => {
  const videoRef = useRef();
  const progressRef = useRef();
  const togglerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState('00:00');
  const { id } = useParams();
  const movie = useSelector(state => getMovieById(state, id)) || {};
  const { background, video, title } = movie;
  let mousedown = false;

  const onPlayClick = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const onPauseClick = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const onExitClick = () => {
    history.push(`/film/${id}`);
  };

  const clickHandler = e => {
    if (mousedown) {
      mousedown = false;
      return;
    }
    const newTime =
      (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * 100;
    videoRef.current.currentTime = (videoRef.current.duration * newTime) / 100;
    handleProgress();
  };

  const handleMove = e => {
    if (e.offsetX) {
      const newTime = (e.offsetX / progressRef.current.offsetWidth) * 100;
      videoRef.current.currentTime =
        (videoRef.current.duration * newTime) / 100;
      handleProgress();
    }
  };

  const handleProgress = () => {
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    progressRef.current.value = percent;
    togglerRef.current.style.left = `${percent}%`;
    setTime(parseVideoRuntime(videoRef.current.currentTime));
  };

  const mouseMoveHandler = e => {
    return mousedown && handleMove(e);
  };

  const mouseUpHandler = () => {
    mousedown = false;
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler = () => {
    mousedown = true;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const onFullScreenClick = () => {
    const video = videoRef.current;

    if (video && !document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      {Object.keys(movie).length ? (
        <div className='player'>
          <video
            className='player__video'
            poster={background}
            ref={videoRef}
            onTimeUpdate={handleProgress}
            src={video}
          />

          <button type='button' className='player__exit' onClick={onExitClick}>
            Exit
          </button>

          <div className='player__controls'>
            <div className='player__controls-row'>
              <div className='player__time'>
                <progress
                  ref={progressRef}
                  onClick={clickHandler}
                  onMouseMove={mouseMoveHandler}
                  onMouseDown={mouseDownHandler}
                  onMouseUp={mouseUpHandler}
                  className='player__progress'
                  value='0'
                  max='100'
                ></progress>
                <div
                  className='player__toggler'
                  ref={togglerRef}
                  style={{ left: '0%' }}
                  onMouseMove={mouseMoveHandler}
                  onMouseDown={mouseDownHandler}
                  onMouseUp={mouseUpHandler}
                >
                  Toggler
                </div>
              </div>
              <div className='player__time-value'>{time}</div>
            </div>

            <div className='player__controls-row'>
              {!isPlaying ? (
                <button
                  type='button'
                  className='player__play'
                  onClick={onPlayClick}
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </button>
              ) : (
                <button
                  type='button'
                  className='player__play'
                  onClick={onPauseClick}
                >
                  <svg viewBox='0 0 14 21' width='14' height='21'>
                    <use xlinkHref='#pause' />
                  </svg>
                  <span>Pause</span>
                </button>
              )}

              <div className='player__name'>{title}</div>

              <button
                type='button'
                className='player__full-screen'
                onClick={onFullScreenClick}
              >
                <svg viewBox='0 0 27 27' width='27' height='27'>
                  <use xlinkHref='#full-screen' />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Player;
