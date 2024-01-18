import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import from 'react-router-dom'
import { useContext } from 'react';
import App, { AppContext } from '../App';

const Login = () => {
  const [name,  setName] = useState("");
  const navigate= useNavigate();

  const {loggedIn,setLoggedIn}=useContext(AppContext)


  loggedIn && navigate("/quiz");
  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      name,
      highestScore: 0 // Default value for highest score
    };
    
    localStorage.setItem("userdetails", JSON.stringify(userDetails));
    setLoggedIn(true)
    navigate("/quiz");
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}> {/* Move onSubmit to the form tag */}
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;
