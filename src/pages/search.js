import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchGetUser } = this.props;
    fetchGetUser();
  }

  renderSearch = () => (
    <>
      <Header { ...this.props } />
      ProfileEdit
    </>
  )

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
};

export default Search;
