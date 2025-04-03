import React, { useContext } from 'react'
import './ProductsDisplay.css'
import { StoreContext } from '../context/StoreContext'
import { product_list } from '../assets/assets'
import ProductItem from '../components/ProductItem/ProductItem'

const ProductsDisplay = ({category}) => {

    const{product_list} = useContext(StoreContext)

  return (
    <div className='products-display' id='products-display'>
        <div className="product-display-list">
            {product_list.map((item,index)=>{
              
             if(category==="All" || category===item.category){
              {console.log(category,item.category);}
                return <ProductItem key={index} id={item._id} name={item.name} 
                      description={item.description} price={item.price} image={item.image}/>}
              
})}
        </div>
    </div>
  )
}

export default ProductsDisplay