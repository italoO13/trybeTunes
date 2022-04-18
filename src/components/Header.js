import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { pessoaLogada } = this.props;
    const { name } = pessoaLogada;
    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">{ name }</h4>
        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </Link>

            </li>
            <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
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
