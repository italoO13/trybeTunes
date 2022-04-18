import React from 'react';
import propTypes from 'prop-types';
import Input from '../components/Input';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  criaUsuario = async () => {
    this.setState(
      { loading: true },
      async () => {
        const { NomeLogin, MudaParaLogado } = this.props;
        await createUser({ name: NomeLogin });
        this.setState({
          loading: false,
        });
        MudaParaLogado();
      },
    );
  }

  renderLogin = () => {
    const { NomeLogin, onInputChange, statusButtonLogin } = this.props;
    return (
      <>
        <h2>Login</h2>
        <form>
          <Input
            name="NomeLogin"
            testid="login-name-input"
            type="text"
            placeholder="nome"
            value={ NomeLogin }
            onInputChange={ onInputChange }
          />
          <button
            disabled={ statusButtonLogin }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.criaUsuario }
          >
            Entrar

          </button>
        </form>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <Loading />
            : this.renderLogin()
        }
      </div>
    );
  }
}

Login.propTypes = {
  NomeLogin: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  statusButtonLogin: propTypes.bool.isRequired,
  MudaParaLogado: propTypes.func.isRequired,
};
export default Login;
