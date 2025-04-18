import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Dialog, DialogTitle } from "@mui/material";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import NotePage from "./components/NotePage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("userInfo");

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setOpen(false);
    window.location.href = "/login"; // quick navigation after logout
  };

  const handleCancelLogout = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <AppBar position="static" sx={{ backgroundColor: "cyan", color: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            InGENUIOS NOTES APP
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleClickOpen} sx={{ fontSize: "16px" }}>
                Logout
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <div className="dialog-class">
                  <DialogTitle>Are you sure you want to logout?</DialogTitle>
                  <form className="form-class">
                    <div className="two-btns">
                      <button type="submit" className="add" onClick={handleLogout}>
                        YES
                      </button>
                      <button type="button" className="add del" onClick={handleCancelLogout}>
                        NO
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color="inherit" sx={{ color: "black", fontSize: "16px" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit" sx={{ color: "black", fontSize: "16px" }}>
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: "5vh" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/notePage" element={isLoggedIn ? <NotePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
