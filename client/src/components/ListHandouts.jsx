import React , {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import HandoutListToolbar from '../sections/Handout/HandoutListToolbar'
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

const ListHandout = ()=>{
    const [rows, setRows] = useState([]);

    const getRows = async()=> {
        try {
           const response = await fetch("http://164.92.200.193:5000/api/handout");
           const jsonData = await response.json();
           
           setRows(jsonData); 
        } catch (err) {
           console.error(err.message); 
        }
    }
    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
      };
    useEffect (()=> {
        getRows();
    },[]);
    return (
        <div>
        <h1>List of Handouts</h1>
        <HandoutListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Link</StyledTableCell>
                <StyledTableCell align="center">Session ID</StyledTableCell>
                <StyledTableCell align="center">Package ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.doc_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.doc_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.doc_title}</StyledTableCell>
                  <StyledTableCell align="center">{row.doc_link}</StyledTableCell>
                  <StyledTableCell align="center">{row.sess_id}</StyledTableCell>
                  <StyledTableCell align="center">{row.pack_id}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      )
};
export default ListHandout;