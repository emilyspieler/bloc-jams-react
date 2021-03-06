import React, { Component } from 'react';


 class PlayerBar extends Component {

   render() {
     return (
       <section className="player-bar">
       <section id="time-control">
       <div className="current-time"> {this.props.formatTime(this.props.currentTime)} / {this.props.formatDuration(this.props.duration)}</div>
         <input
           type="range"
           className="seek-bar"
           value={(this.props.currentTime / this.props.duration) || 0}
           max="1"
           min="0"
           step="0.01"
           onChange={this.props.handleTimeChange}
         />
       </section>
       <section id="buttons">
         <button type="button" className="btn btn-dark" id="previous" onClick={this.props.handlePrevClick}>
           <span className="icon ion-md-skip-backward"></span>
         </button>
         <button type="button" className="btn btn-dark" id="play-pause" onClick={this.props.handleSongClick}>
           <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
         </button>
         <button type="button" className="btn btn-dark" id="next" onClick={this.props.handleNextClick}>
           <span className="icon ion-md-skip-forward"></span>
         </button>
       </section>
       <section id="volume-control">
        <div className="icon ion-volume-low">
      Volume:  {this.props.currentVolume}
        </div>
         <input
            type="range"
            className="seek-bar"
            value={this.props.currentVolume}
            max="1"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <div className="icon ion-volume-high">
          </div>
       </section>
       </section>
     );
   }
 }

 export default PlayerBar;
