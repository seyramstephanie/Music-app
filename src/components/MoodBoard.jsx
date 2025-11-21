// components/MoodBoard.js
import React, { useState } from 'react';
import MusicCard from './MusicCard';

const MoodBoard = ({ moodBoards, songs, onAddMoodBoard, onPlaySong }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMoodBoard, setNewMoodBoard] = useState({
    name: '',
    description: '',
    color: '#4A5568'
  });

  const handleCreateMoodBoard = (e) => {
    e.preventDefault();
    if (newMoodBoard.name.trim()) {
      onAddMoodBoard(newMoodBoard);
      setNewMoodBoard({ name: '', description: '', color: '#4A5568' });
      setShowCreateForm(false);
    }
  };

  const getMoodBoardSongs = (moodBoard) => {
    return moodBoard.songs.map(songId => songs.find(song => song.id === songId));
  };

  return (
    <div className="mood-board">
      <div className="mood-header">
        <h2>Mood Boards</h2>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          + Create Mood Board
        </button>
      </div>

      {showCreateForm && (
        <form className="create-mood-form" onSubmit={handleCreateMoodBoard}>
          <input
            type="text"
            placeholder="Mood Name (e.g., Rainy Night)"
            value={newMoodBoard.name}
            onChange={(e) => setNewMoodBoard(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description"
            value={newMoodBoard.description}
            onChange={(e) => setNewMoodBoard(prev => ({ ...prev, description: e.target.value }))}
          />
          <input
            type="color"
            value={newMoodBoard.color}
            onChange={(e) => setNewMoodBoard(prev => ({ ...prev, color: e.target.value }))}
          />
          <button type="submit">Create</button>
        </form>
      )}

      <div className="mood-boards-grid">
        {moodBoards.map(moodBoard => (
          <div 
            key={moodBoard.id} 
            className="mood-board-item"
            style={{ backgroundColor: moodBoard.color }}
          >
            <div className="mood-board-header">
              <h3>{moodBoard.name}</h3>
              <p>{moodBoard.description}</p>
            </div>
            
            <div className="mood-songs">
              {getMoodBoardSongs(moodBoard).map(song => 
                song && (
                  <div key={song.id} className="mood-song-item">
                    <MusicCard song={song} onPlay={onPlaySong} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoard;