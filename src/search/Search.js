import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography/Typography';
import { Redirect } from 'react-router';
import HeaderAppBar from '../common/HeaderAppBar';
import UserList from '../common/UserList';

class Search extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || undefined,
      query: '',
      userArray: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { token } = this.state;
    const values = queryString.parse(location.search);
    this.setState({ query: values.q });
    fetch(`https://dirdapi.chaz.pro/users?handle=${values.q}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
      .then((responseJson) => {
        this.setState({ userArray: responseJson });
      }).catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const {
      query, token, userArray, errorMessage,
    } = this.state;
    if (token === undefined) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <HeaderAppBar />
        {errorMessage && <p style={{ color: 'darkred' }}>{errorMessage}</p>}
        <div style={{ float: 'left', marginLeft: '10%' }}>
          <Typography variant="h5">Search results for :</Typography>
          <Typography variant="h5">{query}</Typography>
        </div>
        <div>
          <UserList userArray={userArray} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  location: PropTypes.shape.isRequired,
};

export default withCookies(Search);
