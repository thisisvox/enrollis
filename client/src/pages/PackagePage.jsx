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
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  ListItemText
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { PackageListHead, PackageListToolbar } from "../sections/Package";
// mock
//import PackageList from '../_mock/user';
import moment from "moment-timezone";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Type", alignRight: false },
  { id: "company", label: "Test", alignRight: false },
  { id: "role", label: "Price", alignRight: false },
  { id: "isVerified", label: "N° Sessions", alignRight: false },
  { id: "sdate", label: "Start Date", alignRight: false },
  { id: "edate", label: "End Date", alignRight: false },
  { id: "days", label: "Days", alignRight: false },
  { id: "stime", label: "Start Time", alignRight: false },
  { id: "etime", label: "End Time", alignRight: false },
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
  paddingTop: 3,
  paddingBottom: 5
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
        item.pack_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.test_title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PackagePage() {
  const [openm, setOpenm] = useState(false);
  const handleOpen = () => setOpenm(true);
  const handleClose = () => setOpenm(false);
  const navigate = useNavigate();

  const [packageForm, setPackageForm]= useState({
    pack_type: '', test_title: '', pack_price: '', pack_n_session: '', pack_sdate: dayjs(), pack_edate: dayjs(),  pack_days: [], pack_stime: dayjs(), pack_etime: dayjs()
  });
  /*
  const[type, setType]=useState("");
  const[title, setTitle]=useState("");
  const[price, setEmail]=useState("");
  const[sessions, setSessions]=useState("");
  const[sdate, setSdate]=useState("");
  const[edate, setEdate]=useState("");
  const[days, setDays]=useState("");
  const[sTime, setStime]=useState("");
  const[eTime, setEtime]=useState("");*/

  const [packages, setPackages] = useState([]);
  const getPackages = async () => {
    try {
      const response = await fetch("http://164.92.200.193:5000/api/package");
      const jsonData = await response.json();
      setPackages(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showSessions = async (id) => {
    try {
      setOpen(false);
      navigate("/session", { state: { pack_id: id } });
    } catch (error) {
      console.error(error.message);
    }
  };
  const addPackage = async e => {
    console.log(packageForm.pack_type)
    e.preventDefault();
try {
    const body = {pack_type: packageForm.pack_type, 
        test_title: packageForm.test_title, 
        pack_price: packageForm.pack_price, 
        pack_n_session: packageForm.pack_n_session, 
        pack_sdate: packageForm.pack_sdate, 
        pack_edate: packageForm.pack_edate, 
        pack_days: packageForm.pack_days.toString(), 
        pack_stime: packageForm.pack_stime, 
        pack_etime: packageForm.pack_etime};
    const response = await fetch ("http://164.92.200.193:5000/api/package", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    console.log(packageForm.pack_price)
    window.location="/packages";
} catch (error) {
    console.error(error.message);
}
};
const deletePackage = async (id) => {
  try {
    setOpen(false);
    const response = await fetch(`http://164.92.200.193:5000/api/package/${id}`, {
      method: "DELETE",
    });
    setPackages(packages.filter(package1 => package1.pack_id !== id));
    // window.location = "/tutors";
  } catch (error) {
    console.error(error.message);
  }
};



  useEffect(() => {
    getPackages();
  }, []);
  const [open, setOpen] = useState(false); 

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
      const newSelecteds = packages.map((package1) => package1.pack_type);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - packages.length) : 0;

  const filteredUsers = applySortFilter(
    packages,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleFormOnChange = (key, value) => {
    setPackageForm({...packageForm, [key]: value})
    console.log(packageForm)
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  'M',
  'T',
  'W',
  'R',
  'F',
  'S',
  'U'
];
  

const handleSdateChange = (newValue) => {
  handleFormOnChange('pack_sdate', newValue);
};

const handleEdateChange = (newValue) => {
  handleFormOnChange('pack_edate', newValue);
};

const handleStimeChange = (newValue) => {
  handleFormOnChange('pack_stime', newValue);
};

const handleEtimeChange = (newValue) => {
  handleFormOnChange('pack_etime', newValue);
};

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    handleFormOnChange('pack_days', (typeof value === 'string' ? value.split(',') : value));
  };

  return (
    <>
      <Helmet>
        <title> Package | Enrollis </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Packages
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill"/>} onClick={handleOpen}>
            New Package
          </Button>
        </Stack>

        <Modal
          open={openm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} position="absolute" >
            <Typography id="modal-modal-title" variant="h6" component="h2" mb={1} sx={{position:'sticky'}}>
              Add Package
            </Typography>
            <Divider style={{width:'100%'}}/>

            <Box style={{maxHeight: 500, overflow: 'auto', width: '100%', paddingTop: 280}} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Stack spacing={4} mt={5} mb={5} sx={{ width: '80%' }} >
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">Package Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Package Type"
                    value={packageForm.pack_type} onChange={e=>{handleFormOnChange('pack_type',e.target.value)}}
                  >
                    <MenuItem value={"Gold"}>Gold</MenuItem>
                    <MenuItem value={"Silver"}>Silver</MenuItem>
                    <MenuItem value={"Economic"}>Economic</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">Test Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Test Title" 
                    value={packageForm.test_title} onChange={e=>{handleFormOnChange('test_title',e.target.value)}}
                  >
                    <MenuItem value={"IELTS"}>IELTS</MenuItem>
                    <MenuItem value={"ACT"}>ACT</MenuItem>
                    <MenuItem value={"SAT"}>SAT</MenuItem>
                    <MenuItem value={"TOEFL"}>TOEFL</MenuItem>
                    <MenuItem value={"TOEIC"}>TOEIC</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size='small'>
                  <InputLabel htmlFor="outlined-adornment-amount">Package Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">MAD</InputAdornment>}
                    label="Package Price"
                    value={packageForm.pack_price} onChange={e=>{handleFormOnChange('pack_price',e.target.value)}}
                  />
                  </FormControl>
                  <TextField
                    id="outlined-number"
                    label="Number of Sessions"
                    type="number" size='small'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={packageForm.pack_n_session} onChange={e=>{handleFormOnChange('pack_n_session',e.target.value)}}
                  />
                  <FormControl size='small'>
                    <InputLabel id="demo-multiple-checkbox-label">Days</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={packageForm.pack_days}
                      onChange={handleChange}
                      input={<OutlinedInput label="Days" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          <Checkbox checked={packageForm.pack_days.indexOf(day) > -1} />
                          <ListItemText primary={day} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/DD/YYYY"
                        value={packageForm.pack_sdate}
                        onChange={handleSdateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <DesktopDatePicker
                        label="End Date"
                        inputFormat="MM/DD/YYYY"
                        value={packageForm.pack_edate}
                        onChange={handleEdateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker
                        label="Start Time"
                        value={packageForm.pack_stime}
                        onChange={handleStimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker
                        label="End Time"
                        value={packageForm.pack_etime}
                        onChange={handleEtimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </Stack>
            <Button variant="contained" startIcon={<CheckIcon />} style={{width:'50%'}} onClick={addPackage}>Save</Button>
            </Box>
            
          </Box>
        </Modal>

        <Card>
          <PackageListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PackageListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={packages.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.map((package1) => (
                    <TableRow
                      hover
                      key={package1.pack_id}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={(event) =>
                            handleClick(event, package1.pack_type)
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Typography variant="subtitle2" p={2}>
                          {package1.pack_type}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{package1.test_title}</TableCell>

                      <TableCell align="left">{package1.pack_price}</TableCell>

                      <TableCell align="center">
                        {package1.pack_n_session}
                      </TableCell>
                      <TableCell align="left">
                        {moment(package1.pack_sdate).format("MMM D, YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(package1.pack_edate).format("MMM D, YYYY")}
                      </TableCell>

                      <TableCell align="left">{package1.pack_days}</TableCell>
                      <TableCell align="left">{moment(package1.pack_stime).format("hh:mm A")}</TableCell>
                      <TableCell align="left">{moment(package1.pack_etime).format("hh:mm A")}</TableCell>

                      <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleTest(event, package1)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
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
            count={packages.length}
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
        <MenuItem onClick= {() => showSessions(selectedRow.pack_id)}>  
          <Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
          View Sessions
        </MenuItem>

        <MenuItem onClick={handleOpen}> 
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick= {() => deletePackage(selectedRow.pack_id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
