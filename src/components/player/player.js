import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Operations } from '../../redux/reducer/data/actions';
import { getMovieById } from '../../redux/reducer/data/selectors';
import history from '../../history';
import { parseVideoRuntime } from '../../utils';

const Player = () => {
  const dispatch = useDispatch();
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(false);
  const { id } = useParams();
  dispatch(Operations.loadMovie(id));
  const movie = useSelector(state => getMovieById(state, id));
  const { background, video, title } = movie;

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

  const getTime = e => {
    const time = parseVideoRuntime(e.target.duration);
    setTime(time);
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
    <div className='player'>
      <video
        className='player__video'
        poster={background}
        ref={videoRef}
        // controls={true}
        onLoadedMetadata={getTime}
      >
        <source src={video} />
      </video>

      <button type='button' className='player__exit' onClick={onExitClick}>
        Exit
      </button>

      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress
              className='player__progress'
              value='0'
              max='100'
            ></progress>
            <div className='player__toggler' style={{ left: '0%' }}>
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
  );
};

export default Player;
