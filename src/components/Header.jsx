import React,{useState} from 'react';
import './Header.css';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import SignIn from '../containers/SignIn';

const Header = () => {
    const [search,setSearch] = useState('');
    const [login,setLogin] = useState(false);


    return ( 
        <div className='header'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={login}
            >
                <SignIn setLogin={setLogin} show={login}/>
            </Backdrop>
            <div className="inHeader">
                <div className="inhl">
                    <div className="inhlimg">
                        FlipKart
                    </div>
                    <div className="inhlsearch">
                        <input type="text" className='inhlsbox' placeholder={'search for products'} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <SearchIcon style={{color:"#2874f0",cursor:"pointer"}}/>
                    </div>
                </div>
                <div className="inhr">
                    <div className="inhrlogin" onClick={()=>setLogin(true)}>
                        Login
                    </div>
                    {/* <Button variant="text" className="inhrlogin">Login</Button> */}
                    <div className="inhrsignup">
                        Sign Up
                    </div>
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