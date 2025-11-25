// src/components/MusicCard.jsx
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const MusicCard = ({ song, onPlay, isDraggable = false }) => {
  const audioRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'song',
    item: { id: song.id, type: 'song' },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [song.id, isDraggable]);

  const handlePlay = () => {
    onPlay(song);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you'd update the song's albumArt in the state
        console.log('Uploaded album art:', e.target.result);
        // You would call a function like: onUpdateSongArt(song.id, e.target.result)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      ref={isDraggable ? drag : null}
      className={`music-card ${isDragging ? 'dragging' : ''} ${isDraggable ? 'draggable' : ''}`}
      onClick={handlePlay}
      style={{ cursor: isDraggable ? 'grab' : 'pointer' }}
    >
      {isDraggable && <div className="drag-indicator">↔ Drag me</div>}
      
      <div className="album-art">
        {song.albumArt ? (
          <img src={song.albumArt} alt={song.title} />
        ) : (
          <div className="placeholder-art">
            <span>🎵</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'none' }}
              id={`album-upload-${song.id}`}
            />
            <label 
              htmlFor={`album-upload-${song.id}`}
              className="upload-label"
              onClick={(e) => e.stopPropagation()}
            >
              Upload Art
            </label>
          </div>
        )}
      </div>
      
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
        <div className="song-meta">
          <span className="song-category">{song.category}</span>
          <span className="song-duration">{song.duration}</span>
        </div>
        {song.audioUrl && (
          <small style={{opacity: 0.7, display: 'block', marginTop: '0.5rem'}}>
            {song.audioUrl.includes('youtube') ? 'YouTube' : 'Audio'} Link Available
          </small>
        )}
      </div>
      
      <button className="play-button" onClick={handlePlay}>
        ▶
      </button>
    </div>
  );
};

export default MusicCard;