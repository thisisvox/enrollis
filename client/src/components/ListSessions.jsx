import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import form from "@mui/material/form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1AA7EC",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListSessions = () => {
  const [rows, setRows] = useState([]);
  const [rowsCopy, setRowsCopy] = useState([]);
  const [sessionTitle, setSessionTitle] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const getRows = async () => {
    try {
      const response = await fetch("http://164.92.200.193:5000/api/session");
      const jsonData = await response.json();

      setRows(jsonData);
      setRowsCopy(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const onSubmit = (event) => {

    if (sessionTitle === "") {
      setRows(rowsCopy);
    } else {
      setRows(rows.filter((row) => row.sess_title.startsWith(sessionTitle)));
    }
    event.preventDefault();
    };
  useEffect(() => {
    getRows();
  }, []);
  return (
    <div>
      <h1>List of Sessions</h1>
      <form onSubmit={onSubmit}>
      <TextField
        id="outlined-basic"
        label="Search Title"
        variant="outlined"
        value={sessionTitle}
        onChange={(event) => setSessionTitle(event.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Session ID</StyledTableCell>
              <StyledTableCell align="center">Pack ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Link</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
              <StyledTableCell align="center">Tutor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.sess_id}>
                <StyledTableCell component="th" scope="row">
                  {row.sess_id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.pack_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.sess_title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.sess_description}
                </StyledTableCell>
                {/* Dec 13, 2022 */}
                <StyledTableCell align="center">
                  {moment(row.sess_date).format("MMM D, YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.sess_link}
                </StyledTableCell>
                <StyledTableCell align="center">{row.duration}</StyledTableCell>
                <StyledTableCell align="center">{row.user_id}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </form>
      
    </div>
  );
};
export default ListSessions;
