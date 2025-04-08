import React, { useContext } from 'react';
import './ProductItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const ProductItem = ({ id, name, price, description, image, category }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='product-item'>
            <div className="product-item-img-container">
            <img 
    className='product-item-image' 
    src={image ? image : '/default-image.jpg'} 
    alt={name} 
/>

                {!cartItems[id] ? (
                    <img 
                        className='add' 
                        onClick={() => addToCart(id)} 
                        src={assets.addiconwhite} 
                        alt="Add to cart" 
                    />
                ) : (
                    <div className='product-item-counter'>
                        <img 
                            onClick={() => removeFromCart(id)} 
                            src={assets.removeiconred} 
                            alt="Remove" 
                        />
                        <p>{cartItems[id]}</p>
                        <p>{category === 'Eggs' ? 'pcs' : 'kg'}</p>
                        <img 
                            onClick={() => addToCart(id)} 
                            src={assets.addiconwhite} 
                            alt="Add" 
                        />
                    </div>
                )}
            </div>

            <div className="product-item-info">
                <p className='product-item-name'>{name}</p>
                <p className="product-item-desc">{description}</p>
                <p className="product-item-price">${price}</p>
            </div>
        </div>
    );
};

export default ProductItem;
