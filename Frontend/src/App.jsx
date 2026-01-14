import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddHome from './pages/AddHome'
import Bookings from './pages/Bookings'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './pages/Navbar';

function App() {
 
  return (
    <BrowserRouter>
      <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/add-home/:id?" element={<AddHome />} />
         <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
