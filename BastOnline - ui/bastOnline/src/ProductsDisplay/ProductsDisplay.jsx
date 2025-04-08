import React, { useEffect, useState } from 'react';
import './ProductsDisplay.css';
import ProductItem from '../components/ProductItem/ProductItem';
import axios from 'axios';

const ProductsDisplay = ({ category, searchQuery = "" }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/getProducts');
                const rawProducts = response.data;

                const productsWithImages = rawProducts.map(product => ({
                    ...product,
                    image: product.imagePath
                }));

                setProducts(productsWithImages);
            } catch (error) {
                console.error('❌ Greška prilikom dohvatanja proizvoda:', error);
            }
        };

        fetchProducts();
    }, []);

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
                            image={item.image || '/default-image.jpg'}
                            category={item.category}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductsDisplay;
