import React, { useEffect, useState } from "react";
import Stocks from "../component/Stocks";
import { API_KEY } from "../constants";

function Market () {

  const [stocks, setStock] = useState([])

  useEffect (()=>{
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
        setStock(
          data.marketSummaryResponse.result,
        ); 
      })
      .catch((err) => {
        console.error(err);
      })
  },[])
    return (
      <div>
        <Stocks stocks={stocks} />
      </div>
    );
}

export default Market;
  