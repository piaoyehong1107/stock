import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Detail from './component/Detail';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import Market from "./container/Market";


ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ ()=>{
        return(
          <Market />
        )
      }} />
      <Route exact path="/detail/:ticker" component={ ()=>{
        return(
          <Detail />
        )
      }} />
    </Switch>
</BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
