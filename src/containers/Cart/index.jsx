import React,{useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from '../../components/CartItem';
import './style.css';
import { axiosInstance } from '../../api/axios';
import { setCart,setCartCount } from '../../Store/reducer';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [circle,setCir] = useState(true);
    const cart = useSelector(state => state.data.cart);

    const getCart = async () =>{
        const res = await axiosInstance.get(`/cart/get`);
        if(res.status === 200){
            dispatch(setCart(res.data));
            dispatch(setCartCount(res.data.length));
        }
    };

    useEffect(()=>{
        setTimeout(()=>{
            setCir(false)
        },1000);
    },[]);

    useEffect(()=>{
        getCart();
    },[]);

    const total = () =>{
        let sum = 0;
        for(let i = 0;i<cart.length;i++)
            sum += cart[i].price*cart[i].quantity;
        return sum;
    }
    

    return ( 
        <div className='cartContainer'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={circle}
                >
                <CircularProgress size="6rem" color="inherit" />
            </Backdrop>
            {cart.length>0?
            (<div className="cincon">
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
                        
                    </div>

                    <div className="ciplaceorder">
                        <Button variant="contained" onClick={()=>navigate('/confirmaddress')} style={{backgroundColor:"dodgerblue",fontWeight:"600",marginRight:"10px",height:"40px",paddingLeft:"30px",paddingRight:"30px"}}>
                            Place Order
                        </Button>
                    </div>
                </div>
                <div className="carttotal">
                    <div className="pricesummary">
                        <div>
                            PRICE DETAILS
                        </div>
                    </div>
                    <div className="pricecharges">
                        <div className="pricerow">
                            <div className='chargesitem'>
                                {`Price (${cart.length} ${cart.length>1?"items":"item"})`}
                            </div>
                            <div className='chargescost' style={{fontWeight:"600"}}>
                                {`₹ ${total().toLocaleString("en-US")}`}
                            </div>
                        </div>
                        <div className="pricerow">
                            <div>
                                Delivery Charges
                            </div>
                            <div>
                                FREE
                            </div>
                        </div>
                    </div>
                    <div className="totalamount">
                        {/* <div className="pricerow">
                            
                        </div> */}
                        <div>
                                Total Amount
                            </div>
                            <div>
                                {`₹ ${total().toLocaleString("en-US")}`}
                            </div>
                    </div>
                </div>
            </div>):(
                <EmptyCart/>
            )}
        </div>
     );
}
 
export default Cart;