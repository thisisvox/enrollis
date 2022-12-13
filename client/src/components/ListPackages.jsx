import React , {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Package ID</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Test</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right"> N° Sessions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.pack_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.pack_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.pack_type}</StyledTableCell>
                  <StyledTableCell align="right">{row.test_title}</StyledTableCell>
                  <StyledTableCell align="right">{row.pack_price}</StyledTableCell>
                  <StyledTableCell align="right">{row.pack_n_session}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
};
export default ListPackages;