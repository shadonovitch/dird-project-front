import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import store from '../redux/store';
import { fetchUserWoofs } from '../redux/actions';

const styles = {
  WoofForm: {
    backgroundColor: '#5b85cc',
    margin: 'auto',
    width: '50%',
    paddingBottom: '5px',
    paddingTop: '30px',
  },
  woofbox: {
    backgroundColor: '#b7b7b8',
    font: 'arial',
  },
};

class WoofForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      woof: '',
    };
    this.handleChangeWoof = this.handleChangeWoof.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeWoof(event) {
    this.setState({ woof: event.target.value });
  }

  handleSubmit(event) {
    const { woof } = this.state;
    const { token } = this.props;
    event.preventDefault();
    fetch('https://dirdapi.chaz.pro/woof', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: woof,
      }),
    }).then(() => {
      store.dispatch(fetchUserWoofs(token));
      this.setState({ woof: '' });
    });
  }

  render() {
    const { woof } = this.state;
    return (
      <div style={styles.WoofForm}>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Post a Woof !"
            value={woof}
            onChange={this.handleChangeWoof}
            style={styles.woofbox}
            rows="4"
            cols="100"
          />
          <br />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

WoofForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default WoofForm;
