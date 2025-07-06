import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />} />
          
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;