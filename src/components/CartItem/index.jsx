import React,{ useState } from 'react';

import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { axiosInstance } from '../../api/axios';
import { useDispatch,useSelector } from 'react-redux';
import { setCartCount,updateCart,delCartItem,setToast } from '../../Store/reducer';

import './style.css';
import { useNavigate } from 'react-router-dom';

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const [updating,setUpdating] = useState(false);
    const navigate = useNavigate();
    const cartCount = useSelector(state => state.data.cartCount);

    // const getCart = async () =>{
    //     const res = await axiosInstance.get(`/cart/get`);
    //     if(res.status === 200){
    //         console.log(res.data);
    //         dispatch(setCart(res.data));
    //         dispatch(setCartCount(res.data.length));
    //     }
    // };

    const update = async (i) => {
        if(item){
            setUpdating(true);
            setTimeout(async()=>{

                const res = await axiosInstance.post('/cart/add',{
                    cartItems:{
                        product: item._id,
                        quantity: i,
                        price: item.price
                    },
                });
                
                if (res.status === 201) {
                    console.log(res.data);
                    // dispatch(setToast({msg:`You've Changed "${item.name.length>10?item.name.substring(0,10)+"...":item.name}" quantity to ${res.data.quantity}`,severity:"success"}));
                    // dispatch(setCart(res.data));
                    // dispatch(setCartCount(res.data.length));
                    dispatch(updateCart({id: item._id,qty: i}));
                    setUpdating(false);
                }else setUpdating(false);
            },500);
        }
    };

    const delItem = async () =>{
        if(item){
            setUpdating(true);
            setTimeout(async ()=>{
                const res = await axiosInstance.post('/cart/delitem',{
                    cartItems:{
                        product: item._id                        
                    },
                });
                
                if (res.status === 201) {
                    // dispatch(setCart(res.data));
                    // dispatch(setCartCount(res.data.length));
                    const { name } = item;
                    dispatch(delCartItem({id:item._id}));
                    dispatch(setToast({msg:`Item "${name.length>10?name.substring(0,10)+"...":name}" has removed`,severity:"success"}));
                    dispatch(setCartCount(cartCount-1));
                    setUpdating(false);
                }else setUpdating(false);
            },500);
        }
    };

    return ( 
        <div className="citemcon">
            
            <div className="citop">
                <div className="ciimg" onClick={()=>navigate(`/${item.slug}/${item._id}/p`)}>
                    <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${item.img}`} alt="pic"/>
                </div>
                <div className="ciinfo">
                    <div className="ciname" onClick={()=>navigate(`/${item.slug}/${item._id}/p`)}>
                        {item.name}
                    </div>
                    <div className="ciprice">
                        {`₹ ${(item.price*item.quantity).toLocaleString("en-US")}`}
                    </div>
                </div>
            </div>
            <div className="cilow">
                <div className="ciqnty">
                    <IconButton aria-label="delete" size="small" onClick={()=>update(-1)} disabled={item.quantity<=1 || updating?true:false}>
                        <RemoveCircleOutlineIcon fontSize="medium" style={{color:item.quantity<=1 || updating?'lightgrey':'rgb(82, 66, 66)'}}/>
                    </IconButton>
                    <div className="ciqnum">
                        {item.quantity}
                    </div>
                    <IconButton aria-label="delete" size="small" onClick={()=>update(1)} disabled={updating}>
                        <AddCircleOutlineIcon fontSize="medium"  style={{color: updating?'lightgrey':'rgb(82, 66, 66)'}} />
                    </IconButton>
                </div>
                <div className="remove">
                    <Button variant="outlined" style={{fontSize:"15px",fontWeight:"bold",color: updating?'lightgrey':'rgb(82, 66, 66)'}} disabled={updating} onClick={()=>delItem()}>Remove</Button>
                </div>
            </div>
        </div>
    );
}
 
export default CartItem;