import React, { Fragment } from 'react';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Pages/SignUp';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </Switch>

      <Footer />
    </Fragment>

  );
}

export default App;
