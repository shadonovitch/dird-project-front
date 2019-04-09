import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import UserCard from './UserCard';

const styles = {
  WoofList: {
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
    return (
      <div style={styles.WoofList}>
        <List>
          {userArray.map(item => (
            <ListItem key={item.id}>
              <UserCard key={item.id} handle={item.handle} email={item.email} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


UserList.propTypes = {
  userArray: PropTypes.shape({
    handle: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserList;
