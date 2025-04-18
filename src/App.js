import React, { useEffect, useState } from "react"
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import "./App.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import Login from "./components/Login";
import SignUp from "./components/Signup";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("userInfo");
  const [open, setOpen] = React.useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleLogout = () => {
    localStorage.clear()
  };

  const handleCancelLogout = (e) => {
    e.preventDefault();

    setOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <AppBar position='static'
          style={{ backgroundColor: "cyan", color: "black", }}>
          <Toolbar>
            <Typography variant='h6' style={{ flexZGrow: 1 }}>
              InGENUIOS NOTES APP
            </Typography>
            {isLoggedIn ? (
              <>
                <Button colcor="inherit" onClick={handleClickOpen}>
                  Logout
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <div className="dialog-class">
                    <DialogTitle>Are tou sure you want to logout</DialogTitle>
                    <form className="form-class">
                      {" "}
                      <div className="two-btns">
                        <button type="submit" className="add" onClick={handleLogout}>
                          YES
                        </button>
                        <button type="submit" className="add del" onClick={handleCancelLogout}>
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
                  <Button color="inherit" style={{ color: "black", fontSize: "21PX" }}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button color="inherit" style={{ color: "black", fontSize: "21PX" }}>
                    Signup

                  </Button>
                </Link>
              </>
            )}
          </Toolbar>{" "}
        </AppBar>
        <div style={{ marginTop: "5vh" }}>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>

        </div>
      </BrowserRouter>
    </>
  )

}


export default App;