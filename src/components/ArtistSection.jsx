// src/components/ArtistSection.jsx
import React from 'react';
import MusicCard from './MusicCard';

const ArtistSection = ({ songs, onPlaySong }) => {
  const getArtists = () => {
    const artists = {};
    songs.forEach(song => {
      if (!artists[song.artist]) {
        artists[song.artist] = [];
      }
      artists[song.artist].push(song);
    });
    return artists;
  };

  const artists = getArtists();

  return (
    <div className="artist-section">
      <div className="artist-header">
        <h2>Favorite Artists</h2>
        <p>Browse your music by artist</p>
      </div>

      <div className="artists-grid">
        {Object.entries(artists).map(([artistName, artistSongs]) => (
          <div key={artistName} className="artist-card">
            <div className="artist-avatar">
              {artistName.charAt(0).toUpperCase()}
            </div>
            <h3>{artistName}</h3>
            <p className="artist-song-count">{artistSongs.length} {artistSongs.length === 1 ? 'song' : 'songs'}</p>
            
            <div className="artist-songs">
              <h4>Popular Tracks:</h4>
              {artistSongs.slice(0, 3).map(song => (
                <div key={song.id} className="artist-song-item">
                  <MusicCard 
                    song={song} 
                    onPlay={onPlaySong}
                  />
                </div>
              ))}
              {artistSongs.length > 3 && (
                <p className="more-songs">+ {artistSongs.length - 3} more songs</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(artists).length === 0 && (
        <div className="empty-state">
          <p>No artists found. Add some songs to see your artists!</p>
        </div>
      )}
    </div>
  );
};

export default ArtistSection;