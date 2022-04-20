import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
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
    const { musicasFavoritas, music } = this.props;
    const { trackId: id } = music;
    this.setState({
      favorite: musicasFavoritas.some(({ trackId }) => id === trackId),
    });
  }

  onInputChange = ({ target }) => {
    const { checked } = target;
    if (checked) {
      this.AddFavorito();
    } else {
      this.RemoveDoFavorito();
    }
    this.setState({ favorite: checked });
  }

  AddFavorito = async () => {
    this.setState(
      { loading: true },
      async () => {
        // const { listaMusicasAlbum, trackId: id } = this.props;
        // const musica = listaMusicasAlbum.find(({ trackId }) => trackId === id);
        const { music } = this.props;
        await addSong(music);
        this.setState({
          loading: false,
        });
      },
    );
  }

  RemoveDoFavorito = async () => {
    const { fetchGetFavoSongs } = this.props;
    this.setState(
      { loading: true },
      async () => {
        // const { listaMusicasAlbum, trackId: id } = this.props;
        // const musica = listaMusicasAlbum.find(({ trackId }) => trackId === id);
        const { music } = this.props;
        await removeSong(music);
        await fetchGetFavoSongs();
        this.setState({
          loading: false,
        });
      },
    );
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
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
                id={ trackName }
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
  fetchGetFavoSongs: PropTypes.func.isRequired,
  musicasFavoritas: PropTypes.arrayOf.isRequired,
  music: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
