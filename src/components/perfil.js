import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSearch = () => {
    const { pessoaLogada } = this.props;
    const { name, email, description, image } = pessoaLogada;
    return (
      <>
        <img data-testid="profile-image" src={ image } alt="FotoDeperfil" />
        <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
        <h2>Nome</h2>
        <h4>{ name }</h4>
        <h2>Email</h2>
        <h4>{ email }</h4>
        <h2>Descricao</h2>
        <h3>{ description }</h3>

      </>
    );
  }

  render() {
    return (
      <div data-testid="page-profile">
        {this.renderSearch()}
      </div>
    );
  }
}

Perfil.propTypes = {
  pessoaLogada: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default Perfil;
