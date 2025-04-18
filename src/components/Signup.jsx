import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { registerUser } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootstrap from "react-bootstrap";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, response, profile } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        draggable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(profile));

      setTimeout(() => {
        navigate("/notePage");
      }, 6000);
    } else if (response !== "") {
      toast.error(response, {
        position: "top-right",
        autoClose: 5000,
        draggable: true,
      });
    }
  }, [isSuccess, response, profile, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    dispatch(registerUser({ email, password }));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          marginTop="10vh"
        >
          SIGN UP
        </Typography>
        <form onSubmit={handleSignup}>
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

          {loading && (
            <div className="loading-overlay">
              <ReactBootstrap.Spinner
                animation="border"
                className="spinner"
                variant="success"
              />
            </div>
          )}

          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login">Already have an account? Log In</Link>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Signup;
