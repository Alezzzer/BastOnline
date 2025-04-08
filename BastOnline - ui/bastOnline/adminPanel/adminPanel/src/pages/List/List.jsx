import React, { useEffect, useState } from 'react'
import './List.css'
import { deleteProduct, getProducts, updateProduct } from '../../Services/BastOnline';
const List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {listProducts();}, []);
  function listProducts(){
    getProducts().then(
      (response) => {setProducts(response.data);})
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div className='container'>
    <h2 className='text-center'>List of Products</h2>
    <div>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Kilograms</th>
                    <th>Product Price</th>
                    <th>Product Category</th>
                    <th>Product Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                  products.map(product => 
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.kilograms}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td> 
                          <button className='btn btn-info' onClick={() => updateProduct(product.id)}>Update Product</button>
                          <button className='btn btn-danger' onClick={() => deleteProduct(product.id)} style={ { marginLeft: "10px" }}>Delete Product</button>
                      </td>
                    </tr>
                  )
                }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default List