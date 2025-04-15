import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    listProducts();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const listProducts = () => {
    axios.get('http://localhost:8080/api/admin/getProducts', getAuthHeader())
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sorted);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error: can't fetch products");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/admin/deleteProduct/${id}`, getAuthHeader())
      .then(() => {
        toast.success('Deleted successfully!');
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error: delete failed');
      });
  };

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditProductId(null);
    setEditedProduct({});
  };

  const handleInputChange = (e, field) => {
    const value = field === "image" ? e.target.files[0] : e.target.value;
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();

    const productData = new Blob([JSON.stringify({
      name: editedProduct.name,
      description: editedProduct.description,
      price: editedProduct.price,
      kilograms: editedProduct.kilograms,
      category: editedProduct.category
    })], { type: "application/json" });

    formData.append("product", productData);

    if (editedProduct.image instanceof File) {
      formData.append("image", editedProduct.image);
    }

    try {
      await axios.put(`http://localhost:8080/api/admin/updateProduct/${editProductId}`, formData, {
        ...getAuthHeader(),
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Updated successfully!");
      setEditProductId(null);
      setEditedProduct({});
      listProducts();
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Error: can't update");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="products-list">
      <h2>List of Products</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kilograms</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editProductId === product.id
                    ? <input value={editedProduct.name || ''} onChange={(e) => handleInputChange(e, 'name')} />
                    : product.name}
                </td>
                <td>
                  {editProductId === product.id
                    ? <input type="number" value={editedProduct.kilograms || ''} onChange={(e) => handleInputChange(e, 'kilograms')} />
                    : product.kilograms}
                </td>
                <td>
                  {editProductId === product.id
                    ? <input type="number" value={editedProduct.price || ''} onChange={(e) => handleInputChange(e, 'price')} />
                    : product.price}
                </td>
                <td>
                  {editProductId === product.id
                    ? (
                      <select value={editedProduct.category || ''} onChange={(e) => handleInputChange(e, 'category')}>
                        <option value="">--Select Category--</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Eggs">Eggs</option>
                      </select>
                    )
                    : product.category}
                </td>
                <td>
                  {editProductId === product.id
                    ? <input value={editedProduct.description || ''} onChange={(e) => handleInputChange(e, 'description')} />
                    : product.description}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <>
                      <input type="file" accept="image/*" onChange={(e) => handleInputChange(e, 'image')} />
                      {editedProduct.image && !(editedProduct.image instanceof File) && (
                        <img className="product-image" src={editedProduct.image} alt={product.name} />
                      )}
                    </>
                  ) : (
                    <img
                      className="product-image"
                      src={product.imagePath ? product.imagePath : "/default-image.jpg"}
                      alt={product.name}
                    />
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <>
                      <button className="btn save-btn" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button className="btn cancel-btn" onClick={handleCancel} style={{ marginLeft: "10px" }}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(product.id)} style={{ marginLeft: "10px" }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
