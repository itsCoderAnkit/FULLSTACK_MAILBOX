import React, { Fragment } from 'react';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Pages/SignUp';
import Login from './Components/Pages/Login';

import { Redirect, Route, Switch } from 'react-router-dom';
import Welcome from './Components/Pages/Welcome';
import ComposeMail from './Components/Pages/ComposeMail';
import ViewMail from './Components/Pages/ViewMail';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import Home from './Components/Pages/Home';
import Logout from './Components/Pages/Logout';
import ErrorPage from './Components/Pages/ErrorPage';

function App() {

  const auth = useSelector((state:any)=>state.auth)
  //console.log("app auth",auth)

  return (
    <Fragment>
      <Header />
      <Switch>
      <Route path='/home'>
          <Home />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/welcome'>
        {/* {auth.isLoggedIn ? <Welcome />: <Redirect to='/login'/>} */}
        <Welcome />
        </Route>
        <Route path='/compose-mail'>
        {auth.isLoggedIn ? <ComposeMail />: <Redirect to='/login'/>}
          
        </Route>
        <Route path='/view-mail'>
        {auth.isLoggedIn ? <ViewMail />: <Redirect to='/login'/>}
          
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path="*">
          <ErrorPage/>
        </Route>
      </Switch>

      <Footer />
    </Fragment>

  );
}

export default App;
