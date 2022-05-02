import React,{ useState,useEffect } from 'react';
import './style.css';
import { axiosInstance } from '../../api/axios';
import Order from './Order';

import Ntg from './Ntg';

const YourOrders = () => {
    const [sel,setSel] = useState(1);
    const [bl,setBl] = useState(false);
    const [orders,setOrders] = useState([]);

    const getOrders = async () =>{
        try{
            setBl(true);
            setSel(2);
            setTimeout(async ()=>{
                const res = await axiosInstance.get("/order/get");
                if(res.status === 200){
                    setBl(false);
                    setOrders(res.data);
                }
            },500);
        }catch(err){
            setBl(false);
            setOrders([]);
        }
    };


    const click = (i) =>{
        setBl(true);
        setTimeout(()=>{
            setSel(i);
            setBl(false);
        },300);
    };

    return ( 
        <div className='yourorders'>
            <div className="yoin">
                <div className='yoheader'>
                    Your Orders
                </div>
                <div className='yoselector'>
                    <div className='yosi'>

                        <div className={`chips ${sel==1?"chipselect":""} ${bl?"blur":""}`} onClick={()=>click(1)}>
                            Orders
                        </div>
                        <div className={`chips ${sel==2?"chipselect":""} ${bl?"blur":""}`} onClick={()=>getOrders()}>
                            Not Yet Shipped
                        </div>
                        <div className={`chips ${sel==3?"chipselect":""} ${bl?"blur":""}`} onClick={()=>click(3)}>
                            Cancelled Orders
                        </div>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    {
                        (sel === 1 || sel === 3 || orders.length === 0)?
                        <Ntg text={`${sel===1?"No orders to show":(sel === 3?"No Cancelled Orders":"No Orders To be shipped")}`}/>:
                        (
                            orders.map((order)=><Order order={order} key={order._id}/>)                            
                        )
                    }
                    {/* {
                        JSON.stringify(orders)
                    } */}
                    
                </div>
            </div>
        </div>
    );
}
 
export default YourOrders;