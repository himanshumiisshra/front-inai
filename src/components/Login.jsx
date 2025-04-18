// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { TextField, Button, Grid, Typography, Container } from "@mui/material";
// import { loginUser } from "../Redux/authSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as ReactBootstrap from "react-bootstrap";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const hm = useSelector((state) => state.auth);
//   // console.log(hm);

//   useEffect(() => {
//     setLoading(hm.isLoading);
//   }, [hm]);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const userData = {
//     email,
//     password,
//   };
//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(userData)).then((res) => {
//        console.log(res);
//       return res;
//     });
//   };

//   useEffect(() => {
//     if (hm.isSuccess) {
//       toast.success(`${hm.response}`, {
//         position: "top-right",
//         // theme: "DARK",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       setTimeout(() => {
//         navigate("/notePage");
//       }, 3000);

//       localStorage.setItem("userInfo", JSON.stringify(hm.profile));
//     } else {
//       if (hm.response !== "") {
//         toast.error(`${hm.response}`, {
//           position: "top-right",
//           // theme: "DARK",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         // }
//       }
//     }
//   }, [hm]);
//   return (
//     <>
//       <Container component="main" maxWidth="xs">
//         <div>
//           <Typography
//             component="h1"
//             variant="h4"
//             textAlign={"center"}
//             marginTop={"10vh"}
//           >
//             LOGIN
//           </Typography>
//           <form onSubmit={handleLogin}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               label="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               style={{
//                 backgroundColor: "cyan",
//                 color: "black",
//                 marginTop: "4vh",
//                 marginBottom: "4vh",
//                 height: "50px",
//                 fontSize: "19px",
//               }}
//               disabled={loading}
//             >
//               LOGIN
//             </Button>
//             {loading ? (
//               <div className="loading-overlay">
//                 <ReactBootstrap.Spinner
//                   animation="border"
//                   className="spinner"
//                   variant="success"
//                 />
//               </div>
//             ) : null}
//             <Grid container>
//               <Grid item className="link">
//                 <Link to="/signup">Don't have an account? signup</Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//       <ToastContainer />
//     </>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { loginUser } from "../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, response, profile } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(profile));

      setTimeout(() => {
        navigate("/notePage");
      }, 3000);
    }

    if (isError && response !== "") {
      toast.error(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isSuccess, isError, response, profile, navigate]);

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
            LOGIN
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
                backgroundColor: "cyan",
                color: "black",
                marginTop: "4vh",
                marginBottom: "4vh",
                height: "50px",
                fontSize: "19px",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    variant="dark"
                    style={{ marginRight: "10px" }}
                  />
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </Button>

            <Grid container>
              <Grid item className="link">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
