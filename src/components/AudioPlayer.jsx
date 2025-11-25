// src/components/AudioPlayer.jsx
import React from 'react';

const AudioPlayer = ({ currentSong, isPlaying, onPlayPause }) => {
  if (!currentSong) {
    return (
      <div className="audio-player idle">
        <div className="idle-message">
          <p>Select a song to start playing</p>
        </div>
      </div>
    );
  }

  const handlePlayClick = () => {
    if (currentSong.audioUrl) {
      if (currentSong.audioUrl.includes('youtube.com') || currentSong.audioUrl.includes('youtu.be')) {
        window.open(currentSong.audioUrl, '_blank');
      } else {
        console.log('Playing audio:', currentSong.audioUrl);
      }
    }
    onPlayPause(!isPlaying);
  };

  const handleYouTubeClick = () => {
    if (currentSong.audioUrl) {
      window.open(currentSong.audioUrl, '_blank');
    }
  };

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
            <div className="song-meta">
              <span className="song-category-small">{currentSong.category}</span>
              <span className="song-duration-small">{currentSong.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-btn" title="Previous">⏮</button>
        <button 
          className="play-pause-btn"
          onClick={handlePlayClick}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn" title="Next">⏭</button>
        
        {currentSong.audioUrl && currentSong.audioUrl.includes('youtube') && (
          <button 
            className="control-btn youtube-btn"
            onClick={handleYouTubeClick}
            title="Open in YouTube"
          >
          </button>
        )}
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