import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    kilograms: '',
    category: 'Fruits',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const productData = new Blob([JSON.stringify({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      kilograms: Number(data.kilograms),
      category: data.category,
    })], { type: "application/json" });

    formData.append("product", productData);
    formData.append("image", image);

    try {
      const response = await axiosInstance.post("/api/admin/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Product successfully added!");
        setData({
          name: '',
          description: '',
          price: '',
          kilograms: '',
          category: 'Fruits',
        });
        setImage(false);
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
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Eggs">Eggs</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} type="number" name='price' placeholder="$20" value={data.price} />
          </div>
          <div className="add-quantity flex-col">
            <p>Product quantity (kg)</p>
            <input onChange={onChangeHandler} type="number" name='kilograms' value={data.kilograms} />
          </div>
        </div>
        <button type="submit" className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
