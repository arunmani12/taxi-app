import React,{useEffect,useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Loginindex from './components/login';
import Home from './components/Home'
import Admin from './components/Admin';
import { parseCookies, destroyCookie } from "nookies";
import Cookies from 'js-cookie';

export default function App() {

      let isLogedin = Cookies.get('token');

  return (
    <Router>
       <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Loginindex />
          </Route>

          <Route exact path="/admin">
          {isLogedin ? <Admin/>:<Redirect to="/login" /> }
         </Route>


{/* 
          <Route path="/admin">
            <Admin/>
          </Route> */}
      </Switch>
    </Router>
  )
}
