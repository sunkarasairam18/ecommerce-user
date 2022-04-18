import React from 'react';
import Button from '@mui/material/Button';

import './style.css';

const Cart = () => {
    return ( 
        <div className='cartContainer'>
            
            <div className="cincon">
                <div className="cartitems">
                    <div className="cicontainer">
                        <div className="cartcount">
                            <h3>My Cart(4)</h3>
                        </div>
                        <div className="cartitem">

                        </div>
                        <div className="cartitem">
                            
                        </div>
                        <div className="cartitem">
                            
                        </div>
                        <div className="cartitem">
                            
                        </div>
                    </div>

                    <div className="ciplaceorder">
                        <Button variant="contained" style={{backgroundColor:"dodgerblue",fontWeight:"600",marginRight:"10px",height:"40px",paddingLeft:"30px",paddingRight:"30px"}}>
                            Place Order
                        </Button>
                    </div>
                </div>
                <div className="carttotal">
sdf
                </div>
            </div>
        </div>
     );
}
 
export default Cart;