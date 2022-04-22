import React,{useState,useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import { axiosInstance } from '../../api/axios';
import Button from '@mui/material/Button';

const SelectAddPop = ({close,selAdd,id}) => {

    const [list,setList] = useState([]);
    const [value,setValue] = useState("");

    useEffect(()=>{
        // if(id && list){
        //     for(let i = 0;i<list.length;i++){
        //         if(list[i]._id === id){
        //             setValue(i);
        //             console.log(list[i]._id,id);
        //             return;
        //         }
                
        //     }
        // }
        if(id) setValue(id);
    },[id]);

    const getList = async () =>{
        try{
            const res = await axiosInstance.get("/address/get");
            if (res.status === 200) {
                setList(res.data);    
                console.log(res.data);
            }else setList([]);
        }catch(err){
            setList([]);
        }
    };

    useEffect(()=>{
        getList();
    },[]);

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    //   };

    const ok = () =>{
        for(let i = 0;i<list.length;i++){
            if(list[i]._id === value){
                selAdd(list[i]);
                console.log("Selcted : ",list[i]);
                close(false);
                return;
            }
            
        }
    };

    return ( 
        <div style={{color:"black",width:"350px",backgroundColor:"white",borderRadius:"5px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{fontSize:"20px",marginTop:"10px",fontWeight:"600"}}>Select Address</div>
            <div style={{height:"250px",width:"85%",flexDirection:"column",display:"flex",marginTop:"10px",marginBottom:"10px",overflow:"scroll",paddingLeft:"10px",border:"1px solid lightgrey",borderRadius:"5px"}}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            >
                
                {
                    list.map((e)=>
                        <FormControlLabel key={e._id} value={e._id} control={<Radio />} label={
                        <div style={{margin:"10px"}}>
                            <div style={{fontWeight:"600"}}>
                            {e.name}
                            </div>
                            <div style={{fontSize:"15px",fontWeight:"300"}}>{`${e.address},${e.locality}`}</div>
                        </div>
                        } />
                    )
                }
                {/* <FormControlLabel value={"<h"} control={<Radio />} label={<h1>Female</h1>} />
                <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
            </RadioGroup>

            </div>
            <div style={{width:"90%",display:'flex',justifyContent:"flex-end",marginBottom:"10px"}}>
            <Button variant="outlined" sx={{textTransform:"none"}} onClick={()=>close(false)}>
                Cancel
            </Button>
            <Button variant="outlined" sx={{textTransform:"none",marginLeft:"10px"}} onClick={()=>ok()}>
                Ok
            </Button>
            </div>
        </div>
    );
}
 
export default SelectAddPop;