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
            <div className="point">
               <div><h1>{album.title}</h1></div>
               <div><h2>{album.artist}</h2></div>
               <div><h2>{album.songs.length} songs</h2></div>
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
