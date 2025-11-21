// components/ArtistSection.js
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
      <h2>Favorite Artists</h2>
      <div className="artists-grid">
        {Object.entries(artists).map(([artistName, artistSongs]) => (
          <div key={artistName} className="artist-card">
            <div className="artist-avatar">
              {artistName.charAt(0).toUpperCase()}
            </div>
            <h3>{artistName}</h3>
            <p>{artistSongs.length} songs</p>
            
            <div className="artist-songs">
              {artistSongs.slice(0, 3).map(song => (
                <MusicCard 
                  key={song.id} 
                  song={song} 
                  onPlay={onPlaySong}
                  compact={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSection;