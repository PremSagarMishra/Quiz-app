import Navbar from './components/Navbar';
import Login from "./components/Login"
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Quiz from "./components/Quiz"
import { createContext, useEffect, useState } from 'react';

export const AppContext=createContext();
function App() {
  const hasUserDetails = localStorage.getItem('userdetails');
  
  const [loggedIn,setLoggedIn]=useState(false);
  
  const [score,setScore]=useState(0);

  useEffect(()=>{
    hasUserDetails?setLoggedIn(true):setLoggedIn(false)
    const storedUserDetails = localStorage.getItem("userdetails");
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : {highestScore:0};
    setScore(userDetails.highestScore)
  }
   
    ,[])
  
  return (
    <div>
      <AppContext.Provider value={{loggedIn,setLoggedIn,score,setScore}} > 
      <Router>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<ProtectedRoute component={Quiz} />} />
      </Routes>
      </div>
    </Router>
    </AppContext.Provider>
      </div>
    
  );
}
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const hasUserDetails = localStorage.getItem('userdetails');

  return hasUserDetails ? <Component {...rest} /> : <Navigate to="/" />;
};
export default App;
