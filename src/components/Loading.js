import React from 'react';
import styles from '../styles/loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={ styles.loading }>
        <div className="imgwrapper">
          <img src="https://acegif.com/wp-content/uploads/loading-11.gif" alt="git-Loading" />
        </div>
        <h1>Carregando...</h1>

      </div>
    );
  }
}

export default Loading;
