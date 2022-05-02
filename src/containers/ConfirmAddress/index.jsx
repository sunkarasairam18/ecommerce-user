import React,{useEffect,useState} from 'react';
import './style.css';
import { axiosInstance } from '../../api/axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import SelectAddPop from './SelectAddPop';
import Backdrop from '@mui/material/Backdrop';
import OrderProcess from '../../components/OrderProcess';
import CircularProgress from '@mui/material/CircularProgress';

const ConfirmAddress = () => {
    const [selected,setSelect] = useState({});
    const navigate = useNavigate();
    const [selectPop,setSelPop] = useState(false);
    const [circle,setCir] = useState(false);

    const getSelect = async () =>{
        const res = await axiosInstance.get('/address/get/selectd');
        if(res.status === 200){
            setSelect(res.data);
        }
    };

    useEffect(()=>{
        getSelect();
    },[]);

    const deliverHere = (e) =>{
        e.preventDefault();
        setCir(true);
        setTimeout(()=>{
            navigate('/confirmorder',{state: selected});
        },500);
    }

    return ( 
        <div className='confirmadd'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={selectPop}                
                >
                {selectPop && <SelectAddPop close={setSelPop} selAdd={setSelect} id={selected._id}/>}
            </Backdrop>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={circle}
                >
                <CircularProgress size="6rem" color="inherit" />
            </Backdrop>
            <div className="conaddbox">
                <div className="status">
                    <OrderProcess step={1}/>
                </div>
                <div className="catitle">
                    <div className="catmain">
                        Select a delivery address
                    </div>
                    <div className="cathelp">
                        Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button
                    </div>
                </div>
                <div className="currentadd">
                    <div style={{fontWeight:"700"}}>
                        {`${selected.name}`}
                    </div>
                    <div>
                        {selected.address}
                    </div>
                    <div>
                        {selected.locality}
                    </div>
                    <div>
                        {`${selected.cityDistrictTown},${selected.state}`}
                    </div>
                    <div>
                        {selected.pinCode}
                    </div>
                    <div>
                        {`Phone Number - ${selected.mobileNumber}`}
                    </div>
                    <Button variant="contained" sx={{marginTop:"10px",width:"100%",backgroundColor:"dodgerblue",textTransform:"none",fontSize:"13px"}} onClick={deliverHere}>Deliver to this Address</Button>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Button variant="contained" sx={{marginTop:"10px",width:"48%",backgroundColor:"rgb(88, 170, 251)",textTransform:"none",fontSize:"13px"}} onClick={()=>setSelPop(true)}>Choose</Button>
                        <Button variant="contained" sx={{marginTop:"10px",width:"48%",backgroundColor:"rgb(88, 170, 251)",textTransform:"none",fontSize:"13px"}} onClick={()=>navigate("/account/editaddresses")}>Create</Button>

                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default ConfirmAddress;