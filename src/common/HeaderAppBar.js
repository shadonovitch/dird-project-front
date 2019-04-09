import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField/TextField';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import DirdLogo from '../DirdLogo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    textColor: 'white',
  },
};

function ButtonAppBar(props) {
  const { history } = props;
  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/">Home </Button>
          <Button color="inherit" href="/messenger"> Messages </Button>
          <img
            src={DirdLogo}
            alt="DirdLogo"
            style={{ maxWidth: '50px', height: '50px', margin: 'auto' }}
          />
          <div style={styles.search}>
            <TextField
              id="outlined-email-input"
              label="Search..."
              margin="normal"
              variant="outlined"
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') history.push(`/search?q=${event.target.value}`);
              }}
            />
          </div>
          <Button color="inherit" href="/logout">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default withRouter(ButtonAppBar);
