// components/MusicCard.js
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const MusicCard = ({ song, onPlay, isDraggable = false }) => {
  const audioRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'song',
    item: { id: song.id },
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
        // In a real app, you'd update the song's albumArt
        console.log('Uploaded image:', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      ref={isDraggable ? drag : null}
      className={`music-card ${isDragging ? 'dragging' : ''}`}
      onClick={handlePlay}
    >
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
        <span className="song-category">{song.category}</span>
        <span className="song-duration">{song.duration}</span>
      </div>
      
      <button className="play-button" onClick={handlePlay}>
        ▶
      </button>
    </div>
  );
};

export default MusicCard;