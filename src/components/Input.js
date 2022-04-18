import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { testid, type, placeholder, value, name, onInputChange } = this.props;
    return (
      <input
        value={ value }
        name={ name }
        onChange={ onInputChange }
        data-testid={ testid }
        type={ type }
        placeholder={ placeholder }
      />
    );
  }
}

Input.propTypes = {
  testid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Input;
