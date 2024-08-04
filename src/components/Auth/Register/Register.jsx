import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APIProvider, Map,Marker } from '@vis.gl/react-google-maps';
import "./Register.css";

const Register = () => {
  let navigate = useNavigate();
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    latitude: "",
    longitude: "",
    accountImage: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLong(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  }, []); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, accountImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      latitude: lat,
      longitude: long,
    };

    axios
      .post("http://localhost:3000/users", updatedFormData)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="long">Longitude</label>
          <input
            required
            type="text"
            id="long"
            name="longitude"
            value={long}
            placeholder="Longitude"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="lat">Latitude</label>
          <input
            required
            type="text"
            id="lat"
            name="latitude"
            value={lat}
            placeholder="Latitude"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountImage">Account Image</label>
          <input
            required
            type="file"
            id="accountImage"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div id="map-container" style={{ height: '50%', width: '100%' }}>
        <APIProvider apiKey={'AIzaSyAU7qlfBzAWPIzV8EYWnm-jplc32mFbSR0'}>
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: lat, lng: long }}
            style={{ height: '80%', width: '80%',margin:"auto" }}
          />
          {lat && long && (
              <Marker
                position={{ lat: parseFloat(lat), lng: parseFloat(long) }}
              />
            )}
        </APIProvider>
      </div>
    </div>
  );
};

export default Register;
