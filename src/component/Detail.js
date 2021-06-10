import React from "react";
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import ReactEcharts from 'echarts-for-react';
import {API_KEY} from '../constants'

function Detail (){
  // state={
  //   renderStock: []
  // }

  // componentDidMount(){
  //   const ticker = this.props.match.params.ticker
  //   console.log({ticker})
  //     fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?region=US&symbol=${ticker}`, {
  //         "method": "GET",
  //         "headers": {
  //             "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  //             "x-rapidapi-key": `${API_KEY}`
  //         }
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data)
  //         this.setState({
  //           renderStock: data.prices.reverse()
  //         })
  //     }).catch(err => {
  //       this.setState({
  //         renderStock: []
  //       })
  //     })
  // }

  // render() {
  //   console.log(this.state.renderStock);
  //   const option = {
  //     xAxis: {
  //       type: "category",
  //       boundaryGap: false,
  //       data: [],
  //     },
  //     yAxis: {
  //       type: "value",
  //     },
  //     series: [{
  //       data: [],
  //       type: 'line',
  //       areaStyle: {}
  //     }]
  //   };

  //   const xAxisData = [];
  //   const seriesData = [];
  //   this.state.renderStock.forEach((s) => {
  //     xAxisData.push(moment.unix(s.date).format("MM-DD-YYYY"));
  //     seriesData.push(s.close);
  //   });

  //   option.xAxis.data = xAxisData;
  //   option.series = [
  //     {
  //       data: seriesData,
  //       type: "line",
  //     },
  //   ];

    return (
      <div>
        <ReactEcharts
          // option={option}
          style={{ height: "500px", width: "1000px" }}
        />
      </div>
      );
}

export default withRouter(Detail);
