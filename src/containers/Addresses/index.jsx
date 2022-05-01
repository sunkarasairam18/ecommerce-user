import React,{ useEffect,useState } from 'react';
import './style.css';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { axiosInstance } from '../../api/axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import AddPop from './AddPop';
import box from '../../images/pin.png';

const Addresses = () => {
    const [addresList,setList] = useState([]);
    const [showPop,setPop] = useState(false);
    const [edititem,setEitem] = useState();
    const [circle,setCir] = useState(true);


    useEffect(()=>{
        if(!showPop){
            setEitem();
        }
    },[showPop]);

    useEffect(()=>{
        setTimeout(()=>setCir(false),1000);
    },[]);


    const getList = async () =>{
        try{
            const res = await axiosInstance.get("/address/get");
            if (res.status === 200) {
                setList(res.data);    
            }else setList([]);
        }catch(err){
            setList([]);
        }
    };

    useEffect(()=>{
        getList();
    },[]);

    const properStr = (s)=>{
        return s.length>70?s.slice(0,70)+"...":s;
    }

    return ( 
        <div className="addresses">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showPop}
                >
                {showPop && <AddPop color="inherit" setPop={setPop} address={edititem}  setList={setList}/>}
            </Backdrop>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={circle}
                >
                <CircularProgress size="6rem" color="inherit" />
            </Backdrop>
            <div className="addressesbox">
                <div className="addrestitle">
                    <div style={{fontSize:"30px",fontWeight:"600"}}>
                        Your Addresses
                    </div>
                    <Button variant="outlined" startIcon={<AddIcon />} style={{height:"fit-content",textTransform:"none"}} onClick={()=>setPop(true)}>
                        Add address
                    </Button>
                </div>
                <div className={addresList.length>0?"addreslist":'noaddress'}>
                    {addresList.length>0?addresList.map(({name,mobileNumber,address,locality,cityDistrictTown,state,pinCode,_id}) => 
                        <div className='additem' key={_id} onClick={()=>{
                            setEitem({name,mobileNumber,address,locality,cityDistrictTown,state,pinCode,_id});
                            setPop(true);
                        }}>
                            <div className="addititle">
                                {`${name}, ${mobileNumber}`}
                            </div>
                            <div className="addiaddres">
                                {properStr(`${address},${locality},${cityDistrictTown},${state} - ${pinCode}`)}
                            </div>
                        </div>
                    ):(<div style={{height:"200px",display:"grid",placeItems:"center",border:"1px solid lightgrey",borderRadius:"10px",paddingLeft:"30px",paddingRight:"30px"}}>
                       <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px"}}>
                           
                            <img src={box} alt="pin" style={{height:"80px",width:"80px"}}/>
                            <div style={{fontWeight:"600",fontSize:"30px",marginTop:"15px"}}>No Addresses to show</div>
                       </div>
                    </div>)}
                </div>
            </div>
        </div>
     );
}
 
export default Addresses;