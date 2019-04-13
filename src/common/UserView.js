import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DefaultPicture from '../DefaultUser.png';

const UserView = (props) => {
  const { handle, email, picture } = props;

  const userImage = () => {
    if (picture) {
      return (
        <img
          src={`data:image/jpeg;base64,${picture}`}
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
  };

  return (
    <div style={{ float: 'left', marginLeft: '50px', marginTop: '50px' }}>
      {userImage()}
      <Typography variant="h5">
        {'@'}
        {handle}
        <br />
        {email}
      </Typography>
      <Button variant="contained" href="/edit">
        Edit
      </Button>
    </div>
  );
};

UserView.propTypes = {
  handle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

export default UserView;
