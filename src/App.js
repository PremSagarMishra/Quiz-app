import Navbar from './components/Navbar';
import Login from "./components/Login"
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Quiz from "./components/Quiz"
function App() {
  return (
    <div>
      

      <Router>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<ProtectedRoute component={Quiz} />} />
      </Routes>
      </div>
    </Router>
      </div>
    
  );
}
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const hasUserDetails = localStorage.getItem('userdetails');

  return hasUserDetails ? <Component {...rest} /> : <Navigate to="/" />;
};
export default App;
