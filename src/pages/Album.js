import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends React.Component {
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
      Album
    </>
  )

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-album">
        {loading
          ? <Loading />
          : this.renderSearch()}
      </div>
    );
  }
}

Album.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
};

export default Album;
