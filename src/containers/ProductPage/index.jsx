import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { axiosInstance } from '../../api/axios';
import { setPage } from '../../Store/reducer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from './Card';

const ProductPage = ({cid,type}) => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.data.page);

    const getProductPage = async ()=>{
        try{
            console.log("Cid ",cid,"Type ",type);
            const res = await axiosInstance.get(`/page/${cid}/${type}`);
            if(res.status === 200){
                const {page} = res.data;
                console.log("Data : ",res.data);
                dispatch(setPage({page:page}));
            }else{
                console.log(res);
            }
        }catch(err){
            console.log(err);
        }

    };

    useEffect(()=>{
        if(cid && type) getProductPage();
    },[cid,type]);

    const renderProducts = () =>{
        let products = [];
        if(page.products && page.products.length>0){
            var l = page.products.length;
            for(var i = 0;i<l;i+=3){
                if(i+3<=l){
                    products.push(
                        <div style={{width:"100%",display:"flex",placeItems:"center",justifyContent:"space-around"}}>
                            <Card><img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${page.products[i].img}`} alt="pic"/></Card>
                            <Card><img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${page.products[i+1].img}`} alt="pic"/></Card>
                            <Card><img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${page.products[i+2].img}`} alt="pic"/></Card>
                        </div>
                    );
                }
            }
        }
        // console.log(page.products[0].img,"3fd6b15c-3a29-4bf0-bc0f-5e6ad74918ed.jpeg");
        return products;
    
    }

    return (
        <div style={{margin:"0px 10px"}}>
            <h3>{page.title}</h3>
           {page.banners && <div style={{width:"100%",height:"35em",backgroundColor:"black"}}>

                <Carousel renderThumbs={()=>{}} autoPlay infiniteLoop interval={3000} dynamicHeight>
                   {page.banners.map(({img,_id,navigateTo})=>
                            <a key={_id} style={{display:"block",objectFit:"cover",objectPosition:"50% 50%",width:"100%",height:"35em"}} href={navigateTo}>
                                <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${img}`} style={{width:"100%",height:"100%"}} alt="pic" /> 
                            </a>                           
                        )}
                </Carousel>
            </div>}   
            {/* {<div>
                {
                    page.products && page.products.map(({img,_id,navigateTo})=>
                        <Card key={_id}>
                            <img style={{width:"100px",height:"auto"}} src={img} alt="pic"/>
                        </Card>
                    )
                }
            </div>    }     */}
            {page && renderProducts()}
                
        </div>
    );
}
 
export default ProductPage;