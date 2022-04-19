import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from '../../components/CartItem';
import './style.css';
import { axiosInstance } from '../../api/axios';
import { setCart,setCartCount } from '../../Store/reducer';

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.data.cart);

    const getCart = async () =>{
        const res = await axiosInstance.get(`/cart/get`);
        if(res.status === 200){
            console.log(res.data);
            dispatch(setCart(res.data));
            dispatch(setCartCount(res.data.length));
        }
    };

    useEffect(()=>{
        getCart();
    },[]);

    

    return ( 
        <div className='cartContainer'>
            
            <div className="cincon">
                <div className="cartitems">
                    <div className="cicontainer">
                        <div className="cartcount">
                            <h3>{`My Cart(${cart.length})`}</h3>
                        </div>
                        {cart.map(item => 
                            <div className="cartitem" key={item._id}>
                                <CartItem item={item}/>
                            </div>
                        )}
                        {/* <div className="cartitem">
                            <CartItem/>
                        </div>
                        <div className="cartitem">
                            <CartItem/>
                        </div>
                        <div className="cartitem">
                            <CartItem/>
                        </div> */}
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