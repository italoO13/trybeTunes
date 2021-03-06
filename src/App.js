import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/search';
import { getUser, updateUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import getMusics from './services/musicsAPI';
import { getFavoriteSongs } from './services/favoriteSongsAPI';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NomeLogin: '',
      statusButtonLogin: true,
      statusButtonSearch: true,
      logado: false,
      pessoaLogada: '',
      loading: false,
      nomeArtista: '',
      albunsArtista: [],
      pesquisafeita: false,
      auxNomeArtista: '',
      listaMusicasAlbum: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validaLogin();
    });
  }

  validaLogin = () => {
    const { NomeLogin, nomeArtista } = this.state;
    const minLengthLogin = 3;
    const minLengthSearch = 2;
    this.setState({
      statusButtonLogin: NomeLogin.length < minLengthLogin,
      statusButtonSearch: nomeArtista.length < minLengthSearch,
    });
  }

  RenderLogin = () => (
    <Login
      { ...this.state }
      onInputChange={ this.onInputChange }
      MudaParaLogado={ this.logado }
    />
  )

  logado = () => {
    this.setState({
      logado: true,
    });
  }

  fetchGetUser = async () => {
    this.setState(
      { loading: true },
      async () => {
        const pessoaLogada = await getUser();
        this.setState({
          loading: false,
          pessoaLogada,
        });
      },
    );
  }

  fetchUpdateUser = async (perfilEditado) => {
    this.setState(
      { loading: true },
      async () => {
        await updateUser(perfilEditado);
        this.setState({
          loading: false,
        });
      },
    );
  }

  fetchSearchAlbum = async () => {
    this.setState(
      { loading: true },
      async () => {
        const { nomeArtista } = this.state;
        const albunsArtista = await searchAlbumsAPI(nomeArtista);
        this.setState({
          loading: false,
          albunsArtista,
          pesquisafeita: true,
          auxNomeArtista: nomeArtista,
        }, this.setState({ nomeArtista: '' }));
      },
    );
  }

  fetchMusicApi = async (id) => {
    this.setState(
      { loading: true },
      async () => {
        const musicas = await getMusics(id);
        this.setState({
          loading: false,
          listaMusicasAlbum: musicas,
        });
      },

    );
  }

  // fetchGetAddSong = async (Id) => {
  //   this.setState(
  //     { loading: true },
  //     async () => {
  //       const { listaMusicasAlbum } = this.state;
  //       const musica = listaMusicasAlbum.find(({ trackId }) => trackId === Id);
  //       await addSong(musica);
  //       this.setState({
  //         loading: false,
  //       });
  //     },
  //   );
  // }

  fetchGetFavoSongs = async () => {
    this.setState(
      { loading: true },
      async () => {
        const musicFav = await getFavoriteSongs();
        console.log(musicFav);
        this.setState({
          loading: false,
          musicasFavoritas: musicFav,
        });
      },
    );
  }

  render() {
    const { logado } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/profile/edit"
              render={ () => (<ProfileEdit
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
                fetchUpdateUser={ this.fetchUpdateUser }
              />) }
            />
            <Route
              path="/profile"
              render={ () => (<Profile
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
              />) }
            />
            <Route
              path="/favorites"
              render={ () => (<Favorites
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
              />

              ) }
            />
            <Route
              path="/album/:id"
              render={ (props) => (<Album
                { ... this.state }
                { ...props }
                fetchGetUser={ this.fetchGetUser }
                fetchMusicApi={ this.fetchMusicApi }
                fetchGetFavoSongs={ this.fetchGetFavoSongs }
              />) }
            />
            <Route
              path="/search"
              render={ () => (<Search
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
                onInputChange={ this.onInputChange }
                fetchSearchAlbum={ this.fetchSearchAlbum }
              />

              ) }
            />
            <Route
              path="/"
              exact
              render={ logado ? () => <Redirect to="/search" /> : this.RenderLogin }
            />
            <Route path="/:qualquerRota" component={ NotFound } />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
