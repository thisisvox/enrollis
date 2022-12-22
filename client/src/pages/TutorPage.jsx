import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import CheckIcon from '@mui/icons-material/Check';
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
  TextField,
  Divider,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { TutorListHead, TutorListToolbar } from '../sections/Tutor';

import { styled } from '@mui/material/styles';
import { display } from '@mui/system';
// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'name', label: 'First Name', alignRight: false },
  { id: 'company', label: 'Last Name', alignRight: false },
  { id: 'role', label: 'Email', alignRight: false },
  { id: 'isVerified', label: 'Phone', alignRight: false },
  { id: 'status', label: 'Worked Hours', alignRight: false },
  { id: '' },
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
  return order === 'desc'
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
    return filter(array, (item) => item.user_fname.toLowerCase().indexOf(query.toLowerCase()) !== -1 || item.user_lname.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TutorPage() {
  
  const [tutors, setTutors]=useState([]);
  const getTutors = async () => {
    try {
        const response = await fetch ("http://164.92.200.193:5000/api/tutor");
        const jsonData = await response.json();
        setTutors(jsonData);
    } catch (error) {
        console.error(error.message);
    }
    }

  useEffect(() => {
      getTutors();
  }, []);

  //add tutor
  const [openm, setOpenm] = useState(false);
  const handleOpen = () => setOpenm(true);
  const handleClose = () => setOpenm(false);

  const[fname, setFname]=useState("");
  const[lname, setLname]=useState("");
  const[email, setEmail]=useState("");
  const[phone, setPhone]=useState("");
  
  const addTutor = async e => {
    e.preventDefault();
  try {
      const body = {user_fname: fname, user_lname: lname, user_email: email, user_phone: phone};
      const response = await fetch ("http://164.92.200.193:5000/api/tutor", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      });
      window.location="/tutors";
  } catch (error) {
      console.error(error.message);
  }
  }

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }
  //end add
  //edit tutor

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const[edFname, setEdFname]=useState("");
  const[edLname, setEdLname]=useState("");
  const[edEmail, setEdEmail]=useState("");
  const[edPhone, setEdPhone]=useState("");
  const[workHrs, setWorkHrs]=useState("");

  const editFunctions = () => {
    handleOpenEdit();
    setEdFname(selectedRow.user_fname)
    setEdLname(selectedRow.user_lname)
    setEdEmail(selectedRow.user_email)
    setEdPhone(selectedRow.user_phone)
    setWorkHrs(selectedRow.tutor_worked_hrs)
  }

  const editTutor = async (e,type,id) => {
      e.preventDefault();
  try {
      const body = {
        user_fname: edFname, user_lname: edLname, user_email: edEmail, user_phone: edPhone, tutor_worked_hrs: workHrs
      };
      const response = await fetch (`http://164.92.200.193:5000/api/tutor/${type}/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      });
      window.location="/tutors";
  } catch (error) {
      console.error(error.message);
  }
  }

  const handleEditChange = (newPhone) => {
    setEdPhone(newPhone)
  }

  const handleTutor = (event, row) => {
    handleOpenMenu(event);
    setSelectedRow(row);
  };

  //end edit

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedRow, setSelectedRow] = useState({});

  const closeFunctions = () => {
    handleCloseEdit();
    handleCloseMenu();
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tutors.map((tutor) => tutor.user_fname);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tutors.length) : 0;

  const filteredUsers = applySortFilter(tutors, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Tutor | Enrollis </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tutors
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            New Tutor
          </Button>
        </Stack>


        <Modal
          open={openm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" mb={1}>
              Add Tutor
            </Typography>
            <Divider style={{width:'100%'}}/>
            <Stack justifyContent="center" alignItems="center" spacing={3} mt={4} mb={3} >
              <TextField
                required id="outlined-required" label="First Name" placeholder="First Name" size='small' value={fname} onChange={e=> setFname(e.target.value)} style={{width:'80%'}}/>
              <TextField
                required id="outlined-required" label="Last Name" placeholder="First Name" size='small' value={lname} onChange={e=> setLname(e.target.value)} style={{width:'80%'}}
              />
              <TextField
                required id="outlined-required" label="Email" placeholder="Email" size='small' value={email} onChange={e=> setEmail(e.target.value)} style={{width:'80%'}}
              />
              <MuiTelInput defaultCountry='MA' size='small' value={phone} onChange={handleChange} style={{width:'80%'}}/>
            </Stack>
            <Button variant="contained" startIcon={<CheckIcon />} onClick={addTutor} style={{width:'50%'}}>Save</Button>
          </Box>
        </Modal>

        <Modal
          open={openEdit}
          onClose={closeFunctions}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" mb={1}>
              Edit Tutor
            </Typography>
            <Divider style={{width:'100%'}}/>
            <Stack justifyContent="center" alignItems="center" spacing={3} mt={4} mb={3} >
              <TextField
                required id="outlined-required" label="First Name" placeholder="First Name" size='small' value={edFname} onChange={e=> setEdFname(e.target.value)} style={{width:'80%'}}/>
              <TextField
                required id="outlined-required" label="Last Name" placeholder="First Name" size='small' value={edLname} onChange={e=> setEdLname(e.target.value)} style={{width:'80%'}}
              />
              <TextField
                required id="outlined-required" label="Email" placeholder="Email" size='small' value={edEmail} onChange={e=> setEdEmail(e.target.value)} style={{width:'80%'}}
              />
              <MuiTelInput defaultCountry='MA' size='small' label="Phone Number" value={edPhone} onChange={handleEditChange} style={{width:'80%'}}/>
              <TextField
                    id="outlined-number"
                    label="Worked Hours"
                    type="number" size='small'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={workHrs} onChange={e=>{setWorkHrs(e.target.value)}}
                  />

            </Stack>
            <Button variant="contained" startIcon={<CheckIcon />} onClick={(e) => editTutor(e,selectedRow.user_type,selectedRow.user_id)} style={{width:'50%'}}>Save</Button>
          </Box>
        </Modal>        


        <Card>
          <TutorListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TutorListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tutors.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                
                  {filteredUsers.map((tutor) => (
                      <TableRow hover key={tutor.user_id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox onChange={(event) => handleClick(event, tutor.user_fname)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
      
                            <Typography variant="subtitle2" p={2}>
                              {tutor.user_fname}
                            </Typography>
                        
                        </TableCell>
                        <TableCell align="left">{tutor.user_lname}</TableCell>

                        <TableCell align="left">{tutor.user_email}</TableCell>

                        <TableCell align="left">{tutor.user_phone}</TableCell>

                        <TableCell align="center">
                          {tutor.tutor_worked_hrs}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleTutor(event, tutor)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
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
            count={tutors.length}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={editFunctions}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
