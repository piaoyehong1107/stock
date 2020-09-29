import React from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {API_KEY} from '../constants'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
 
const DisplaySearchedStock = ({searchedStock, saveToDb}) => {
  // console.log({saveToDb: saveToDb})
  const classes = useStyles();

  if (!searchedStock) return null

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Sector</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Save as Favorite</TableCell>
            <TableCell align="right">View Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right">{searchedStock.name}</TableCell>
            <TableCell align="right">{searchedStock.symbol}</TableCell>
            <TableCell align="right">{searchedStock.sector}</TableCell>
            <TableCell align="right">{searchedStock.price}</TableCell>
            <TableCell align="right"><button onClick={()=>saveToDb(searchedStock)}>Favorite</button></TableCell>
            <TableCell align="right">
            <Link to={{
                  pathname: `/detail/${searchedStock.symbol}`
                }}>
                  Detail
                </Link>
                </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
  // return (
  //   <>
  //     <div>{stockProfile.name}</div>
  //     <div>{stockProfile.sector}</div>
  //   </>
  // )
}


const DisplayFavoriteStocks = ({favoriteStocks,removeFromDb}) => {
  const classes = useStyles();

  if (!favoriteStocks) return null

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Sector</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Save as Favorite</TableCell>
            <TableCell align="right">View Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favoriteStocks.map(s => (
            <TableRow key={s.name}>
              <TableCell align="right">{s.name}</TableCell>
              <TableCell align="right">{s.symbol}</TableCell>
              <TableCell align="right">{s.sector}</TableCell>
              <TableCell align="right">{s.price}</TableCell>
              <TableCell align="right"><button onClick={()=>removeFromDb(s)}>Unfavorite</button></TableCell>
                <TableCell align="right">
                <Link to={{
                  pathname: `/detail/${s.symbol}`
                }}>
                  Detail
                </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
  // return (
  //   <>
  //     <div>{stockProfile.name}</div>
  //     <div>{stockProfile.sector}</div>
  //   </>
  // )
}

class Favorites extends React.Component {
  state = {
    searchedValue: "",
    searchedStock: null,
    favoriteStocks: [],
  };

  saveToDb=(selectedStock)=>{
    const newStock = {
      "name": selectedStock.name,
      "symbol": selectedStock.symbol,
      "sector": selectedStock.sector,
      "price": selectedStock.price,
    }

    return fetch('http://localhost:3000/stocks',{
      method: 'POST',
      headers: {
        "Content-Type":'application/json'
      },
      body: JSON.stringify(newStock)
    })
    .then(() => {
      
      this.setState({
        searchedStock: null,
        favoriteStocks: [ ...this.state.favoriteStocks, newStock]
      })
    }).catch(err => {
      console.log(err)
    })
  }
  removeFromDb=(selectedStock)=>{
    return fetch(`http://localhost:3000/stocks/${selectedStock.id}`,{
      method: 'DELETE'
    })
    .then(() => {
      this.setState({
        favoriteStocks: this.state.favoriteStocks.filter(stock=> stock.id !== selectedStock.id)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  fetchData = (stockTicker) => {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=${stockTicker}`
    fetch(
      url,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key":
          `${API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.price.symbol);
        this.setState({
          searchedStock: {
            sector: data.summaryProfile.sector,
            name: data.price.shortName,
            price: data.summaryDetail.open.fmt,
            symbol: data.price.symbol
          },
          searchedValue: ''
        });
      })
      .catch((err) => {
        this.setState({
          searchedStock: null,
        });
      });
  };

  componentDidMount() {
    fetch('http://localhost:3000/stocks',{
      method: 'GET',
      headers: {
        "Content-Type":'application/json'
      },
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log({data})
        this.setState({
          favoriteStocks: data
        })
      })
    // fetch favorites from backend api
  }

  render() {
    const searchedValue = this.state.searchedValue
    const searchedStock = this.state.searchedStock
    const favoriteStocks = this.state.favoriteStocks
    const saveToDb = this.saveToDb
    const removeFromDb = this.removeFromDb
    // console.log({searchedStock, favoriteStocks})
    return (
      <div>
        <input
          value={searchedValue}
          onChange={(e) => {
            this.setState({ searchedValue: e.target.value})
          }}
          style={{
            marginRight: '8px',
            marginBottom: '8px'
          }}
        />
        <button onClick={() => this.fetchData(searchedValue)}>Search</button>
        <div>Searched Result</div>
        <div style={{marginBottom: '32px'}}>
          {searchedStock && <DisplaySearchedStock searchedStock={searchedStock} saveToDb={saveToDb}/>}
        </div>
        <div>Saved Favorites</div>
        <div>
          {favoriteStocks && <DisplayFavoriteStocks favoriteStocks={favoriteStocks} removeFromDb={removeFromDb}/>}
        </div>
      </div>
    );
  }
}
export default Favorites;
