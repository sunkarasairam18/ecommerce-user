import React,{ useState } from 'react';
import './style.css';


const YourOrders = () => {
    const [sel,setSel] = useState(1);
    
    return ( 
        <div className='yourorders'>
            <div className="yoin">
                <div className='yoheader'>
                    Your Orders
                </div>
                <div className='yoselector'>
                    <div className='yosi'>

                        <div className={`chips ${sel==1?"chipselect":""}`} onClick={()=>setSel(1)}>
                            Orders
                        </div>
                        <div className={`chips ${sel==2?"chipselect":""}`} onClick={()=>setSel(2)}>
                            Not Yet Shipped
                        </div>
                        <div className={`chips ${sel==3?"chipselect":""}`} onClick={()=>setSel(3)}>
                            Cancelled Orders
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
 
export default YourOrders;