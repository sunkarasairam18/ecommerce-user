import React from 'react';
import ProductRow from './ProductRow';
import './ProductLatest.css';

const ProductLatest = ({productRow,categoryName}) => {
    return (
        <div className='latestrow'>
            <div className='latestname'>{categoryName}</div>
            <ProductRow productRow={productRow}/>
        </div>
    );
}
 
export default ProductLatest;