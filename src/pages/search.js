import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Input from '../components/Input';
import CardAlbum from '../components/cardAlbum';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Assim que entra em search ele atualiza os dados de pessoa logada no componente pai
    const { fetchGetUser } = this.props;
    fetchGetUser();
  }

  renderListaAlbum = () => {
    const { auxNomeArtista, albunsArtista } = this.props;
    const texto = `Resultado de álbuns de: ${auxNomeArtista}`;
    const notFound = 'Nenhum álbum foi encontrado';
    return (
      <>
        <p>{texto}</p>
        <div className="Albuns">
          {albunsArtista.length === 0
            ? <p>{notFound}</p>
            : albunsArtista
              .map((album, index) => <CardAlbum key={ index } { ...album } />)}
        </div>
      </>);
  }

  renderSearch = () => {
    const { nomeArtista, onInputChange, statusButtonSearch,
      pesquisafeita, fetchSearchAlbum } = this.props;
    return (
      <>
        <Header { ...this.props } />
        <form>
          {/* { Input responsavel por coletar nome do artista e enviar para var de state no componente app } */}
          <Input
            name="nomeArtista"
            testid="search-artist-input"
            type="text"
            placeholder="Nome do artista"
            value={ nomeArtista }
            onInputChange={ onInputChange }
          />
          {/* recebe statusButton... que valida o input sempre que onInputchange é chamado no comp app.js  */}
          {/* Executa função fetchSearchAlbum que pega nomeArtista, faz chamada em api e joga dados em albumArtista */}
          <button
            data-testid="search-artist-button"
            disabled={ statusButtonSearch }
            type="button"
            onClick={ fetchSearchAlbum }
          >
            Pesquisar

          </button>

        </form>
        <div className="ListaAlbum">
          {/* Variavel em compoenente pai que retorna true caso a chamada a api tenha finalizado com sucesso */}
          {pesquisafeita
            ? this.renderListaAlbum()
            : null}
        </div>

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
  pessoaLogada: PropTypes.objectOf.isRequired,
  nomeArtista: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  statusButtonSearch: PropTypes.bool.isRequired,
  albunsArtista: PropTypes.objectOf.isRequired,
  pesquisafeita: PropTypes.bool.isRequired,
  fetchSearchAlbum: PropTypes.func.isRequired,
  auxNomeArtista: PropTypes.string.isRequired,

};

export default Search;
