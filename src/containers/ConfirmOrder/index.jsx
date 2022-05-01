import React,{useEffect,useState} from 'react';
import './style.css';
import OrderProcess from '../../components/OrderProcess';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CofirmOrder = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const cart = useSelector(state  => state.data.cart);

    useEffect(()=>{
        console.log("Address",state);

        if(!state || !cart || cart.length<1){
            navigate('/');
        }
    },[state]);

    const total = (list) =>{
        let sum = 0;
        for(let i = 0;i<list.length;i++){
            sum += list[i].quantity*list[i].price;
        }
        return sum;
    }

    return ( 
        <div className='confirmorder'>
            <div className="cobox">
                <div style={{width:"100%"}}>
                    <OrderProcess step={2}/>
                    <div style={{fontWeight:"600",marginTop:"20px",fontSize:"30px"}}>Review your order</div>
                </div>
                <div className="codetails">
                    <div style={{display:"flex",flexDirection:"column",width:"70%"}}>

                    
                    <div className="coaddress">
                        <div className="coship">
                            Shipping address :
                        </div>
                        {state && <div className="coaddtext">
                            {`${state.address},${state.locality},${state.cityDistrictTown},${state.state} - ${state.pinCode}`}
                        </div>}
                    </div>
                    <div className='coitems'>
                        <div style={{fontWeight:600,paddingLeft:"5px",fontSize:"25px",marginBottom:"10px"}}>
                            Items
                        </div>
                        {cart.map(({img,name,price,quantity})=>
                            <div className='coitem'>
                                <div className="coiimg">
                                    <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${img}`} />
                                </div>
                                <div className="coidetails">
                                    <div className="coidname">
                                        {name}
                                    </div>
                                    <div className="coidprice">
                                        {`₹ ${price.toLocaleString("en-US")}`}
                                    </div>
                                    <div className="coidq">
                                        <div style={{fontWeight:600,marginRight:"5px"}}>
                                            Quantity:  
                                        </div>
                                        <div>{quantity}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* {JSON.stringify(cart)} */}
                    </div>
                    </div>
                    <div className="coprice">
                        <div style={{width:"85%",textAlign:"center",marginTop:"10px",backgroundColor:"#679cf1",paddingLeft:"5px",paddingRight:"5px",paddingTop:"8px",paddingBottom:"8px",cursor:"pointer",borderRadius:"2px",fontWeight:"400",boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}>
                            Place Your Order
                        </div>
                        <div style={{width:"85%",marginTop:"10px",fontWeight:600,fontSize:"medium"}}>
                            Order Summary
                        </div>
                        <div style={{width:"85%",marginTop:"10px"}}>
                            <div className='coprow'>
                                <div>
                                    Items:
                                </div>
                                <div>
                                    {`₹${total(cart).toLocaleString("en-US")}.00`}
                                </div>
                            </div>
                            <div className='coprow'>
                                <div>
                                    Delivery:
                                </div>
                                <div>
                                    {`₹00.00`}
                                </div>
                            </div>
                            <div className='coprow' style={{marginTop:"10px",color:"red",fontSize:"large",fontWeight:"700",borderTop:"1px solid lightgrey",borderBottom:"1px solid lightgrey",paddingTop:"5px",paddingBottom:"5px"}}>
                                <div>
                                    Order Total:
                                </div>
                                <div>
                                    {`₹${total(cart).toLocaleString("en-US")}.00`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default CofirmOrder;