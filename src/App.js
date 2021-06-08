import React from "react";
import { withRouter } from "react-router";
import Stocks from "./component/Stocks";
import Market from "./container/Market";


function App(){

  return (
      <div className="showListMain">
        <div className="header">
          <Market />
          <Stocks />
        </div>
      </div>

  )
};
export default withRouter(App);
