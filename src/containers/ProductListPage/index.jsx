import React,{useEffect,useState} from 'react';
import { setProducts } from '../../Store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../api/axios';
import { useParams } from 'react-router-dom';
import ProductRow from './ProductRow';
import ProductLatest from './ProductLatest';

const ProductListPage = () => {
    const products = useSelector(state => state.data.products);
    const dispatch = useDispatch();
    const {slug} = useParams();
    const [catName,setCatName] = useState("");

    const getProductsBySlug = async(slug) =>{
        const res = await axiosInstance.get(`/product/get/${slug}`);
        if(res.status === 200){
            console.log(res.data);
            dispatch(setProducts(res.data));
        }
    };

    useEffect(()=>{
        console.log(slug);
        getProductsBySlug(slug);
    },[slug]);

    async function getName(){
        const res = await axiosInstance.get(`/category/getname/${products[0].category}`);
        if(res.status === 200){
            console.log("Data : ",res.data);
            setCatName(res.data.name);
        }
    }

    useEffect(()=>{
        if(slug){
            if(products && products.length>0){
                getName();
                console.log("category ",products[0].category);
            }
        }
    },[slug,products]);

    const renderRows = () =>{
        var rows = [];
        for(var i = 0;i<products.length;i+=6){
            
            if(i+6<products.length){
                // if(i === 0){
                //     rows.push(
                //         <ProductLatest categoryName={catName} productRow={products.slice(i,i+6)}/>
                //     );
                // }
                // else{
                //     rows.push(
                //         <ProductRow latest={i === 0} key={i} productRow={products.slice(i,i+6)}/>
                //     );
                // }
                // rows.push(
                //     <ProductRow latest={i === 0} categoryName={catName} key={i} productRow={products.slice(i,i+6)}/>
                // );
            }
            // if(i === 0){
            //     rows.push(
            //         <ProductLatest categoryName={catName} productRow={products.slice(i,i+6)}/>
            //     );
            // }
            // else{
            //     rows.push(
            //         <ProductRow latest={i === 0} key={i} productRow={products.slice(i,i+6)}/>
            //     );
            // }
              rows.push(
                    <ProductRow latest={i === 0} categoryName={catName} key={i} productRow={products.slice(i,i+6)}/>
                );
        }
        return rows;
    }

    return ( 
        <div style={{width:"100%",display:'flex',paddingTop:"10px",flexDirection:"column",alignItems:"center",backgroundColor:"#f0f0f0"}}>

            {
                renderRows()
            }
            {/* {
                renderRows()
            }
            {
                renderRows()
            }
            {
                renderRows()
            }
            {
                renderRows()
            }
            {
                renderRows()
            } */}
            {/* <ProductRow productRow={products.slice(0,4)}/> */}
        </div>
     );
}
 
export default ProductListPage;