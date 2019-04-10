import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Redirect } from 'react-router';
import { fetchProfile, fetchProfilePicture } from '../redux/actions';
import store from '../redux/store';
import DefaultPicture from '../DefaultUser.png';
import HeaderAppBar from '../common/HeaderAppBar';

const styles = {
  container: {
    margin: 'auto',
  },
  button: {
  },
};
class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || undefined,
      newEmail: '',
      newHandle: '',
      redirect: false,
      file: null,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeHandle = this.handleChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleUploadPicture = this.handleUploadPicture.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    store.dispatch(fetchProfile(token));
    store.dispatch(fetchProfilePicture(token));
  }

  handleChangeEmail(event) {
    this.setState({ newEmail: event.target.value });
  }

  handleChangeHandle(event) {
    this.setState({ newHandle: event.target.value });
  }

  handleSubmit(event) {
    const { newEmail, newHandle, token } = this.state;

    event.preventDefault();
    if (newEmail === '' || newHandle === '') {
      this.setState({ errorMessage: 'Email and handle must be provided.' });
      return;
    }
    fetch('https://dirdapi.chaz.pro/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: newEmail,
        handle: newHandle,
      }),
    }).then(response => response.json())
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  handleChangePicture(event) {
    this.setState({ file: event.target.files[0] });
    event.preventDefault();
  }

  handleUploadPicture(event) {
    const { file, token } = this.state;

    event.preventDefault();
    if (file === null) {
      this.setState({ errorMessage: 'Should upload an image.' });
    } else {
      const formData = new FormData();
      formData.append('picture', file);
      fetch('https://dirdapi.chaz.pro/profile/picture', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then(response => response.json())
        .then(() => {
          this.setState({ errorMessage: '' });
          store.dispatch(fetchProfilePicture(token));
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  }

  userImage() {
    const { pictureB64 } = this.props;
    if (pictureB64) {
      return (
        <img
          src={`data:image/jpeg;base64,${pictureB64}`}
          alt="ProfilePicture"
          style={{ width: '200px', height: '200px' }}
        />
      );
    }
    return (
      <img
        src={DefaultPicture}
        style={{ width: '200px', height: '200px' }}
        alt="UserPicture"
      />
    );
  }

  render() {
    const {
      handle, email,
    } = this.props;
    const {
      newEmail, newHandle, redirect, errorMessage, token,
    } = this.state;
    if (redirect === true) {
      return (<Redirect to="/" />);
    }
    if (token === undefined) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <HeaderAppBar />
        <div style={styles.container}>
          {errorMessage && <p style={{ color: 'darkred' }}>{errorMessage}</p>}
          {this.userImage()}
          <br />
          <form onSubmit={this.handleUploadPicture}>
            <input
              accept="image/jpeg"
              type="file"
              onChange={this.handleChangePicture}
            />
            <Button variant="contained" className={styles.button} type="submit">
            Edit Picture
            </Button>
          </form>
          <br />
          <form onSubmit={this.handleSubmit}>
            <TextField label="Handle" type="text" placeholder={handle} value={newHandle} onChange={this.handleChangeHandle} />
            <br />
            <TextField label="Email" type="text" placeholder={email} value={newEmail} onChange={this.handleChangeEmail} />
            <br />
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </form>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    handle: state.profile.handle,
    email: state.profile.email,
    pictureB64: state.pictureB64,
    loading: state.loading,
    error: state.error,
  };
}

EditProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  handle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pictureB64: PropTypes.string.isRequired,
};

export default withCookies(connect(mapStateToProps)(EditProfile));
