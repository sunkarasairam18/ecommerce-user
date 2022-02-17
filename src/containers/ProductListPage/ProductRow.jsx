import React from 'react';
import ProductCard from './ProductCard';
import './ProductRow.css';

const ProductRow = ({productRow,latest,categoryName}) => {
    // console.log(list[0].productPictures[0].img);

    const renderRow = () => {
        var row = [];
        for(let item of productRow){
            
            row.push(<ProductCard name={item.name} url={item.productPictures[0].img} cost={item.price}/>);
            
        }
        return row;
    }

    return (
        <div className='productrow'>
            {latest && <div className='phead'><h3>{categoryName}</h3></div>}
            <div className='pmainrow'>                
                {
                    renderRow()
                }
                
            </div>
        </div>

    );
}
 
export default ProductRow;