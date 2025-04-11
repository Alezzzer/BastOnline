import { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";

const MyProfile = () => {
  const userId = 1; // Zameni sa dinamičkim ID-em kada budeš imao auth
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/farm/myprofile/${userId}`)
      .then((res) => {
        setUserData(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/farm/myprofile/update/${userId}`, formData)
      .then(res => {
        setUserData(res.data);
        setEditMode(false);
      })
      .catch(err => console.error("Update error:", err));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="myprofile">
      <h2>My Profile</h2>

      {!editMode ? (
        <div className="profile-details">
          <p><b>Name:</b> {userData.name}</p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Address:</b> {userData.address}</p>
          <p><b>City:</b> {userData.city}</p>
          <p><b>Phone:</b> {userData.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="profile-form">
          <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
          <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
          <label>Address: <input type="text" name="address" value={formData.address} onChange={handleChange} /></label>
          <label>City: <input type="text" name="city" value={formData.city} onChange={handleChange} /></label>
          <label>Phone: <input type="text" name="phone" value={formData.phone} onChange={handleChange} /></label>
          <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label>
          

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
