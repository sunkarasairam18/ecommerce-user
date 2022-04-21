import React,{ useState } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosInstance } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setToast } from '../../Store/reducer';


const AddPop = ({setPop,address,setList}) => {
    const [saving,setSave] = useState(false);
    const [name,setName] = useState(address?address.name:"First Address");
    const [phNo,setPhno] = useState(address?address.mobileNumber:"9949672549");
    const [pincode,setPincode] = useState(address?address.pinCode:"520007");
    const [loc,setLoc] = useState(address?address.locality:"24-11 Yanamalakuduru");
    const [addr,setAddr] = useState(address?address.address:"Yanamalakuduru Near Panchayat office");
    const [city,setCity] = useState(address?address.cityDistrictTown:"Vijayawada");
    const [state,setStat] = useState(address?address.state:"Andhra Pradesh");

    const dispatch = useDispatch();

    const addAddress = () =>{
        setSave(true);
        setTimeout(async () =>{

            try{
                const item = {
                    address:{
                        name: name,
                        mobileNumber: phNo,
                        pinCode: pincode,
                        locality: loc,
                        address: addr,
                        cityDistrictTown: city,
                        state: state
                    }
                };
                if(address && address._id) item.address["_id"] = address._id;
                const res = await axiosInstance.post('/address/add',item);
                if (res.status === 201) {
                    setList(res.data);
                    dispatch(setToast({msg:`Address ${(address && address._id)?"Updated!":"Saved"}`,severity:"success"}));
                    
                    // setSave(false);
                    setPop(false);
                    return;
                }else {
                    dispatch(setToast({msg:`Something Went Wrong,Try later!`,severity:"error"}));
                    setPop(false);
                }
    
            }catch(err){
                dispatch(setToast({msg:`Something Went Wrong,Try later!`,severity:"error"}));
                setPop(false);
                console.log("error : ",err);
            }
        },500);
    };


    return ( 
        <div style={{height:"400px",width:"500px",backgroundColor:"white",borderRadius:"5px",display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:"20px"}}>
            <div style={{width:"100%",height:"40px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"10px",color:"black"}}>
                    <h2>{`${address?"Edit":"Enter"} Address`}</h2>
                    <CloseIcon style={{color:"black",cursor:"pointer",fontSize:"28px",marginRight:"-20px"}} onClick={()=>setPop(false)}/>
                </div>
                
            </div>
            <div style={{width:"90%",marginTop:"15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <TextField label="Name" variant="filled" style={{width:"48%"}} value={name} onChange={(e)=>setName(e.target.value)}/>
                    <TextField label="Mobile Number" variant="filled" style={{width:"48%"}} value={phNo} onChange={(e)=>setPhno(e.target.value)}/>
                </div>
            </div>
            <div style={{width:"90%",marginTop:"15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <TextField label="Pincode" variant="filled" style={{width:"48%"}} value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                    <TextField label="Locality" variant="filled" style={{width:"48%"}} value={loc} onChange={(e)=>setLoc(e.target.value)}/>
                </div>
            </div>
            <div style={{width:"90%",marginTop:"15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <TextField label="Address" variant="filled" style={{width:"100%"}} value={addr} onChange={(e)=>setAddr(e.target.value)}/>
                </div>
            </div>
            <div style={{width:"90%",marginTop:"15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <TextField label="City/District/Town" variant="filled" style={{width:"48%"}} value={city} onChange={(e)=>setCity(e.target.value)}/>
                    <TextField label="State" variant="filled" style={{width:"48%"}} value={state} onChange={(e)=>setStat(e.target.value)}/>
                </div>
            </div>
            <div style={{width:"90%",marginTop:"20px"}}>
                {/* <Button variant="outlined">Outlined</Button> */}
                <Box sx={{ position: "relative", width: "40%" }}>
                    <Button
                        variant="contained"
                        disabled={saving}
                        sx={{ width: "100%",height:"35px",textTransform:"none",fontSize:'20px' }}  
                        onClick={()=>addAddress()}                                          
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
 
export default AddPop;