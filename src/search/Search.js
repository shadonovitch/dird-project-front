import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography/Typography';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from '../redux/store';
import UserList from '../common/UserList';
import { fetchSearch } from '../redux/actions';
import HeaderAppBar from '../common/HeaderAppBar';

class Search extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || undefined,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { token } = this.state;
    const values = queryString.parse(location.search);
    this.setState({ query: values.q });
    store.dispatch(fetchSearch(token, values.q));
  }

  render() {
    const { errorMessage, query, token } = this.state;
    const {
      searchResults,
    } = this.props;
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
          <UserList userArray={searchResults} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
    query: state.query,
  };
}

Search.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  location: PropTypes.shape.isRequired,
  searchResults: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(withCookies(withRouter(Search)));
