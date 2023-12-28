import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import "./style.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(window.location.pathname);
  const [score, setScore] = useState(() => {
    const storedUserDetails = localStorage.getItem("userdetails");
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : {};
    return userDetails.highestScore || 0;
  });

  useEffect(() => {
    const handlePathChange = () => {
      setLocation(window.location.pathname);
    };

    const handleStorageChange = () => {
      const storedUserDetails = localStorage.getItem("userdetails");
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : {};
      setScore(userDetails.highestScore || 0);
    };

    window.addEventListener('popstate', handlePathChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userdetails");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <div className='logo'>Quiz App</div>
      <div className='right'>
        <p>Highest score: {score}</p>
        {location === "/quiz" && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
