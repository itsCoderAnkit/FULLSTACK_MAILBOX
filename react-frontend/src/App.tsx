import React, { Fragment } from 'react';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Pages/SignUp';
import Login from './Components/Pages/Login';

import { Route, Switch } from 'react-router-dom';
import Welcome from './Components/Pages/Welcome';
import ComposeMail from './Components/Pages/ComposeMail';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/welcome'>
          <Welcome />
        </Route>
        <Route path='/compose-mail'>
          <ComposeMail />
        </Route>
      </Switch>

      <Footer />
    </Fragment>

  );
}

export default App;
