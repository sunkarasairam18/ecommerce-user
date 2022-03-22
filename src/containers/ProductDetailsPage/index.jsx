import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import './style.css';



const ProductDetailsPage = () => {
    const { productSlug,productId } = useParams();
    const [product,setProduct] = useState();

    const getProductDetails = async (id) =>{
        try{
            const res = await axiosInstance.get(`/product/info/${id}`);
            if(res.status === 200){
                console.log(res.data);
                setProduct(res.data);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(productSlug && productId){
            getProductDetails(productId);
        }
    },[productSlug,productId]);

    return ( 
        <div className='pdp'>{JSON.stringify(product)}</div>
    );
}
 
export default ProductDetailsPage;