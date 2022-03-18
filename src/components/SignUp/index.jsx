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

import './style.css';

const SignUp = ({setLogin,setSignup}) => {
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

    const [showPwd, setShowPwd] = useState(false);

    const [signingup,setSigningup] = useState(false);

    const handleClose = (e) =>{
        e.preventDefault();
        setSignup(false);

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
        if(!validateForm()){
            return;
        }
        // setLoggin(true);
        // setTimeout(()=>{
        //     postLogin();
        // },1000);
    };


    return (
        <div className='signup'>
            <div className="scross">
                <CloseIcon
                style={{ color: "grey", fontSize: "30px" }}
                onClick={handleClose}
                />
            </div>
            <div className="sutitle">Sign Up</div>
            <div className="suinput">
            
            <TextField
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
            setSignup(false);
            setLogin(true);
          }}>Sign In</div>
        </div>
      </div>
        </div>
    );
}
 
export default SignUp;