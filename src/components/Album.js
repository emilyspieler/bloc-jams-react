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
      currentVolume: .5,
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
   if(song === this.state.currentSong && this.state.isPlaying === true && this.state.isHovering === true)
   { return <span className="icon ion-md-pause"></span>
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

      formatTime(currentTime) {

      var s = Math.floor(currentTime%60);
      var m = Math.floor((currentTime*1000/(1000*60))%60);
      var strFormat = "M:SS";

      if(s < 10) s = "0" + s;

      strFormat = strFormat.replace(/M/, m);
      strFormat = strFormat.replace(/SS/, s);

      return strFormat;
       }

       formatDuration(currentTime) {

       var s = Math.floor(currentTime%60);
       var m = Math.floor((currentTime*1000/(1000*60))%60);
       var strFormat = "M:SS";

       if(s < 10) s = "0" + s;

       strFormat = strFormat.replace(/M/, m);
       strFormat = strFormat.replace(/SS/, s);

       return strFormat;
        }

  handleVolumeChange(e) {
  const newVolume = e.target.value;
  this.audioElement.volume = newVolume;
  this.setState({ currentVolume: newVolume });
}

    render() {
      return (
        <section className="album">
        <section id="album-info">
      <div className="row">
         <div className="col-md-6">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           </div>
          <div className="col-md-3">
           <div className="album-details">
           <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
           <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </div>

      <div className="col-md-3">
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
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
              )
            }
            </tbody>
         </table>

      </div>
    </div>
           </section>
           <hr></hr>
         <PlayerBar
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         currentTime={this.audioElement.currentTime}
         duration={this.audioElement.duration}
         currentVolume={this.state.currentVolume}
         fullVolume={this.audioElement.fullVolume}
         formatTime={() => this.formatTime(this.state.currentTime)}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
         handleTimeChange={(e) => this.handleTimeChange(e)}
         handleVolumeChange={(e) => this.handleVolumeChange(e)}
         formatDuration={() => this.formatDuration(this.state.duration)}
       />
       <hr></hr>
        </section>
      );
    }
  }


export default Album;
