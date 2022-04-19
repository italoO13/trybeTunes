import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Input from '../components/Input';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchGetUser } = this.props;
    fetchGetUser();
  }

  renderSearch = () => {
    const { nomeArtista, onInputChange, statusButtonLogin } = this.props;
    return (
      <>
        <Header { ...this.props } />
        Search
        <form>
          <Input
            name="nomeArtista"
            testid="search-artist-input"
            type="text"
            placeholder="Nome do artista"
            value={ nomeArtista }
            onInputChange={ onInputChange }
          />

          <button
            data-testid="search-artist-button"
            disabled={ statusButtonLogin }
            type="button"
          >
            Pesquisar

          </button>

        </form>
      </>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-search">
        {loading
          ? <Loading />
          : this.renderSearch()}
      </div>
    );
  }
}

Search.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
  nomeArtista: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  statusButtonLogin: PropTypes.bool.isRequired,
};

export default Search;
