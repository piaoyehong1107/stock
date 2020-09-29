import React from "react";
import Stocks from "../component/Stocks";
import ReactEcharts from "echarts-for-react";
import moment from "moment";
import { API_KEY } from "../constants";

class Market extends React.Component {
  state = {
    stocks: [],
  };

  componentDidMount() {
    fetch(
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": `${API_KEY}`,
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
      });
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
