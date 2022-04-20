import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingLocal: false,
      musicasFavoritas: [],
    };
  }

  componentDidMount() {
    const { fetchGetUser } = this.props;
    fetchGetUser();
    this.fetchGetFavoSongs();
  }

  fetchGetFavoSongs = async () => {
    this.setState(
      { loadingLocal: true },
      async () => {
        const musicFav = await getFavoriteSongs();
        this.setState({
          musicasFavoritas: musicFav,
          loadingLocal: false, // Foi necessário criar o loading local pq ele evita que o compoenent musicCard seja executado sem antes atualizar musicasFavoritas
        });
      },
    );
  }

  renderSearch = () => {
    const { musicasFavoritas } = this.state;
    return (
      <>
        <Header { ...this.props } />
        Favorites
        <div className="MusicasFavoritas">
          {musicasFavoritas.map((musica, index) => (<MusicCard
            key={ index }
            music={ musica }
            { ...this.state }
            { ...this.props }
            fetchGetFavoSongs={ this.fetchGetFavoSongs }
          />))}

        </div>
      </>
    );
  }

  render() {
    const { loading } = this.props;
    const { loadingLocal } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading || loadingLocal
          ? <Loading />
          : this.renderSearch()}
      </div>
    );
  }
}

Favorites.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
};

export default Favorites;
