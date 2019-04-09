import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserView from '../common/UserView';
import WoofForm from '../common/WoofForm';
import WoofList from '../common/WoofList';
import store from '../redux/store';
import HeaderAppBar from '../common/HeaderAppBar';
import { fetchProfile, fetchProfilePicture, fetchUserWoofs } from '../redux/actions';

const styles = {
  UserCard: {
    float: 'left',
  },
  Content: {
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    let token = '';
    if (cookies.get('token') !== null) {
      token = cookies.get('token');
    }
    this.state = {
      token,
    };
  }

  componentDidMount() {
    const { token } = this.state;
    store.dispatch(fetchProfile(token));
    store.dispatch(fetchProfilePicture(token));
    store.dispatch(fetchUserWoofs(token));
  }

  render() {
    const {
      token,
    } = this.state;
    const {
      handle, email, pictureB64, userWoofs,
    } = this.props;
    if (token === undefined) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <HeaderAppBar />
        <UserView picture={pictureB64} handle={handle} email={email} />
        <div style={styles.Content}>
          <WoofForm token={token} />
          <WoofList woofArray={userWoofs} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    handle: state.profile.handle,
    email: state.profile.email,
    userWoofs: state.userWoofs,
    pictureB64: state.pictureB64,
    loading: state.loading,
    error: state.error,
  };
}

Home.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  handle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pictureB64: PropTypes.string.isRequired,
  userWoofs: PropTypes.shape.isRequired,
};

export default withCookies(connect(mapStateToProps)(Home));
