import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import uniqueid from 'uniqid';
import UserCard from './UserCard';

const styles = {
  UserList: {
    backgroundColor: '#5ac9dd',
    margin: 'auto',
    width: '40%',
  },
};

class UserList extends Component {
  componentDidMount() {
  }

  render() {
    const { userArray } = this.props;
    if (userArray === undefined) {
      return (<div />);
    }
    return (
      <div style={styles.UserList}>
        <List>
          {userArray.map(item => (
            <ListItem key={uniqueid()}>
              <UserCard key={uniqueid()} handle={item.handle} email={item.email} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


UserList.propTypes = {
  userArray: PropTypes.arrayOf(PropTypes.shape({
    handle: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default UserList;
