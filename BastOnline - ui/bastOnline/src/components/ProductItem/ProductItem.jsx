import React, { useState } from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'

const ProductItem = ({id,name,price,description,image}) => {

    const [itemCount,setItemCount] = useState(0)

    return (
    <div className='product-item'>
        <div className="product-item-img-container">
            <img className='product-item-image' src={image} alt=""></img>
            {
                !itemCount
                ? <img className='add'onClick={()=>setItemCount(prev=>prev+1)} src={assets.addiconwhite} alt=""/>
                : <div className='product-item-counter'> 
                    <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.removeiconred} alt=""/>
                    <p>{itemCount}</p>
                    <img  onClick={()=>setItemCount(prev=>prev+1)} src={assets.addiconwhite} alt=""/>

                
                </div>
            }
        
        </div>
            <div className="product-item-info">
                <p className='product-item-name'>{name}</p>
               <p className="product-item-desc">
                {description}
                </p> 
                <p className="product-item-price">${price}</p>

            </div>

    </div>
  )
}

export default ProductItem