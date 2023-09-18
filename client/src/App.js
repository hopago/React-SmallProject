import Navbar from './components/Navbar';
import './app.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {

  const [user,setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then(response => {
        if(response.status === 200) return response.json();
        throw new Error("Authentication Failed...");
      })
      .then(res => {
        setUser(res.user);
      })
      .catch(err => console.log(err));
    };

    getUser();

  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
      <Routes>
        <Route path='/post/:id' element={user ? <Post /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
