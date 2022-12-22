import { Box, Container, Divider, Stack, TextField, Typography, Button, Grid } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';

const style = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  borderRadius: 2,
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 5,
};

function ProfilePage() {
  const [edit, setEdit]=useState(true);
  const value = edit ? "Edit Profile" : "Save";
  const[fname, setFname]=useState("Salma");
  const[lname, setLname]=useState("Zahidi");
  const[email, setEmail]=useState("Sa.Zahidi@aui.ma");
  const[phone, setPhone]=useState("+212684523698");

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }
  
  return (
    <>
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <Stack alignItems="center" justifyContent="space-between" width="100%" spacing={3}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
    <Box sx={style}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} align="center" justify="center">
              <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                label="First Name"
                value={fname}
                onChange={e=> setFname(e.target.value)}
                
                InputProps={{
                  readOnly: edit,
                }}
                style={{width:'60%'}}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                label="Last Name"
                value={lname}
                onChange={e=> setLname(e.target.value)}
                
                InputProps={{
                  readOnly: edit,
                }}
                style={{width:'60%'}}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                label="Email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                
                InputProps={{
                  readOnly: edit,
                }}
                style={{width:'60%'}}
              />
              </Grid>
              <Grid item xs={12}>
              <MuiTelInput 
              defaultCountry='MA' 
              label='Phone Number' 
              
              value={phone} 
              onChange={handleChange}
              InputProps={{
                readOnly: edit,
              }} 
              style={{width:'60%'}}/>
              </Grid>
            </Grid>
  
          </Box>
          <Button variant="contained" startIcon={edit ? <CreateIcon /> : <CheckIcon/>} onClick={()=> {edit ? setEdit(false) : setEdit(true)}} style={{marginTop : 35}}>
            {value}
          </Button>
          </Stack>
    </Container>
    </>
  )
}

export default ProfilePage