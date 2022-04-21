import React from 'react';
import propTypes from 'prop-types';
import Input from '../components/Input';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../img/logo.svg';
import styles from '../styles/login.module.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  criaUsuario = async () => {
    // Cria usuário assim que é clicado em entrar
    this.setState(
      { loading: true },
      async () => {
        // Recebe função (MudaPara...) que identifica se usuário foi foi logado.
        // Recebe NomeLogin, var de estado do app que armazena input nome do login
        const { NomeLogin, MudaParaLogado } = this.props;
        // Chama função que cria usuário
        await createUser({ name: NomeLogin });
        this.setState({
          loading: false,
        });
        // Muda estado de logado de false para true
        MudaParaLogado();
      },
    );
  }

  renderLogin = () => {
    // recebe fun onInputChange que controla input do form
    // Recebe var statussButt... caso seja validado o input seu valor passa para true
    const { NomeLogin, onInputChange, statusButtonLogin } = this.props;
    return (
      <>
        <img src={ logo } alt="logo" />
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
      <div data-testid="page-login" className={ styles.container }>
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
