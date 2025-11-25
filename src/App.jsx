// src/App.js
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import PlaylistCreator from './components/PlaylistCreator';
import MusicFeed from './components/MusicFeed';
import MoodBoard from './components/MoodBoard';
import ArtistSection from './components/ArtistSection';
import AudioPlayer from './components/AudioPlayer';

const initialSongs = [
  {
    id: 1,
    title: "The Gambler",
    artist: "Busy Signal",
    category: "Chill",
    duration: "3:20",
    audioUrl: "https://www.youtube.com/watch?v=example1",
    albumArt: ""
  },
  {
    id: 2,
    title: "Wine & Jiggle",
    artist: "I-Octane",
    category: "Happy",
    duration: "3:23",
    audioUrl: "https://www.youtube.com/watch?v=example2",
    albumArt: ""
  },
  {
    id: 3,
    title: "Jamaica Love",
    artist: "Busy Signal",
    category: "Chill",
    duration: "4:38",
    audioUrl: "https://www.youtube.com/watch?v=example3",
    albumArt: ""
  },
  {
    id: 4,
    title: "Bring Life",
    artist: "Kalado",
    category: "Happy",
    duration: "4:00",
    audioUrl: "https://www.youtube.com/watch?v=example4",
    albumArt: ""
  },
  {
    id: 5,
    title: "Gyal You A Party Animal",
    artist: "Charly Black",
    category: "Workout",
    duration: "2:38",
    audioUrl: "https://www.youtube.com/watch?v=example5",
    albumArt: ""
  },
  {
    id: 6,
    title: "Nice Suh",
    artist: "Vybz Kartel",
    category: "Happy",
    duration: "1:38",
    audioUrl: "https://www.youtube.com/watch?v=example6",
    albumArt: ""
  },
  {
    id: 7,
    title: "Clarks",
    artist: "Vybz Kartel, Popcaan, Gaza Slim",
    category: "Party",
    duration: "2:15",
    audioUrl: "https://www.youtube.com/watch?v=example7",
    albumArt: ""
  },
  {
    id: 8,
    title: "Firm and Strong",
    artist: "Popcaan",
    category: "Chill",
    duration: "2:45",
    audioUrl: "https://www.youtube.com/watch?v=example8",
    albumArt: ""
  },
  {
    id: 9,
    title: "Crazy World",
    artist: "Lucky Dube",
    category: "Chill",
    duration: "2:10",
    audioUrl: "https://www.youtube.com/watch?v=example9",
    albumArt: ""
  }
];

const initialPlaylists = [
  {
    id: 1,
    name: "Chill Vibes",
    cover: "",
    songs: [1, 3, 8],
    category: "Chill"
  },
  {
    id: 2,
    name: "Party Mix",
    cover: "",
    songs: [5, 7],
    category: "Party"
  }
];

const initialMoodBoards = [
  {
    id: 1,
    name: "Rainy Night",
    description: "Perfect for cozy rainy evenings",
    songs: [1, 3, 6],
    color: "#2D3748"
  },
  {
    id: 2,
    name: "Workout",
    description: "High energy for your exercise routine",
    songs: [2, 7, 5],
    color: "#E53E3E"
  }
];

function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [moodBoards, setMoodBoards] = useState(initialMoodBoards);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [searchTerm, setSearchTerm] = useState('');

  const addSong = useCallback((newSong) => {
    setSongs(prev => [...prev, { ...newSong, id: Date.now() }]);
  }, []);

  const addPlaylist = useCallback((newPlaylist) => {
    setPlaylists(prev => [...prev, { ...newPlaylist, id: Date.now(), songs: [] }]);
  }, []);

  const addMoodBoard = useCallback((newMoodBoard) => {
    setMoodBoards(prev => [...prev, { ...newMoodBoard, id: Date.now(), songs: [] }]);
  }, []);

  const moveSongInPlaylist = useCallback((playlistId, dragIndex, hoverIndex) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const newSongs = [...playlist.songs];
        const [removed] = newSongs.splice(dragIndex, 1);
        newSongs.splice(hoverIndex, 0, removed);
        return { ...playlist, songs: newSongs };
      }
      return playlist;
    }));
  }, []);

  const addSongToPlaylist = useCallback((playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId && !playlist.songs.includes(songId)
        ? { ...playlist, songs: [...playlist.songs, songId] }
        : playlist
    ));
  }, []);

  const addSongToMoodBoard = useCallback((moodBoardId, songId) => {
    setMoodBoards(prev => prev.map(moodBoard => 
      moodBoard.id === moodBoardId && !moodBoard.songs.includes(songId)
        ? { ...moodBoard, songs: [...moodBoard.songs, songId] }
        : moodBoard
    ));
  }, []);

  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const shufflePlaylist = useCallback((playlist) => {
    const playlistSongs = songs.filter(song => playlist.songs.includes(song.id));
    if (playlistSongs.length > 0) {
      const randomSong = playlistSongs[Math.floor(Math.random() * playlistSongs.length)];
      playSong(randomSong);
    }
  }, [songs, playSong]);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <nav className="sidebar">
          <div className="logo">🎵 Carribbean Vibes</div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
          </div>
          
          <ul className="nav-links">
            <li className={activeTab === 'feed' ? 'active' : ''} onClick={() => setActiveTab('feed')}>
              🏠 Music Feed
            </li>
            <li className={activeTab === 'playlists' ? 'active' : ''} onClick={() => setActiveTab('playlists')}>
              📁 Playlists
            </li>
            <li className={activeTab === 'mood' ? 'active' : ''} onClick={() => setActiveTab('mood')}>
              🌟 Mood Boards
            </li>
            <li className={activeTab === 'artists' ? 'active' : ''} onClick={() => setActiveTab('artists')}>
              👨‍🎤 Artists
            </li>
          </ul>
        </nav>

        <main className="main-content">
          {activeTab === 'feed' && (
            <MusicFeed 
              songs={searchTerm ? filteredSongs : songs}
              onPlaySong={playSong}
              onAddSong={addSong}
            />
          )}
          
          {activeTab === 'playlists' && (
            <PlaylistCreator
              playlists={playlists}
              songs={songs}
              onAddPlaylist={addPlaylist}
              onMoveSong={moveSongInPlaylist}
              onAddSongToPlaylist={addSongToPlaylist}
              onShufflePlaylist={shufflePlaylist}
              onPlaySong={playSong}
            />
          )}
          
          {activeTab === 'mood' && (
            <MoodBoard
              moodBoards={moodBoards}
              songs={songs}
              onAddMoodBoard={addMoodBoard}
              onAddSongToMoodBoard={addSongToMoodBoard}
              onPlaySong={playSong}
            />
          )}
          
          {activeTab === 'artists' && (
            <ArtistSection songs={songs} onPlaySong={playSong} />
          )}
        </main>

        <AudioPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={setIsPlaying}
        />
      </div>
    </DndProvider>
  );
}

export default App;