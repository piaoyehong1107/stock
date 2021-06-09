import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function Stocks({
  stocks})
  {
    console.log(stocks)
    return (
        <>
          <div style={{margin: '24px 0'}}>{`Today's Stock Market`}</div>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Symbol</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Change Percent</TableCell>
                  <TableCell align="right">Change Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{s.shortName}</TableCell>
                    <TableCell align="right">{s.symbol}</TableCell>
                    <TableCell align="right">{s.regularMarketPrice.fmt}</TableCell>
                    <TableCell align="right">
                      {s.regularMarketChangePercent.fmt}
                    </TableCell>
                    <TableCell align="right">{s.regularMarketChange.fmt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
}

export default Stocks;
