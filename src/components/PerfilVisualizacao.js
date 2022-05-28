import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/perfilvisualizacao.module.css';

class PerfilVisualizacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSearch = () => {
    const { pessoaLogada } = this.props;
    const { name, email, description, image } = pessoaLogada;
    return (
      <div className={ styles.containePerfil }>
        <div className={ styles.containerauxliar }>

          <div className={ styles.imgEditar }>
            <img
              data-testid="profile-image"
              src={ image === undefined || image.length === 0
                ? 'https://cdn-icons-png.flaticon.com/512/17/17004.png' : image }
              alt="FotoDeperfil"
            />
            <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
          </div>

          <div className={ styles.texto }>
            <h2>Nome</h2>
            <h4>{ name }</h4>
          </div>

          <div className={ styles.texto }>
            <h2>Email</h2>
            <h4>{ email }</h4>
          </div>

          <div className={ styles.texto }>
            <h2>Descricao</h2>
            <h3>{ description }</h3>
          </div>
        </div>

      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderSearch()}
      </>
    );
  }
}

PerfilVisualizacao.propTypes = {
  pessoaLogada: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default PerfilVisualizacao;
