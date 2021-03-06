import './App.css';
import { useState,useEffect } from 'react';
import Header from './components/Header/Header';
import MenuHeader from './components/MenuHeader';
import { setCategories,setUser,setCartCount } from './Store/reducer';
import { axiosInstance } from './api/axios';
import { useSelector,useDispatch } from 'react-redux';
import { Routes,Route,Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { closeToast } from './Store/reducer';
import YourOrders from './containers/YourOrders';

import io from 'socket.io-client';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import DisplayProducts from './containers/DisplayProducts';
import ProductDetailsPage from './containers/ProductDetailsPage/index';
import Cart from './containers/Cart';
import Account from './containers/Account';
import Addresses from './containers/Addresses';
import EditLogin from './containers/EditLogin';
import ConfirmAddress from './containers/ConfirmAddress';
import CofirmOrder from './containers/ConfirmOrder';

function App() {
  const cat = useSelector(state => state.data.categories);
  const token = useSelector(state => state.data.user.token);
  const id = useSelector(state => state.data.user._id);
  const dispatch = useDispatch();
  const [ socket,setSocket] = useState(null);
  const showToast = useSelector(state => state.data.toast.show);
  const toastMsg = useSelector(state => state.data.toast.msg);
  const severity = useSelector(state => state.data.toast.severity);

  useEffect(()=>{
    setSocket(io.connect("http://localhost:3000"));    
  },[])


  async function getCategories() {
    const res = await axiosInstance.get("/category/get");
    if (res.status === 200) {
      dispatch(setCategories(res.data));       
    }
  }

 
  useEffect(() => {
    getCategories();    
  }, []);

  useEffect(()=>{
    if(socket){
      socket.on("categories_change",(data)=>{
        console.log(data);
        getCategories();
      });
    }
  },[socket]);

  useEffect(()=>{
    if(token && !id){
      
      axiosInstance.get('/user/profile').then(res => {
        if(res.status == 200){
          const {_id,userName,email,role,cartCount} = res.data;
          dispatch(setUser({_id,userName,email,role}));
          dispatch(setCartCount(cartCount));
        }
      }).catch(err => {
        console.log("Couldnt set up user");
      });            
    }
  },[token,id]);

  return (
    <div className="App">
      <Header/>
      <MenuHeader/>
      <div className='appbody'>

        <Routes>
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage/>}/>
          <Route path="/viewcart" element={token?<Cart/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/account/editaddresses" element={token?<Addresses/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/account/editlogin" element={token?<EditLogin/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/account/orders" element={token?<YourOrders/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/confirmaddress" element={token?<ConfirmAddress/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/confirmorder" element={token?<CofirmOrder/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/account" element={token?<Account/>:<Navigate to="/" replace={true}/>}/>
          <Route path="/:slug" element={<DisplayProducts/>}/>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </div>
      <Snackbar
            open={showToast}
            onClose={()=>dispatch(closeToast({}))}
            TransitionComponent={Slide}
            message={toastMsg}
            autoHideDuration={3000}
            key={'created'}
            disableWindowBlurListener={true}
            sx={{ width: "350px" }}
        >
            <Alert onClose={()=>dispatch(closeToast({}))} variant="filled" severity={severity} sx={{ width: '100%' }} >
            {toastMsg}
            </Alert>
        </Snackbar>
    </div>
  );
}

export default App;
