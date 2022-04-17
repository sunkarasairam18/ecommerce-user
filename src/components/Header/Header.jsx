import React,{useState} from 'react';
import './Header.css';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { useSelector,useDispatch } from 'react-redux';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { setToast,setShowSignIn,setShowSignUp } from '../../Store/reducer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserDropDown from '../UserDropDown';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [search,setSearch] = useState('');
    // const [login,setLogin] = useState(false);
    // const [signup,setSignup] = useState(false);
    const token = useSelector(state => state.data.user.token);
    const userName = useSelector(state => state.data.user.userName);
    const showSignIn = useSelector(state => state.data.showSignIn);
    const showSignUp = useSelector(state => state.data.showSignUp);
    const dispatch = useDispatch();
    const [showUserDrop,setShowUserDrop] = useState(false);
    const navigate = useNavigate();

    return ( 
        <div className='header'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showSignIn}
            >
                {showSignIn && <SignIn/>}
            </Backdrop>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showSignUp}
            >
                {showSignUp && <SignUp/>}
            </Backdrop>
            <div className="inHeader">
                <div className="inhl">
                    <div className="inhlimg" onClick={()=>navigate("/")}>
                        Shoppy
                    </div>
                    <div className="inhlsearch">
                        <input type="text" className='inhlsbox' placeholder={'search for products'} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <SearchIcon style={{color:"#2874f0",cursor:"pointer"}}/>
                    </div>
                </div>
                <div className="inhr">
                    {!token && <div className="inhrlogin" onClick={()=>dispatch(setShowSignIn(true))}>
                        Login
                    </div>}
                    {!token && <div className="inhrsignup" onClick={()=>dispatch(setShowSignUp(true))}>
                        Sign Up
                    </div>}
                    
                    {userName && 
                        <div className='username' onMouseOver={()=>setShowUserDrop(true)} onMouseLeave={()=>setShowUserDrop(false)}>
                            <div className='uin'>

                                <div className="con">
                                    {userName}
                                </div>
                                <div className="udropicon">
                                    <KeyboardArrowDownIcon/>
                                </div>
                                
                            </div>
                            <div className='udrop'>
                                <UserDropDown show={showUserDrop} setShow={setShowUserDrop}/>
                            </div>
                        </div>
                    }
                    
                    <div className="inhrcart">
                        <Badge badgeContent={4} color="warning">
                            <ShoppingCartIcon style={{color:"white"}}/>
                        </Badge>
                        <div>Cart</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Header;