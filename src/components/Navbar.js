
import { useContext } from 'react';
import { AppContext } from '../App';
import "./style.css"

const Navbar = () => {
  const {loggedIn,setLoggedIn,score,setScore}=useContext(AppContext)
  const handleLogout=()=>{
    localStorage.clear();
    setLoggedIn(false)
    setScore(0)
  }

  console.log(loggedIn)
  console.log(score)
  
  return (
    <div className='navbar'>
      <div className='logo'>Quiz App</div>
      <div className='right'>
        {loggedIn && <p>High score:{score}</p>}
        {loggedIn === true && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
