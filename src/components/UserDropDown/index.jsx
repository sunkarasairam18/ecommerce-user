import React from 'react';
import './style.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { CSSTransition } from 'react-transition-group';

const UserDropDown = ({show}) => {
    return ( 
        <CSSTransition in={show} timeout={800} unmountOnExit classNames="userDrop">

            <div className='dropbox'>
                
                <div className="arrow">
                    <div class="outer"></div>
                    <div class="inner"></div>
                </div>
                
                <div className="doptions">
                    <div className="doption">
                        <div className="doicon">
                            <AccountCircleIcon style={{color:"blue",fontSize:"25px"}}/>
                        </div>
                        <div className="doname">
                            My Profile
                        </div>
                    </div>
                    <div className="doption">
                        <div className="doicon">
                            <LocalShippingIcon style={{color:"blue",fontSize:"25px"}}/>
                        </div>
                        <div className="doname">
                            Orders
                        </div>
                    </div>
                    <div className="doption">
                        <div className="doicon">
                            <LogoutIcon style={{color:"blue",fontSize:"25px"}}/>
                        </div>
                        <div className="doname">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
     );
}
 
export default UserDropDown;