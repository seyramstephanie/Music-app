// components/AudioPlayer.js
import React from 'react';

const AudioPlayer = ({ currentSong, isPlaying, onPlayPause }) => {
  if (!currentSong) return null;

  return (
    <div className="audio-player">
      <div className="player-info">
        <div className="now-playing">
          <div className="album-art-small">
            {currentSong.albumArt ? (
              <img src={currentSong.albumArt} alt={currentSong.title} />
            ) : (
              <div className="placeholder-small">🎵</div>
            )}
          </div>
          <div className="song-details">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-btn">⏮</button>
        <button 
          className="play-pause-btn"
          onClick={() => onPlayPause(!isPlaying)}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn">⏭</button>
      </div>

      <div className="player-progress">
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <span className="time">0:00 / {currentSong.duration}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;