// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';


const App = () => {

  

  return (
    <BrowserRouter>
      {/* Toast container for notifications */}
      
      {/* Routes */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
