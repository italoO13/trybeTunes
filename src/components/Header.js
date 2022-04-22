import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import img from '../img/logoHeader.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // Recebe informações de pessoa logada que sempre é atualizada no compoenente pai
    const { pessoaLogada } = this.props;
    const { name, image } = pessoaLogada;
    return (
      <header data-testid="header-component" className={ styles.container }>

        <div className={ styles.headerPart1 }>

          <div className={ styles.imgWrapper }>
            <img src={ img } alt="logo-app" />
          </div>

          <div>

            <div className={ styles.imgWrapperUsuario }>
              <img
                src={ image === undefined || image.length === 0
                  ? 'https://cdn-icons-png.flaticon.com/512/17/17004.png' : image }
                alt="usuario"
              />
              <h4 data-testid="header-user-name">{ name }</h4>
            </div>

          </div>

        </div>
        {/* links de navegação para as outras partes do app */}
        <nav className={ styles.nav }>
          <ul>
            <Link data-testid="link-to-search" to="/search"><li>Search</li></Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              <li>
                Favorites
              </li>
            </Link>

            <Link data-testid="link-to-profile" to="/profile"><li>Profile</li></Link>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  pessoaLogada: PropTypes.shape.isRequired,
};

export default Header;
