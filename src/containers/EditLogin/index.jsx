import React,{useState,useEffect} from 'react';
import './style.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setUpdatedUser,setToast } from '../../Store/reducer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const EditLogin = () => {
    const [saving,setSave] = useState(false);
    const navigate = useNavigate();
    const [fullName,setFn] = useState("");
    const [userName,setUn] = useState("");
    const [email,setEmail] = useState("");
    const [oldPwd,setOp] = useState("");
    const [newPwd,setNp] = useState("");
    const [renPwd,setRnp] = useState("");
    const [phNo,setPhno] = useState("");
    const dispatch = useDispatch();
    const [newPhelper,setNph] = useState("");
    const [oldPhelper,setOph] = useState("");

    const [circle,setCir] = useState(true);

    useEffect(()=>{
        setTimeout(()=>setCir(false),1000);
    },[]);

    const getProfile = async() =>{
        try{
            const res = await axiosInstance.get('/user/fullprofile');
            if(res.status === 200){
                const {fullName,userName,email,contactNumber} = res.data;
                setFn(fullName);
                setUn(userName);
                setEmail(email);
                setPhno(contactNumber);
            }            
        }catch(err){
            console.log(err);
        }
    };
    const saveChanges = async () =>{
        setSave(true);
        setTimeout(async () =>{
            try{
                if(newPwd.trim() !== renPwd.trim()){
                   
                    setNph("New Passwords are mismatched");
                    setSave(false);
                    return;
                }
                if(newPwd.trim() && renPwd.trim() && newPwd.trim() === renPwd.trim()){
                    if(!oldPwd){
                        
                        setOph("Enter Old Password");
                        setSave(false);
                        return;
                    }
                }
                
                let ob = {
                    fullName: fullName,
                    userName: userName,
                    email: email,
                    oldPwd: oldPwd,
                    newPwd: newPwd,
                    contactNumber: phNo
                }
                const res = await axiosInstance.post('/user/account/update',ob);
                if(res.status === 200){
                    dispatch(setUpdatedUser(res.data));
                    dispatch(setToast({msg:`Profile Updated`,severity:"success"}));
                    setSave(true);
                }else{
                    dispatch(setToast({msg:`Something went wrong.Try later!`,severity:"error"}));
                }
                setTimeout(()=>{
                    navigate('/account');
                },500);
    
            }catch(err){
                dispatch(setToast({msg:`Something went wrong.Try later!`,severity:"error"}));
                navigate('/account');
            }
        },500);
    }

    useEffect(()=>{
        getProfile();
    },[]);


    return (
        <div className='editlogin'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={circle}
                >
                <CircularProgress size="6rem" color="inherit" />
            </Backdrop>
            <div className="elbox">
            <div style={{fontSize:"30px",fontWeight:"600"}}>{"Login & Security"}</div>
            <TextField label="Full Name" value={fullName} variant="filled" className='eldit' onChange={(e)=>setFn(e.target.value)}/>
            <TextField label="User Name" value={userName} variant="filled" className='eldit' onChange={(e)=>setUn(e.target.value)}/>
            <TextField label="Email" value={email} variant="filled" className='eldit' onChange={(e)=>setEmail(e.target.value)}/>
            <TextField label="Old Password" value={oldPwd} type="password" variant="filled" placeholder='Required for password Change' error={oldPhelper} helperText={oldPhelper} className='eldit' onChange={(e)=>setOp(e.target.value)}/>
            <div style={{display:"flex",width:"100%",justifyContent:"space-between"}} className='eldit'>
                <TextField label="New Password" value={newPwd} type="password" variant="filled" placeholder="For password Change" error={newPhelper} helperText={newPhelper} style={{width:"48%"}} onChange={(e)=>setNp(e.target.value)}/>
                <TextField label="Re-enter New Password" value={renPwd} type="password" variant="filled"  placeholder="For password Change" style={{width:"48%"}} onChange={(e)=>setRnp(e.target.value)}/>
            </div>
            <TextField label="Contact Number" value={phNo} variant="filled" className='eldit' onChange={(e)=>setPhno(e.target.value)}/>
            <Box sx={{ position: "relative", width: "150px" }}>
                    <Button
                        variant="contained"
                        disabled={saving}
                        sx={{ width: "100%",height:"40px",textTransform:"none",fontSize:'20px' }}  
                        onClick={()=>saveChanges()}                                          
                    >
                        Save
                    </Button>
                    {saving && (
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
        </div>
    );
}
 
export default EditLogin;