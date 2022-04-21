import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      disable: true,
      loadingLocal: false,
      atualizado: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loadingLocal: true },
      async () => {
        const pessoaLogada = await getUser();
        const { name, email, description, image } = pessoaLogada;
        this.setState({
          loadingLocal: false,
          name,
          email,
          description,
          image,

        }, () => this.validacao());
      },
    );
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validacao());
  };

  validacao = () => {
    const { name, email, description, image } = this.state;
    if (name.length !== 0 && email.length !== 0
      && description.length !== 0
      && image.length !== 0 && email.includes('@')) {
      this.setState({
        disable: false,
      });
    }
  }

  updateUser = async () => {
    this.setState(
      { loadingLocal: true },
      async () => {
        const { name, email, description, image } = this.state;
        const usuario = {
          name,
          email,
          image,
          description,
        };
        await updateUser(usuario);
        this.setState(
          { loadingLocal: false,
            atualizado: true },
        );
      },
    );
  }

  //   const { fetchUpdateUser } = this.props;
  //   const { name, email, description, image } = this.state;
  //   const usuario = {
  //     name,
  //     email,
  //     image,
  //     description,
  //   };
  //   fetchUpdateUser(usuario);
  // }

  renderProfileEdit = () => {
    const { name, email, description, image, disable } = this.state;

    return (
      <>
        <Header { ...this.props } />
        ProfileEdit
        <form>
          <label htmlFor="image">
            <img src={ image } alt="imagem-perfil" />
            <input
              name="image"
              data-testid="edit-input-image"
              value={ image }
              type="text"
              onChange={ this.onInputChange }
            />
          </label>
          Nome
          <label htmlFor="name">
            <input
              name="name"
              data-testid="edit-input-name"
              value={ name }
              type="text"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              name="email"
              data-testid="edit-input-email"
              value={ email }
              type="email"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="description">
            Descricao
            <textarea
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            disabled={ disable }
            type="button"
            onClick={ this.updateUser }
          >
            Salvar

          </button>
        </form>

      </>
    );
  }

  render() {
    const { loading } = this.props;
    const { loadingLocal, atualizado } = this.state;
    return (
      <>
        {atualizado
          ? <Redirect exact to="/profile" /> : null}
        <div data-testid="page-profile-edit">
          {loading || loadingLocal
            ? <Loading />
            : this.renderProfileEdit()}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
  fetchUpdateUser: PropTypes.func.isRequired,
};

export default ProfileEdit;
