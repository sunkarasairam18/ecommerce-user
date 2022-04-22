import React from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './style.css';

const OrderProcess = ({step}) => {
    

    return ( 
        <div className="orderprocess">
            {/* <div>
                <ShoppingCartCheckoutIcon/>
            </div> */}
            <div className="steps">
                <div className='step'>
                    {step === 0 && 
                        <div className='stepIcon'>
                            <ShoppingCartCheckoutIcon/>
                        </div>
                    }
                    <div>
                        Sign In
                    </div>
                </div>
                <div className='step'>
                    {step === 1 && 
                        <div className='stepIcon'>
                            <ShoppingCartCheckoutIcon/>
                        </div>
                    }
                    <div>

                        Confirm Address
                    </div>
                </div>
                <div className='step'>
                    {step === 2 && 
                        <div className='stepIcon'>
                            <ShoppingCartCheckoutIcon/>
                        </div>
                    }
                    <div>
                        Confirm Order
                    </div>
                </div>
                <div className='step'>
                    {step === 3 && 
                        <div className='stepIcon'>
                            <ShoppingCartCheckoutIcon/>
                        </div>
                    }
                    <div>
                        Payment
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default OrderProcess;