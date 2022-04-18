import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/search';
import { getUser } from './services/userAPI';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NomeLogin: '',
      statusButtonLogin: true,
      logado: false,
      pessoaLogada: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validaLogin());
  }

  validaLogin = () => {
    const { NomeLogin } = this.state;
    const minLength = 2;
    this.setState({
      statusButtonLogin: NomeLogin.length < minLength,
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
              render={ () => (<Album
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
              />) }
            />
            <Route
              path="/search"
              render={ () => (<Search
                { ... this.state }
                fetchGetUser={ this.fetchGetUser }
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
