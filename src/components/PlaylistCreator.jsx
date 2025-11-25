// src/components/PlaylistCreator.jsx
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableSong from './DraggableSong';

const PlaylistCreator = ({ 
  playlists, 
  songs, 
  onAddPlaylist, 
  onMoveSong, 
  onAddSongToPlaylist,
  onShufflePlaylist,
  onPlaySong 
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [dragFeedback, setDragFeedback] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistCover, setNewPlaylistCover] = useState('');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'song',
    drop: (item) => {
      if (selectedPlaylist && !selectedPlaylist.songs.includes(item.id)) {
        onAddSongToPlaylist(selectedPlaylist.id, item.id);
        const addedSong = songs.find(s => s.id === item.id);
        setDragFeedback(`Added "${addedSong?.title}" to ${selectedPlaylist.name}!`);
        setTimeout(() => setDragFeedback(''), 2000);
      }
    },
    hover: () => {
      if (selectedPlaylist) {
        setDragFeedback('Drop here to add to playlist!');
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [selectedPlaylist, songs, onAddSongToPlaylist]);

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      onAddPlaylist({
        name: newPlaylistName,
        cover: newPlaylistCover,
        songs: [],
        category: 'Custom'
      });
      setNewPlaylistName('');
      setNewPlaylistCover('');
      setShowCreateForm(false);
    }
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPlaylistCover(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlaylistSongs = (playlist) => {
    return playlist.songs.map(songId => songs.find(song => song.id === songId)).filter(Boolean);
  };

  return (
    <div className="playlist-creator">
      <div className="playlist-header">
        <h2>Your Playlists</h2>
        <div className="create-playlist">
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="add-song-btn">
            {showCreateForm ? 'Cancel' : '+ Create Playlist'}
          </button>
        </div>
      </div>

      {showCreateForm && (
        <form className="add-song-form" onSubmit={handleCreatePlaylist}>
          <h3>Create New Playlist</h3>
          <input
            type="text"
            placeholder="Playlist Name *"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            required
          />
          
          <div className="image-upload">
            <label>Playlist Cover Image (Optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
            />
            {newPlaylistCover && (
              <div className="cover-preview">
                <img src={newPlaylistCover} alt="Cover preview" />
              </div>
            )}
          </div>

          <button type="submit">Create Playlist</button>
        </form>
      )}

      <div className="playlists-grid">
        {playlists.map(playlist => (
          <div 
            key={playlist.id} 
            className={`playlist-item ${selectedPlaylist?.id === playlist.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedPlaylist(playlist);
              setDragFeedback('');
            }}
          >
            <div className="playlist-cover">
              {playlist.cover ? (
                <img src={playlist.cover} alt={playlist.name} />
              ) : (
                <div className="playlist-cover-placeholder">
                  🎵
                </div>
              )}
            </div>
            <h3>{playlist.name}</h3>
            <p>{playlist.songs.length} songs</p>
            <button 
              className="shuffle-btn"
              onClick={(e) => {
                e.stopPropagation();
                onShufflePlaylist(playlist);
              }}
              disabled={playlist.songs.length === 0}
            >
              🔀 Shuffle
            </button>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div 
          ref={drop}
          className={`playlist-songs ${isOver ? 'drag-over' : ''}`}
        >
          <div className="playlist-info">
            <h3>{selectedPlaylist.name}</h3>
            <p>{getPlaylistSongs(selectedPlaylist).length} songs</p>
          </div>
          
          {dragFeedback && (
            <div className="drag-feedback">{dragFeedback}</div>
          )}
          
          <p className="drag-hint">
            💡 Go to Music Feed tab and drag songs into this area
          </p>
          
          <div className="songs-list">
            {getPlaylistSongs(selectedPlaylist).map((song, index) => (
              <DraggableSong
                key={song.id}
                song={song}
                index={index}
                onPlay={onPlaySong}
                onMoveSong={onMoveSong}
                playlistId={selectedPlaylist.id}
              />
            ))}
            {getPlaylistSongs(selectedPlaylist).length === 0 && (
              <div className="empty-playlist">
                <p>No songs in this playlist yet</p>
                <p>Drag songs from the Music Feed tab into this area</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCreator;