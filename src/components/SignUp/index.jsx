import React,{useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Joi from "joi-browser";
import { useDispatch } from 'react-redux';

import { axiosInstance } from '../../api/axios';
import { setToast, signInUser,setShowSignIn,setShowSignUp } from "../../Store/reducer";
import './style.css';

const SignUp = () => {
    const [fullName,setFullname] = useState("");
    const [userName,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPwd] = useState("");
    const [phNo,setPhno] = useState("");

    const [errFullName,setErrFN] = useState("");
    const [errUserName,setErrUN] = useState("");
    const [errEmail,setErrE] = useState("");
    const [errPwd,setErrP] = useState("");
    const [errPhno,setErrPh] = useState("");

    const [error,setError] = useState({

    });

    const [showPwd, setShowPwd] = useState(false);

    const [signingup,setSigningup] = useState(false);

    const dispatch = useDispatch();
    const schema = {
      fullName: Joi.string().required().label("Full Name"),
      userName: Joi.string().required().label("User Name"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().min(8).required().label("Password"),
      phoneNo: Joi.string().length(10).required().label("Phone Number")
    }

    const handleClose = () =>{
        
      dispatch(setShowSignUp(false));

    };

    const validateFormProper = () =>{
      const form = {};
      form["fullName"] = fullName;
      form["userName"] = userName;
      form["email"] = email;
      form["password"] = password;
      form["phoneNo"] = phNo;
      const {error} = Joi.validate(form,schema);
      if(error){
        let err = {};
        for(let item of error.details) err[item.path[0]] = item.message;
        setError(err);
        return false;
      }
      return true;
    };

    const validateForm = () =>{
        setErrFN("");
        setErrUN("");
        setErrE("");
        setErrP("");
        setErrPh("");
        
        if(fullName.trim() === ""){
            setErrFN("Please Enter Full name");
            return false;
        }
        else if(userName.trim() === ""){
            setErrUN("Please Enter User name");
            return false;
        }
        else if(email.trim() === ""){
            setErrE("Please Enter Email");
            return false;
        }else if(password.trim() === ""){
            setErrP("Please Enter Password");
            return false;
        }else if(phNo.trim() === ""){
            setErrPh("Please Enter Phone Number");
        }
        else return true;
      
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if(!validateFormProper()){
            return;
        }
        setSigningup(true);
        setTimeout(()=>{
            postLogin();
        },1000);
    };


    const postLogin = async () =>{
      try {
          const res = await axiosInstance.post("/user/signup", {
            fullName: fullName.trim(),
            userName: userName.trim(),            
            email: email.trim(),
            password: password.trim(),
            contactNumber: phNo.trim(),
            role: "user"
          });
    
          if (res.status === 201) {
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
            setSigningup(false);
            handleClose();
            dispatch(setToast({msg:"Account created",severity:"success"}));
            
    
            // navigate('/');
          } 
          // else if (res.status === 401 || res.status === 403) {
          //     // dispatch(setToast({msg:"Category Added",severity:"success"}));
          //     setErrEmail("Invalid Email or Password");
          //   }else if(res.status === 500){
          //     handleClose();
          //   }
          // else{
          //     setErrEmail("Loggedin");
          // }
        } catch (error) {
          //   handleClose();
          const {response,request} = error;
          if (response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              
              if(response.status === 403){
                  // dispatch(setToast({msg:"Somethi",severity:"success"}));
                  if(response.data === "existed"){
                    setError({"email":"Account Already Existed"});
                  }else{
                    dispatch(setToast({msg:"Invalid Credentials",severity:"error"}));
                  }
                  setSigningup(false);
                  // setErrEmail("Invalid Email or Password");    
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

    return (
        <div className='signup'>
            <div className="scross">
                <CloseIcon
                style={{ color: "grey", fontSize: "30px" }}
                onClick={()=>handleClose()}
                />
            </div>
            <div className="sutitle">Sign Up</div>
            <div className="suinput">
            
            {/* <TextField
                id="outlined-basic"
                error={errFullName !== ""}
                helperText={errFullName}
                sx={{ m: 1, width: "85%"}}
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                label="Enter Full name"
                variant="outlined"
                size="small"
            />
            <TextField
                id="outlined-basic"
                error={errUserName !== ""}
                helperText={errUserName}
                sx={{ m: 1, width: "85%" }}
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                label="Enter User name"
                variant="outlined"
                size="small"
            />
            <TextField
                id="outlined-basic"
                error={errEmail !== ""}
                helperText={errEmail}
                sx={{ m: 1, width: "85%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Enter Email Address"
                variant="outlined"
                size="small"
            />
            <FormControl sx={{ m: 1, width: "85%" }} variant="outlined" size="small">
                <InputLabel error={errPwd !== ""} htmlFor="outlined-adornment-password">Enter Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    error={errPwd !== ""}
                    onChange={(e) => setPwd(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPwd(!showPwd)}
                        onMouseDown={(e) => e.preventDefault()}
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
            <TextField
                id="outlined-basic"
                error={errPhno !== ""}
                helperText={errPhno}
                sx={{ m: 1, width: "85%" }}
                value={phNo}
                onChange={(e) => setPhno(e.target.value)}
                label="Enter Phone Number"
                variant="outlined"    
                type="tel"   
                size="small"         
            /> */}

            <TextField
              id="outlined-basic"
              error={error.fullName}
              helperText={error.fullName}
              sx={{ m: 1, width: "85%"}}
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              label="Enter Full name"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              error={error.userName}
              helperText={error.userName}
              sx={{ m: 1, width: "85%" }}
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              label="Enter User name"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              error={error.email}
              helperText={error.email}
              sx={{ m: 1, width: "85%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Enter Email Address"
              variant="outlined"
              size="small"
            />
            <FormControl sx={{ m: 1, width: "85%" }} variant="outlined" size="small">
                <InputLabel error={error.password} htmlFor="outlined-adornment-password">Enter Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    error={error.password}
                    onChange={(e) => setPwd(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPwd(!showPwd)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        >
                        {showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Enter Password"
                    />
                   {error.password && <FormHelperText error={error.password} id="component-error-text">{error.password}</FormHelperText>}
            </FormControl>
            <TextField
                id="outlined-basic"
                error={error.phoneNo}
                helperText={error.phoneNo}
                sx={{ m: 1, width: "85%" }}
                value={phNo}
                onChange={(e) => setPhno(e.target.value)}
                label="Enter Phone Number"
                variant="outlined"    
                type="tel"   
                size="small"         
            />
            </div>
            <div className="ssubmit">
        <Box sx={{ m: 1, position: "relative", width: "85%" }}>
          <Button
            variant="contained"
            disabled={signingup}
            sx={{ textTransform: "none", width: "100%", fontSize: 16 }}
            onClick={handleLogin}
          >
            Sign Up
          </Button>
          {signingup && (
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
          <div className="psacc">Already have an account?</div>
          <div className="psbtn" onClick={()=>{
            dispatch(setShowSignUp(false));
            dispatch(setShowSignIn(true));
          }}>Sign In</div>          
        </div>
      </div>
        </div>
    );
}
 
export default SignUp;