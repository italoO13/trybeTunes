import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/cardalbum.module.css';

class CardAlbum extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // Recebe do componente pai search um objeto com as informações do album
    const { artistName, collectionId,
      collectionName, artworkUrl100 } = this.props;
    return (
      <Link to={ `/album/${collectionId}` } className={ styles.link }>
        <div
          data-testid={ `link-to-album-${collectionId}` }
          className={ styles.container }
        >
          <div className={ styles.imgWrapper }>
            <img src={ artworkUrl100 } alt={ collectionName } />

          </div>
          <div className={ styles.texto }>
            <h3>{collectionName}</h3>
            <p>{artistName}</p>
          </div>

        </div>
      </Link>
    );
  }
}

CardAlbum.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,

};

export default CardAlbum;
