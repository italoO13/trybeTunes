import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Perfil from '../components/perfil';

class Profile extends React.Component {
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
      <Perfil { ...this.props } />
    </>
  )

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-profile">
        {loading
          ? <Loading />
          : this.renderSearch()}
      </div>
    );
  }
}

Profile.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
};

export default Profile;
