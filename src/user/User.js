import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import WoofList from '../common/WoofList';
import HeaderAppBar from '../common/HeaderAppBar';

class User extends Component {
  constructor(props) {
    super(props);
    const { handle } = props.match.params;
    this.state = {
      handle,
      woofArray: [],
    };
  }

  componentDidMount() {
    const { handle } = this.state;
    const { history } = this.props;

    fetch(`https://dirdapi.chaz.pro/${handle}/woofs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(response => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'failed') {
          history.push('/404');
        } else {
          this.setState({ woofArray: responseJson });
        }
      });
  }

  render() {
    const { woofArray } = this.state;
    return (
      <div>
        <HeaderAppBar />
        <WoofList woofArray={woofArray} />
      </div>
    );
  }
}

User.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(User);
