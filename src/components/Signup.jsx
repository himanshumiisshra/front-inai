import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { registerUser } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hm = useSelector((state) => state.auth);
  console.log(hm);

  useEffect(() => {
    setLoading(hm.isLoading);
  }, [hm]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = {
    email,
    password,
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData)).then((res) => {
      // console.log(res);
      return res;
    });
  };

  useEffect(() => {
    if (hm.isSuccess) {
      toast.success(`${hm.response}`, {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/notePage");
      }, 6000);

      localStorage.setItem("userInfo", JSON.stringify(hm.profile));
    } else {
      if (hm.response !== "") {
        toast.error(`${hm.response}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // }
      }
    }
  }, [hm]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <div>
          <Typography
            component="h1"
            variant="h4"
            textAlign={"center"}
            marginTop={"10vh"}
          >
            {" "}
            SIGNUP
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "gold",
                color: "black",
                marginTop: "4vh",
                marginBottom: "4vh",
                height: "50px",
                fontSize: "19px",
              }}
            >
              Sign Up
            </Button>
            {loading ? (
              <div className="loading-overlay">
                <ReactBootstrap.Spinner
                  animation="border"
                  className="spinner"
                  variant="success"
                />
              </div>
            ) : null}
            <Grid container>
              <Grid item className="link">
                <Link to="/login">Already have an account? logIn</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Signup;