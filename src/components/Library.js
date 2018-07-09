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
      <section className='library'>
      {
        this.state.albums.map( (album, index) =>
          <Link to={`/album/${album.slug}`} key={index}>
            {album.title}
          </Link>
        )
      }
      </section>
     );
   }
 }

export default Library;
