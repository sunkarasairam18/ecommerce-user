import React, { useState } from "react";
import "./style.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { CSSTransition } from "react-transition-group";
import { axiosInstance } from "../../api/axios";
import "../../common.css";
import { useDispatch } from "react-redux";
import { setToast, closeToast, signInUser } from "../../Store/reducer";

const SignIn = ({ setLogin, show }) => {
  const [email, setEmail] = useState("sairam@gmail.com");
  const [showPwd, setShowPwd] = useState(false);
  const [logging, setLoggin] = useState(false);
  const [password, setPwd] = useState("@ab17@vk1");
  const [errEmail, setErrEmail] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const dispatch = useDispatch();

  const handleClose = () =>{
      
      setLogin(false);
      setEmail("");
      setShowPwd(false);
      setLoggin(false);
      setPwd("");
      setErrEmail("");
      setErrPwd("");
  };

  const validateForm = () =>{
      setErrEmail("");
      setErrPwd("");
    if(email.trim() === ""){
        setErrEmail("Please Enter Email");
        return false;
    }else if(password.trim() === ""){
        setErrPwd("Please Enter Password");
        return false;
    }else return true;
    // setErrPwd("Please Enter Password");
    // return false;
  };

  const postLogin = async () =>{
    try {
        const res = await axiosInstance.post("/user/role/signin", {
          email: email.trim(),
          password: password.trim(),
        });
  
        if (res.status === 200) {
          const { _id, userName, email, role } = res.data;
  
          localStorage.setItem("token", res.headers["x-auth-token"]);
          const userData = {
            _id,
            userName,
            email,
            role,
            token: res.headers["x-auth-token"],
          };
          dispatch(signInUser(userData));
          dispatch(setToast({msg:"Signed In",severity:"success"}));
          setLoggin(false);
          handleClose();
  
          // navigate('/');
        } 
        // else if (res.status === 401 || res.status === 403) {
        //     // dispatch(setToast({msg:"Category Added",severity:"success"}));
        //     setErrEmail("Invalid Email or Password");
        //   }else if(res.status === 500){
        //     handleClose();
        //   }
        else{
            setErrEmail("Loggedin");
        }
      } catch (error) {
        //   handleClose();
        const {response,request} = error;
        if (response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            
            if(response.status === 401 || response.status === 403){
                // dispatch(setToast({msg:"Somethi",severity:"success"}));
                setLoggin(false);
                setErrEmail("Invalid Email or Password");    
            }else if(response.status === 500){
                handleClose();
                dispatch(setToast({msg:"Something Went Wrong,Try Later!",severity:"error"}));
            }

          } else if (request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            handleClose();
            dispatch(setToast({msg:"Something Went Wrong,Try Later!",severity:"error"}));
          } else {
            // Something happened in setting up the request that triggered an Error
            handleClose();
           dispatch(setToast({msg:"Something Went Wrong,Try Later!",severity:"error"}));
       }
          
      }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if(!validateForm()){
        return;
    }
    setLoggin(true);
    setTimeout(()=>{
        postLogin();
    },1000);
  };

  return (
    // <CSSTransition in={show} timeout={800} unmountOnExit classNames="standard_transition">
    <div className="signin">
      <div className="scross">
        <CloseIcon
          style={{ color: "grey", fontSize: "30px" }}
          onClick={handleClose}
        />
      </div>
      <div className="stitle">Sign In</div>
      <div className="sinput">
        <TextField
          id="outlined-basic"
          error={errEmail !== ""}
          helperText={errEmail}
          sx={{ m: 1, width: "85%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Enter Email Address"
          variant="outlined"
        />
        <FormControl
         sx={{ m: 1, width: "85%" }} 
         variant="outlined"
         
         >
          <InputLabel
            error={errPwd !== ""}
            htmlFor="outlined-adornment-password"
          >
            Enter Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPwd ? "text" : "password"}
            value={password}
            error={errPwd !== ""}
            aria-describedby="component-error-text"
            onChange={(e) => setPwd(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPwd(!showPwd)}
                  onMouseDown={(e) => e.preventDefault}
                  edge="end"
                >
                  {showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Enter Password"
          />
          {errPwd !== "" && <FormHelperText error={errPwd !== ""} id="component-error-text">{errPwd}</FormHelperText>}
        </FormControl>
      </div>
      <div className="ssubmit">
        <Box sx={{ m: 1, position: "relative", width: "85%" }}>
          <Button
            variant="contained"
            disabled={logging}
            sx={{ textTransform: "none", width: "100%", fontSize: 16 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {logging && (
            <CircularProgress
              size={24}
              sx={{
                color: "green",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </div>
      <div className="presssignup">
        <div className="psin">
          <div className="psacc">Don't have an account?</div>
          <div className="psbtn">Sign Up</div>
        </div>
      </div>
    </div>
    // </CSSTransition>
  );
};

export default SignIn;
