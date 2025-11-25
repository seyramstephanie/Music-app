// src/components/DraggableSong.jsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableSong = ({ song, index, onPlay, onMoveSong, playlistId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'playlist-song',
    item: { index, playlistId, id: song.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index, playlistId, song.id]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'playlist-song',
    hover: (draggedItem) => {
      if (draggedItem.index !== index && draggedItem.playlistId === playlistId) {
        onMoveSong(playlistId, draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [index, playlistId, onMoveSong]);

  const dragDropRef = (node) => {
    drag(node);
    drop(node);
  };

  return (
    <div 
      ref={dragDropRef}
      className={`playlist-song-item ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
      onClick={() => onPlay(song)}
    >
      <div className="drag-handle" title="Drag to reorder">⠿</div>
      <span className="song-number">{index + 1}</span>
      <div className="song-info-compact">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      <span className="song-duration">{song.duration}</span>
      <button 
        className="play-button-small" 
        onClick={(e) => {
          e.stopPropagation();
          onPlay(song);
        }}
        title="Play song"
      >
        ▶
      </button>
    </div>
  );
};

export default DraggableSong;