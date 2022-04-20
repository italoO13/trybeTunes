import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchGetUser, fetchMusicApi } = this.props;
    const { match } = this.props;
    const { id } = match.params;
    fetchGetUser();
    fetchMusicApi(id);
  }

  renderSearch = () => {
    const { listaMusicasAlbum } = this.props;

    if (listaMusicasAlbum.length !== 0) {
      const { artistName, collectionName, artworkUrl100 } = listaMusicasAlbum[0];
      return (
        <>
          <Header { ...this.props } />
          Album
          <h3 data-testid="artist-name">{artistName}</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p data-testid="album-name">{ collectionName }</p>

          <div className="ListaMusicas">
            {listaMusicasAlbum.map((musica, index) => {
              if (index !== 0) {
                return (
                  <MusicCard { ...musica } { ...this.props } key={ index } />
                );
              }
              return null;
            })}

          </div>

        </>
      );
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-album">
        {loading
          ? <Loading />
          : this.renderSearch()}
      </div>
    );
  }
}

Album.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
  fetchMusicApi: PropTypes.func.isRequired,
  match: PropTypes.arrayOf.isRequired,
  listaMusicasAlbum: PropTypes.objectOf.isRequired,

};

export default Album;
