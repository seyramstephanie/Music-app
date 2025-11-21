// components/PlaylistCreator.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import MusicCard from './MusicCard';

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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'song',
    drop: (item) => {
      if (selectedPlaylist) {
        onAddSongToPlaylist(selectedPlaylist.id, item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onAddPlaylist({
        name: newPlaylistName,
        cover: '',
        songs: [],
        category: 'Custom'
      });
      setNewPlaylistName('');
    }
  };

  const getPlaylistSongs = (playlist) => {
    return playlist.songs.map(songId => songs.find(song => song.id === songId));
  };

  return (
    <div className="playlist-creator">
      <div className="playlist-header">
        <h2>Your Playlists</h2>
        <div className="create-playlist">
          <input
            type="text"
            placeholder="New playlist name..."
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button onClick={handleCreatePlaylist}>Create</button>
        </div>
      </div>

      <div className="playlists-grid">
        {playlists.map(playlist => (
          <div 
            key={playlist.id} 
            className={`playlist-item ${selectedPlaylist?.id === playlist.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlaylist(playlist)}
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
          <h3>{selectedPlaylist.name} - Songs</h3>
          <div className="songs-list">
            {getPlaylistSongs(selectedPlaylist).map((song, index) => (
              song && (
                <div key={song.id} className="playlist-song-item">
                  <span className="song-number">{index + 1}</span>
                  <MusicCard 
                    song={song} 
                    onPlay={onPlaySong}
                    isDraggable={true}
                  />
                </div>
              )
            ))}
            {getPlaylistSongs(selectedPlaylist).length === 0 && (
              <p className="empty-playlist">Drag songs here to add to playlist</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCreator;