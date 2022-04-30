import React,{useState} from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';


const ProductCard = ({url,name,cost,slug,_id}) => {
    const [hover,setHover] = useState(false);

    

    return (
     
        <Link to={`/${slug}/${_id}/p`} className='productCard' onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            <div className={`productCardImg ${hover?"zoomproductimg":""}`}>
            
                {/* <img src={`http://localhost:3000/public/${url}`} alt="pic"/> */}
                
                {/* <img src={URL.createObjectURL("https://trialing.s3.amazonaws.com/ala.jpeg".blob())} alt="pic"/> */}

                <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${url}`} alt="pic"/>

            </div>
            <div className='pname'>{name}</div>
            <div className='pcost'>{cost.toLocaleString('en-US')+"₹"}</div>
        </Link>
        
    );
}
 
export default ProductCard;