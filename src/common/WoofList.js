import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import uniqueid from 'uniqid';

import WoofCard from './WoofCard';

const styles = {
  WoofList: {
    backgroundColor: '#5ac9dd',
    margin: 'auto',
    width: '50%',
  },
};

class WoofList extends Component {
  componentDidMount() {
  }

  render() {
    const { woofArray } = this.props;
    if (woofArray === undefined) {
      return <div />;
    }
    return (
      <div style={styles.WoofList}>
        <List>
          {woofArray.map(item => (
            <ListItem key={uniqueid()}>
              <WoofCard key={uniqueid()} handle={item.handle} txt={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

WoofList.propTypes = {
  woofArray: PropTypes.arrayOf(PropTypes.shape({
    handle: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default WoofList;
