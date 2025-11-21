// components/MusicFeed.js
import React, { useState } from 'react';
import MusicCard from './MusicCard';

const MusicFeed = ({ songs, onPlaySong, onAddSong }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    audioUrl: '',
    category: 'Chill',
    duration: ''
  });

  const categories = ['Chill', 'Study', 'Happy', 'Workout', 'Party', 'Sleep'];

  const handleAddSong = (e) => {
    e.preventDefault();
    if (newSong.title && newSong.artist) {
      onAddSong(newSong);
      setNewSong({
        title: '',
        artist: '',
        audioUrl: '',
        category: 'Chill',
        duration: ''
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
          + Add Song
        </button>
      </div>

      {showAddForm && (
        <form className="add-song-form" onSubmit={handleAddSong}>
          <h3>Add New Song</h3>
          <input
            type="text"
            placeholder="Song Title"
            value={newSong.title}
            onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Artist"
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
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div className="image-upload">
            <label>Album Art:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'albumArt')}
            />
          </div>

          <button type="submit">Add Song</button>
        </form>
      )}

      <div className="categories">
        {categories.map(category => (
          <button key={category} className="category-tag">
            {category}
          </button>
        ))}
      </div>

      <div className="songs-grid">
        {songs.map(song => (
          <MusicCard 
            key={song.id} 
            song={song} 
            onPlay={onPlaySong}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicFeed;