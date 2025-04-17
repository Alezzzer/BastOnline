import { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";
import { useStore } from "../../context/StoreContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user } = useStore();
  const userId = user?.id;

  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8080/api/farm/myprofile/${userId}`)
      .then((res) => {
        setUserData(res.data);
        setFormData({ ...res.data, password: "" });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile.");
      });
  }, [userId]);

  const handleUpdate = () => {
    const dataToSend = { ...formData };
    if (!dataToSend.password || dataToSend.password.trim() === "") {
      delete dataToSend.password;
    }

    axios
      .put(`http://localhost:8080/api/farm/myprofile/update/${userId}`, dataToSend)
      .then((res) => {
        setUserData(res.data);
        setFormData({ ...res.data, password: "" });
        setEditMode(false);
        setErrorMessage("");
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Update error:", err);
        const message = err.response?.data?.message?.toLowerCase() || "";
      
        if (message.includes("duplicate entry")) {
          setErrorMessage("Email already in use");
        } else {
          setErrorMessage("Email already in use");
        }
      
        
      });
      
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(""); 
  };

  if (!userId) return <p>Loading user...</p>;
  if (!userData) return <p>Loading profile...</p>;

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
          <label>Password: <input type="password" name="password" value={formData.password || ''} onChange={handleChange} /></label>

          {errorMessage && <p className="profile-error">{errorMessage}</p>}

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => { setEditMode(false); setErrorMessage(""); }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
