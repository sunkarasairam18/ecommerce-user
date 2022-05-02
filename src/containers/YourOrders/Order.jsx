import React from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';

const Order = ({order}) => {
    const navigate = useNavigate();

    const total = () =>{
        let i = order.orderedItems.length;
        let sum = 0;
        for(let j = 0;j<i;j++){
            sum += order.orderedItems[j].quantity*order.orderedItems[j].price;
        }
        return sum;
    }
    function proper (date){
        let nd = new Date(date).toString();
        let list = nd.substring(4,15).split(" ");
        return `${list[1]} ${list[0]} ${list[2]}`;
    }

    return ( 
        <div className='order'>
            <div className='orderhead'>
                <div style={{display:"flex",alignItems:"center",justifyContent:'space-between',width:"50%"}}>                
                    <div className="ohsub">
                        <div className="ohst">
                            ORDER PLACED ON
                        </div>
                        <div className="ohstc">
                            {proper(order.createdAt)}
                        </div>
                    </div>
                    <div className="ohsub">
                        <div className="ohst">
                            TOTAL
                        </div>
                        <div className="ohstc">
                            {`₹ ${total().toLocaleString("en-US")}`}
                        </div>
                    </div>
                    <div className="ohsub">
                        <div className="ohst">
                            SHIP TO
                        </div>
                        <div className="ohstc">
                            {order.address.substring(0,10)+"..."}
                        </div>
                    </div>
                </div>
                <div style={{with:"50%",display:"flex",fontWeight:"400"}}>
                    {
                        `ORDER # ${order._id}`
                    }
                        {/* <div className="ohst">
                            ORDER # 
                        </div>
                        <div className="ohstc">
                            {}
                        </div> */}
                    
                </div>
            </div>
            <div className='orderitems'>
                {
                    order.orderedItems.map((item)=>
                        <div style={{display:"flex",alignItems:"center",justifyContent:'space-evenly',marginTop:"10px",width:"95%"}}>
                            <div className='orderitemimg'>
                                <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${item.img}`}/>
                            </div>
                            <div className='orderitemdetails'>
                                <div style={{fontWeight:"600",fontSize:"15px",color:"blueviolet",marginBottom:"8px"}}>
                                    {item.name}
                                </div>
                                <div>
                                    {`₹ ${item.price.toLocaleString("en-US")}`}
                                </div>
                                <div style={{fontSize:"15px",backgroundColor:"#2874f0",width:"80px",textAlign:"center",padding:"5px",color:"white",borderRadius:"5px",marginTop:"10px",cursor:"pointer"}} onClick={()=>navigate(`/${item.slug}/${item.product}/p`)}>
                                    Buy again
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default Order;