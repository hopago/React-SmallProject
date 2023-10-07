import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

