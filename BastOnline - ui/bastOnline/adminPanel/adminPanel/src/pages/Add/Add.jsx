import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';


const Add = () => {

  const url = "http://localhost:8080"
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    kilograms: "",
    category:"Fruits"
  })
  useEffect(()=>{
    console.log(data);
    
  },[data])

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value =event.target.value;
      setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
  
    // 1. Spakuj ceo DTO kao JSON u Blob
    const productData = new Blob([JSON.stringify({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      kilograms: Number(data.quantity),
      category: data.category
    })], { type: "application/json" });
  
    formData.append("product", productData); // @RequestPart("product")
    formData.append("image", image);         // @RequestPart("image")
  
    try {
      const response = await axios.post("http://localhost:8080/api/admin/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      if (response.status === 201) {
        setData({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: "Fruits"
        });
        setImage(false);
        toast.success("Product successfully added!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Error while adding product.");
      console.error(error);
    }
  };
  
  
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""></img>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Eggs">Eggs</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} type="Number" name='price' placeholder="$20"/>
          </div>
          <div className="add-quantity flex-col">
            <p>Product quantity</p>
            <input onChange={onChangeHandler} type="Number" name='quantity' />
          </div>
        </div>
        <button type="submit" className='add-btn'>ADD</button>
      </form>
      </div>
  )
}

export default Add