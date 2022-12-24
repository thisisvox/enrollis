import * as React from "react";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  Divider,
  TextField,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { SessionListHead, SessionListToolbar } from "../sections/Session";
// mock
import moment from "moment-timezone";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Title", alignRight: false },
  { id: "company", label: "Description", alignRight: false },
  { id: "role", label: "Date", alignRight: false },
  { id: "isVerified", label: "Link", alignRight: false },
  { id: "sdate", label: "Duration", alignRight: false },
  { id: "pack", label: "Package Id", alignRight: false },
  { id: "" },
];
const style = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  borderRadius: 2,
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (item) =>
        item.sess_title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.sess_description.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function sessionPage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const [sessions, setSessions] = useState([]);
  const getSessions = async () => {
    try {
      const response = await fetch("http://164.92.200.193:5000/api/session");
      let jsonData = await response.json();
      if (location.state?.pack_id) {
        jsonData = jsonData.filter((session) => {
          return session.pack_id === location.state.pack_id;
        });
      }
      setSessions(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showHandouts = async (id) => {
    try {
      setOpen(false);
      navigate("/handout", { state: { sess_id: id } });
    } catch (error) {
      console.error(error.message);
    }
  }; 
  const deleteSession = async (id) => {
    try {
      setOpen(false);
      const response = await fetch(`http://164.92.200.193:5000/api/session/${id}`, {
        method: "DELETE",
      });
      setSessions(sessions.filter(session => session.sess_id !== id));
      // window.location = "/tutors";
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const [openm, setOpenm] = useState(false);
  const handleOpen = () => setOpenm(true);
  const handleClose = () => setOpenm(false);

  const[title, setTitle]=useState("");
  const[description, setDescription]=useState("");
  const[date, setDate]=useState(dayjs());
  const[link, setLink]=useState("");
  const[duration, setDuration]=useState("");

  
  const addSession = async e => {
      e.preventDefault();
  try {
      const body = { 
        pack_id: location.state?.pack_id, 
        sess_title: title, 
        sess_description: description, 
        sess_date: date, 
        sess_link: link, 
        duration: duration   };
      const response = await fetch ("http://164.92.200.193:5000/api/session", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      });
      window.location="/session";
  } catch (error) {
      console.error(error.message);
  }
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  //end add

  useEffect(() => {
    getSessions();
  }, []);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedRow, setSelectedRow] = useState({});


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleTest = (event, row) => {
    handleOpenMenu(event);
    setSelectedRow(row);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sessions.map((session) => session.sess_title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sessions.length) : 0;

  const filteredUsers = applySortFilter(
    sessions,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Session | Enrollis </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >  
          <Typography variant="h4" gutterBottom>
            Sessions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" /> } onClick={handleOpen}
          >
            New session
          </Button>
        </Stack>

        <Modal
          open={openm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} position="absolute">
            <Typography id="modal-modal-title" variant="h5" component="h2" mb={1}>
              Add Student
            </Typography>
            <Divider style={{width:'100%'}}/>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Stack spacing={4} mt={5} mb={5} sx={{ width: '80%' }} >
              <TextField
                required id="outlined-required" label="Title" placeholder="Session Title" size='small' value={title} onChange={e=> setTitle(e.target.value)}/>
              <TextField
                required id="outlined-required" label="Description" placeholder="Session Descritpion" size='small' value={description} onChange={e=> setDescription(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>

              <TextField
                required id="outlined-required" label="Link" placeholder="Link to Meeting" size='small' value={link} onChange={e=> setLink(e.target.value)}/>
              <TextField
                id="outlined-number"
                label="Duration"
                placeholder="Number of Hours"
                type="number" size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                value={duration} onChange={e=>{setDuration(e.target.value)}}
              />
            </Stack>
            </Box>
            <Button variant="contained" startIcon={<CheckIcon />} onClick={addSession} style={{width:'50%'}}>Save</Button>
          </Box>
        </Modal>

        <Card>
          <SessionListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SessionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sessions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.map((session) => (
                    <TableRow
                      hover
                      key={session.sess_id}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={(event) =>
                            handleClick(event, session.sess_title)
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Typography variant="subtitle2" p={2}>
                          {session.sess_title}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{session.sess_description}</TableCell>
                      <TableCell align="left">
                        {moment(session.sess_date).format("MMM D, YYYY")}
                      </TableCell>
                     

                      <TableCell align="left">
                        {session.sess_link}
                      </TableCell>
                      <TableCell align="center">{session.duration}</TableCell>
                      <TableCell align="center">{session.pack_id}</TableCell>
                      

                      <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={(event) => handleTest(event, session)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sessions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
           
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick= {() => showHandouts(selectedRow.sess_id)}>  
          <Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
          View Handouts
        </MenuItem>

        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick= {() => deleteSession(selectedRow.sess_id)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
