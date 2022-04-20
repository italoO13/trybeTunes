import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { musicasFavoritas, trackId: id } = this.props;
    console.log(musicasFavoritas);
    console.log(musicasFavoritas.some(({ trackId }) => id === trackId));
    this.setState({
      favorite: musicasFavoritas.some(({ trackId }) => id === trackId),
    });
  }

  onInputChange = ({ target }) => {
    const { checked } = target;
    if (checked) {
      this.AddFavorito();
    }
    this.setState({ favorite: checked });
  }

  AddFavorito = async () => {
    this.setState(
      { loading: true },
      async () => {
        const { listaMusicasAlbum, trackId: id } = this.props;
        const musica = listaMusicasAlbum.find(({ trackId }) => trackId === id);
        await addSong(musica);
        this.setState({
          loading: false,
        });
      },
    );
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <>

            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ trackName }>
              Favorita
              <input
                name={ trackId }
                type="checkbox"
                onChange={ this.onInputChange }
                checked={ favorite }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  listaMusicasAlbum: PropTypes.arrayOf.isRequired,
  musicasFavoritas: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
