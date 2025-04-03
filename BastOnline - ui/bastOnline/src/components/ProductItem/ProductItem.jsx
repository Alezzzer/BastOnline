import React, { useContext, useState } from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({id,name,price,description,image}) => {

    const [itemCount,setItemCount] = useState(0)
    const {cartItems, addToCart, removeFromCart, setCartItems} = useContext(StoreContext)
    return (
    <div className='product-item'>
        <div className="product-item-img-container">
            <img className='product-item-image' src={image} alt=""></img>
            {!cartItems[id]
                
                ? <img className='add'onClick={()=>addToCart(id)} src={assets.addiconwhite} alt=""/>
                : <div className='product-item-counter'> 
                    <img onClick={()=>removeFromCart(id)} src={assets.removeiconred} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img  onClick={()=>addToCart(id)} src={assets.addiconwhite} alt=""/>

                
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