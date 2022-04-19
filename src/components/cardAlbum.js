import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { artistName, collectionId,
      collectionName, artworkUrl100 } = this.props;
    return (
      <Link to={ `/album/${collectionId}` }>
        <div data-testid={ `link-to-album-${collectionId}` }>
          <div className="img-wrapper">
            <img src={ artworkUrl100 } alt={ collectionName } />

          </div>
          <h3>{collectionName}</h3>
          <p>{artistName}</p>

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
