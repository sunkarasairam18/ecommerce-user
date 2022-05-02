import React from 'react';

const Ntg = ({text}) => {
    return ( 
        <div style={{height:"300px",width:"100%",display:"grid",placeItems:"center"}}>
            <div style={{fontSize:"30px",fontWeight:"600",fontStyle:"italic"}}>
                {text}
            </div>
        </div>
    );
}
 
export default Ntg;