import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchGetUser } = this.props;
    fetchGetUser();
  }

  renderProfileEdit = () => (
    <>
      <Header { ...this.props } />
      ProfileEdit
    </>
  )

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-profile-edit">
        {loading
          ? <Loading />
          : this.renderProfileEdit()}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  fetchGetUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pessoaLogada: PropTypes.shape.isRequired,
};

export default ProfileEdit;
