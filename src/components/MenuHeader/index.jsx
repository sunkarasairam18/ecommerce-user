import React from 'react';
import './MenuHeader.css';
import { useSelector } from 'react-redux';

const MenuHeader = () => {

    const categories = useSelector(state => state.data.categories);


    const renderCategories = (categorylist) => {
        if (!categorylist || categorylist.length === 0) return;
    
        return categorylist.map((category) => (
          <li key={category.name}>
            {
                category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                  {category.name}
                  </a>:<span>{category.name}</span>
            }
            {category.children.length > 0 && (
              <ul>{renderCategories(category.children)}</ul>
            )}
          </li>
        ));
      };
    return ( 
        <div className='menuheader'>
            <ul>
                {categories.length>0 && renderCategories(categories)}
            </ul>
        </div>
     );
}
 
export default MenuHeader;