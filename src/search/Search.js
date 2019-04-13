import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography/Typography';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from '../redux/store';
import UserList from '../common/UserList';
import { fetchSearchUsers, fetchSearchWoofs } from '../redux/actions';
import HeaderAppBar from '../common/HeaderAppBar';
import WoofList from '../common/WoofList';

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
    if (values.q[0] === '#') {
      values.q = values.q.substring(1);
      store.dispatch(fetchSearchWoofs(token, values.q));
    } else {
      store.dispatch(fetchSearchUsers(token, values.q));
    }
  }

  searchResult() {
    const { searchUsersResults, searchWoofsResults } = this.props;
    if (searchUsersResults.length > 0) {
      return (<UserList userArray={searchUsersResults} />);
    }
    if (searchWoofsResults.length > 0) {
      return (<WoofList woofArray={searchWoofsResults} />);
    }
    return (<div />);
  }

  render() {
    const { errorMessage, query, token } = this.state;
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
          {this.searchResult()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchUsersResults: state.searchUsersResults,
    searchWoofsResults: state.searchWoofsResults,
    query: state.query,
  };
}

Search.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  location: PropTypes.shape().isRequired,
  searchUsersResults: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchWoofsResults: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(withCookies(withRouter(Search)));
