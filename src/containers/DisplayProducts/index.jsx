import React from 'react';
import { useParams,useSearchParams } from 'react-router-dom';
import ProductPage from '../ProductPage';
import ProductListPage from '../ProductListPage';

const DisplayProducts = () => {
    const {slug} = useParams();
    const [queryParameters] = useSearchParams();
    const renderProduct = () =>{
        let content = null;
        console.log("TYpe ",queryParameters.get("type"));
        switch(queryParameters.get("type")){
            case 'page':
                content = <ProductPage cid={queryParameters.get('cid')} type={queryParameters.get('type')}/>;
                break;
            case 'store':
                content = <ProductListPage slug={slug}/>;
                break;
            default:
                content = null;
        }
        return content;

    };
    return ( 
        <div>
            {renderProduct()}
        </div>
    );
}
 
export default DisplayProducts;