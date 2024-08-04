import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      navigate('/login');
    }
  }, [navigate]);


  function logout(){
    localStorage.removeItem('userData');
    navigate('/login');
  }

  if (!userData) return null;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <h1>Welcome to the demo version</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolorum ducimus aperiam nisi unde. Id, excepturi hic sit nam doloribus ipsa nesciunt itaque voluptas fuga atque quidem asperiores eaque? Eligendi.</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Profile;
