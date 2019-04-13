import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store';
import './App.css';
import Authentication from './connection/Authentication';
import Register from './connection/Register';
import Home from './home/Home';
import User from './user/User';
import NotFound from './common/NotFound';
import EditProfile from './edit/EditProfile';
import Logout from './common/Logout';
import Search from './search/Search';


const App = () => {
  document.body.style = 'background: darkgray';
  document.title = 'Dird Project';
  return (
    <div className="App">
      <Provider store={store}>
        <CookiesProvider>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/auth" render={() => <Authentication />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/edit" render={() => <EditProfile />} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/logout" render={() => <Logout />} />
            <Route exact path="/404" render={() => <NotFound />} />
            <Route exact path="/:handle" render={() => <User />} />
          </Switch>
        </CookiesProvider>
      </Provider>
    </div>
  );
};

export default App;
