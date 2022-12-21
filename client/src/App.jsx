import ThemeProvider from "./theme";
import Header from "./components/header/Header";
import Nav from "./components/nav";
import ScrollToTop from "./components/scroll-to-top";
import TutorPage from "./pages/TutorPage";
import HomePage from "./pages/HomePage";
import PackagePage from "./pages/PackagePage";
import StudentPage from "./pages/StudentPage";
import SessionPage from "./pages/SessionPage";
import HandoutPage from "./pages/HandoutPage";


import { useState } from "react";
import { BrowserRouter, Outlet, Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider>
      <HelmetProvider>
        <StyledRoot>
          <ScrollToTop />
          <Header onOpenNav={() => setOpen(true)} />
          <Nav openNav={open} onCloseNav={() => setOpen(false)} />
          <Main>
            <Routes>
              <Route path="/" element = {<HomePage/>}/>
              <Route path="/home" element = {<HomePage/>}/>
              <Route path="/tutors" element ={<TutorPage />}/>  
              <Route path="/packages" element ={<PackagePage />}/>
              <Route path="/students" element ={<StudentPage />}/> 
              <Route path="/session" element ={<SessionPage />}/>      
              <Route path="/handout" element ={<HandoutPage />}/>                                                                                                
            </Routes>
          </Main>
        </StyledRoot>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
