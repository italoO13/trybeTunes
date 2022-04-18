import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NomeLogin: '',
      statusButtonLogin: true,
      logado: false,
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

  render() {
    const { logado } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/album/:id" render={ () => <Album /> } />
            <Route path="/search" component={ Search } />
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
