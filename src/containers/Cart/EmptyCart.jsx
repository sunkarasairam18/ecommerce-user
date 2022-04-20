import React from 'react';
import Cart from '../../images/online-shopping.png';

const EmptyCart = () => {
    return ( 
        <div style={{backgroundColor:"white",height:"100%",width:"90%",boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",display:"grid",placeItems:"center"}}>
            <div style={{display:"flex",flexDirection:'column',alignItems:"center"}}>
                <div>
                    <img src={Cart} alt="cart" style={{height:"200px",width:"200px"}}/>
                </div>
                <div style={{fontSize:"40px",marginTop:"10px",color:"dodgerblue",fontWeight:"600"}}>
                    Your cart is empty
                </div>
            </div>
        </div>
    );
}
 
export default EmptyCart;