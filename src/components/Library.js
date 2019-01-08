import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';

class Library extends Component {
  constructor(props) {
     super(props);
      this.state = { albums: albumData };
   }
   render() {
    return (
      <section className="library">
         {
           this.state.albums.map( (album, index) =>
      <Link to={`/album/${album.slug}`} key={index}>
          <div className="row">
            <div className="col-sm-6">
               <img src={album.albumCover} alt={album.title} />
               </div>
                  <div className="col-sm-6">
            <div className="centered">
            <div className="card">
               <div>{album.title}</div>
               <div>{album.artist}</div>
               <div>{album.songs.length} songs</div>
               </div>
            </div>
          </div>
          </div>


          </Link>
        )
      }
      </section>
     );
   }
 }

export default Library;
