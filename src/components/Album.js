import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

  class Album extends Component {
    constructor(props) {
     super(props);
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0,
      fullVolume: 1,
      isPlaying: false,
      isHovering: false,
      currentHoverSong: null
     };

   this.audioElement = document.createElement('audio');
   this.audioElement.src = album.songs[0].audioSrc;
   }

   componentDidMount() {
     this.eventListeners = {
          timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
          },
          durationchange: e => {
            this.setState({ duration: this.audioElement.duration });
          },
          volumeupdate: e => {
            this.setState({ currentVolume: this.audioElement.currentVolume });
        },
        volumefull: e => {
          this.setState({ fullVolume: this.audioElement.fullVolume });
      }
    };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
        this.audioElement.addEventListener('volumefull', this.eventListeners.volumefull);
}

componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
    this.audioElement.removeEventListener('volumefull', this.eventListeners.volumefull);
  }

  hoverSongNumber(song) {
    this.setState({ isHovering: true, currentHoveredSong: song });
  }

  leaveSongNumber() {
    this.setState({ isHovering: false });
  }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
      }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
      }

  setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
    this.pause();
    } else {
     if (!isSameSong) { this.setSong(song); }
    this.play();
    }
     }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex + 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
  }


displayIcons(song, index){
   if(song === this.state.currentSong && this.state.isPlaying === true && this.state.isHovering === true){       return <span className="icon ion-md-pause"></span>
     } else if (song === this.state.currentHoveredSong && this.state.isPlaying === false && this.state.isHovering === true){
     return <span className="icon ion-md-play"></span>
     } else {
    return index + 1
     }
     }

    handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

  formatTime(newTime, index) {
    if (newTime === 1) // this is not correct but just a placeholder. Fix when you have time to look at the function again.
    {return true }
    else {
      return "-:--"
    }
	}

  handleVolumeChange(e) {
    this.audioElement.currentVolume = e.target.value;
    this.setState({  currentVolume: e.target.value });
      console.log('Input Value: ' + e.target.value);
      console.log('Before: ' + this.state.currentVolume);
      console.log('After: ' + this.state.fullVolume);
   }

    render() {
      return (
        <section className="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
           <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
           <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
          </section>
           <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
             {this.state.album.songs.map( (song, index) =>
                <tr className='song' key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.hoverSongNumber(song)} onMouseLeave={() => this.leaveSongNumber()} >
                  <td>{this.displayIcons(song, index)}</td>
                  <td>{song.title} </td>
                  <td>{song.duration} </td>
                </tr>
              )
            }
            </tbody>
         </table>
         <PlayerBar
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         currentTime={this.audioElement.currentTime}
         duration={this.audioElement.duration}
         currentVolume={this.audioElement.currentVolume}
         fullVolume={this.audioElement.fullVolume}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
         handleTimeChange={(e) => this.handleTimeChange(e)}
         handleVolumeChange={(e) => this.handleVolumeChange(e)}
         formatTime={(newTime, index) => this.formatTime(newTime, index)}
       />
        </section>
      );
    }
  }


export default Album;
