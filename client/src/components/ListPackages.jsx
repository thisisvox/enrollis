import React , {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment-timezone";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1AA7EC',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListPackages = ()=>{
    const [rows, setRows] = useState([]);

    const getRows = async()=> {
        try {
           const response = await fetch("http://164.92.200.193:5000/api/package");
           const jsonData = await response.json();
           
           setRows(jsonData); 
        } catch (err) {
           console.error(err.message); 
        }
    }
    useEffect (()=> {
        getRows();
    },[]);
    return (
      <div> 
        <h1>List of Packages</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Package ID</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Test</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center"> N° Sessions</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Days</StyledTableCell>
                <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center">End Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.pack_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.pack_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.pack_type}</StyledTableCell>
                  <StyledTableCell align="center">{row.test_title}</StyledTableCell>
                  <StyledTableCell align="cdenter">{row.pack_price}</StyledTableCell>
                  <StyledTableCell align="center">{row.pack_n_session}</StyledTableCell>
                  <StyledTableCell align="center">{moment(row.pack_sdate).format('MMM D, YYYY')}</StyledTableCell>
                  <StyledTableCell align="center">{moment(row.pack_edate).format('MMM D, YYYY')}</StyledTableCell>
                  <StyledTableCell align="center">{row.pack_days}</StyledTableCell>
                  <StyledTableCell align="center">{row.pack_stime}</StyledTableCell>
                  <StyledTableCell align="center">{row.pack_etime}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        
      )
};
export default ListPackages;