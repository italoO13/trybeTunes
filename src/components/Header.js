import React from 'react';
import PropTypes from 'prop-types';

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
      </header>
    );
  }
}

Header.propTypes = {
  pessoaLogada: PropTypes.shape.isRequired,
};

export default Header;
