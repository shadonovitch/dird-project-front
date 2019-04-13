import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import DefaultPicture from '../DefaultUser.png';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
    };
  }

  componentDidMount() {
    const { handle } = this.props;
    fetch(`https://dirdapi.chaz.pro/${handle}/picture`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { pictureB64 } = responseJson;
        this.setState({ picture: pictureB64 });
      });
  }

  userImage() {
    const { picture } = this.state;
    if (picture) {
      return (
        <img
          src={`data:image/jpeg;base64,${picture}`}
          alt="ProfilePicture"
          style={{ width: '50px', height: '50px' }}
        />
      );
    }
    return (
      <img
        src={DefaultPicture}
        style={{ width: '50px', height: '50px' }}
        alt="UserPicture"
      />
    );
  }


  render() {
    const { handle, email, history } = this.props;
    return (
      <div aria-hidden onClick={() => history.push(`/${handle}`)}>
        <div style={{ float: 'left' }}>
          {this.userImage()}
        </div>
        <div style={{ float: 'right', paddingLeft: '20px' }}>
          <Typography>
            @
            {handle}
          </Typography>
          <Typography>
            {email}
          </Typography>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  handle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(UserCard);
