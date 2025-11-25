// src/components/MoodBoard.jsx
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import MusicCard from './MusicCard';

const MoodBoard = ({ moodBoards, songs, onAddMoodBoard, onAddSongToMoodBoard, onPlaySong }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedMoodBoard, setSelectedMoodBoard] = useState(null);
  const [newMoodBoard, setNewMoodBoard] = useState({
    name: '',
    description: '',
    color: '#4A5568'
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'song',
    drop: (item) => {
      if (selectedMoodBoard && !selectedMoodBoard.songs.includes(item.id)) {
        onAddSongToMoodBoard(selectedMoodBoard.id, item.id);
        const addedSong = songs.find(s => s.id === item.id);
        console.log(`Added "${addedSong?.title}" to ${selectedMoodBoard.name} mood board`);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [selectedMoodBoard, songs, onAddSongToMoodBoard]);

  const handleCreateMoodBoard = (e) => {
    e.preventDefault();
    if (newMoodBoard.name.trim()) {
      onAddMoodBoard(newMoodBoard);
      setNewMoodBoard({ name: '', description: '', color: '#4A5568' });
      setShowCreateForm(false);
    }
  };

  const getMoodBoardSongs = (moodBoard) => {
    return moodBoard.songs.map(songId => songs.find(song => song.id === songId)).filter(Boolean);
  };

  return (
    <div className="mood-board">
      <div className="mood-header">
        <h2>Mood Boards</h2>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="add-song-btn">
          {showCreateForm ? 'Cancel' : '+ Create Mood Board'}
        </button>
      </div>

      {showCreateForm && (
        <form className="create-mood-form" onSubmit={handleCreateMoodBoard}>
          <h3>Create New Mood Board</h3>
          <input
            type="text"
            placeholder="Mood Name (e.g., Rainy Night) *"
            value={newMoodBoard.name}
            onChange={(e) => setNewMoodBoard(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description"
            value={newMoodBoard.description}
            onChange={(e) => setNewMoodBoard(prev => ({ ...prev, description: e.target.value }))}
            rows="3"
          />
          <div className="color-picker">
            <label>Theme Color:</label>
            <input
              type="color"
              value={newMoodBoard.color}
              onChange={(e) => setNewMoodBoard(prev => ({ ...prev, color: e.target.value }))}
            />
          </div>
          <button type="submit">Create Mood Board</button>
        </form>
      )}

      <div className="mood-boards-grid">
        {moodBoards.map(moodBoard => (
          <div 
            key={moodBoard.id} 
            className="mood-board-item"
            style={{ backgroundColor: moodBoard.color }}
            onClick={() => setSelectedMoodBoard(moodBoard)}
          >
            <div className="mood-board-header">
              <h3>{moodBoard.name}</h3>
              <p>{moodBoard.description}</p>
              <small>{getMoodBoardSongs(moodBoard).length} songs</small>
            </div>
            
            <div 
              ref={selectedMoodBoard?.id === moodBoard.id ? drop : null}
              className={`mood-songs ${selectedMoodBoard?.id === moodBoard.id && isOver ? 'drag-over' : ''}`}
            >
              {getMoodBoardSongs(moodBoard).map(song => 
                song && (
                  <div key={song.id} className="mood-song-item">
                    <MusicCard song={song} onPlay={onPlaySong} />
                  </div>
                )
              )}
              {getMoodBoardSongs(moodBoard).length === 0 && (
                <p style={{textAlign: 'center', opacity: 0.7, padding: '1rem', fontStyle: 'italic'}}>
                  {selectedMoodBoard?.id === moodBoard.id 
                    ? 'Drag songs here from Music Feed' 
                    : 'No songs yet - click and drag songs here'
                  }
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoard;