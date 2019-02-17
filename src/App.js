import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistTitle: 'New Playlist',
      playlistTracks: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changePlaylistTitle = this.changePlaylistTitle.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  } 

  searchSpotify(term){
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks})
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else{
      let tracks = this.state.playlistTracks
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(current => current.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  changePlaylistTitle(title){
    this.setState({ playlistTitle: title });
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
     Spotify.savePlaylist(this.state.playlistTitle, trackURIs).then(() => {
       this.setState({
         playlistTitle: 'New Playlist',
         playlistTracks: []
       });
     });
   }

  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistTitle={this.state.playlistTitle}
                      onTitleChange={this.changePlaylistTitle}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
