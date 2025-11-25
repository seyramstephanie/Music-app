// src/components/MusicFeed.jsx
import React, { useState } from 'react';
import MusicCard from './MusicCard';

const MusicFeed = ({ songs, onPlaySong, onAddSong }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    audioUrl: '',
    category: 'Chill',
    duration: '',
    albumArt: ''
  });

  const categories = ['All', 'Chill', 'Study', 'Happy', 'Workout', 'Party', 'Sleep'];

  const filteredSongs = selectedCategory === 'All' 
    ? songs 
    : songs.filter(song => song.category === selectedCategory);

  const handleAddSong = (e) => {
    e.preventDefault();
    if (newSong.title && newSong.artist) {
      onAddSong(newSong);
      setNewSong({
        title: '',
        artist: '',
        audioUrl: '',
        category: 'Chill',
        duration: '',
        albumArt: ''
      });
      setShowAddForm(false);
    }
  };

  const handleImageUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSong(prev => ({ ...prev, [field]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="music-feed">
      <div className="feed-header">
        <h1>Your Music Feed</h1>
        <button 
          className="add-song-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Song'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-song-form" onSubmit={handleAddSong}>
          <h3>Add New Song</h3>
          <input
            type="text"
            placeholder="Song Title *"
            value={newSong.title}
            onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Artist *"
            value={newSong.artist}
            onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Audio URL or YouTube Link"
            value={newSong.audioUrl}
            onChange={(e) => setNewSong(prev => ({ ...prev, audioUrl: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Duration (e.g., 3:45)"
            value={newSong.duration}
            onChange={(e) => setNewSong(prev => ({ ...prev, duration: e.target.value }))}
          />
          <select
            value={newSong.category}
            onChange={(e) => setNewSong(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.filter(cat => cat !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div className="image-upload">
            <label>Album Art (Optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'albumArt')}
            />
            {newSong.albumArt && (
              <div className="cover-preview">
                <img src={newSong.albumArt} alt="Preview" style={{width: '80px', height: '80px'}} />
              </div>
            )}
          </div>

          <button type="submit">Add Song</button>
        </form>
      )}

      <div className="categories">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="songs-grid">
        {filteredSongs.length > 0 ? (
          filteredSongs.map(song => (
            <MusicCard 
              key={song.id} 
              song={song} 
              onPlay={onPlaySong}
              isDraggable={true}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No songs found. Add some songs to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicFeed;