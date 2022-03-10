import React,{useState} from 'react';
import './style.css';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { Box } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';
import { CSSTransition } from 'react-transition-group';
import '../../common.css';

const SignIn = ({setLogin,show}) => {
    const [email,setEmail] = useState("");
    const [showPwd,setShowPwd] = useState(false);
    const [logging,setLoggin] = useState(false);
    const [password,setPwd] = useState("");

    return ( 
        // <CSSTransition in={show} timeout={800} unmountOnExit classNames="standard_transition">
        <div className='signin'>
            <div className="scross">
                <CloseIcon style={{color:"grey",fontSize:"30px"}} onClick={()=>setLogin(false)}/>
            </div>
            <div className="stitle">
                Sign In
            </div>
            <div className="sinput">
                <TextField id="outlined-basic" sx={{ m: 1, width: '85%' }} value={email} onChange={e=>setEmail(e.target.value)} label="Enter Email Address" variant="outlined" />
                <FormControl sx={{ m: 1, width: '85%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Enter Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e)=>setPwd(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>setShowPwd(!showPwd)}
                        onMouseDown={e=>e.preventDefault}
                        edge="end"
                        >
                        {showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Enter Password"
                />
                </FormControl>
            </div>
            <div className="ssubmit">
                <Box sx={{ m:1, position: 'relative',width:"85%" }}>
                <Button
                variant="contained"
                disabled={logging}
                
                sx={{textTransform: 'none',width:"100%",fontSize: 16}}
                // onClick={handleSubmit}
                >
                Sign In
                </Button>
                {logging && (
                <CircularProgress
                    size={24}
                    sx={{
                    color: "green",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                    }}
                />
                )}
                </Box>
            </div>
            <div className='presssignup'>
                <div className="psin">
                    <div className='psacc'>Don't have an account?</div>
                    <div className="psbtn">
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
        // </CSSTransition>
    );
}
 
export default SignIn;