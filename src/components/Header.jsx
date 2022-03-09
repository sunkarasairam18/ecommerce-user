import React,{useState} from 'react';
import './Header.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';


const Header = () => {
    const {search,setSearch} = useState('');


    return ( 
        <div className='header'>
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
                    <div className="inhrlogin">
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