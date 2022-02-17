import React from 'react';
import './ProductCard.css';

const ProductCard = ({url,name,cost}) => {
    return (
        <div className='productCard'>
            <div className="productCardImg">
                <img src={`http://localhost:3000/public/${url}`} alt="pic"/>
            </div>
            <div className='pname'>{name}</div>
            <div className='pcost'>{cost.toLocaleString('en-US')+"₹"}</div>
        </div>
    );
}
 
export default ProductCard;