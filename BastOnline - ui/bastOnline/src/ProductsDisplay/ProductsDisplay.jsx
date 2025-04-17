import React, { useContext } from 'react';
import './ProductsDisplay.css';
import ProductItem from '../components/ProductItem/ProductItem';
import { StoreContext } from '../context/StoreContext';

const ProductsDisplay = ({ category, searchQuery = "" }) => {
    const { products } = useContext(StoreContext);

    return (
        <div className='products-display' id='products-display'>
            <div className="product-display-list">
                {products
                    .filter(item =>
                        (category === 'All' || item.category === category) &&
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.imagePath || '/default-image.jpg'} 
                            category={item.category}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductsDisplay;
