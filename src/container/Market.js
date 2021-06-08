import React from "react";
import Stocks from "../component/Stocks";
import { API_KEY } from "../constants";

class Market extends React.Component {
  state = {
    stocks: [],
  };

  componentDidMount() {
      // var unirest = require("unirest");

      // var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary");

      // req.query({
      //   "region": "US"
      // });

      // req.headers({
      //   "x-rapidapi-key": "cff81de94amsha15c3c45f659e67p1d687cjsn1247acf66df6",
      //   "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      //   "useQueryString": true
      // });


      // req.end(function (res) {
      //   if (res.error) throw new Error(res.error);

      //   console.log(res.body);
      // });


     fetch(

      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": `${API_KEY}`,
          "useQueryString": true
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("-----------------");
        console.log({ data });
        this.setState({
          stocks: data.marketSummaryResponse.result,
        }); 
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    const stocks = this.state.stocks;
    return (
      <div>
        <Stocks stocks={stocks} />
      </div>
    );
  }
}

export default Market;
