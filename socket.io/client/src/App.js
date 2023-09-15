import Login from "./pages/Login";
import './app.css';
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { io } from 'socket.io-client';


function App() {

  const [username,setUsername] = useState("");
  const [user,setUser] = useState("");
  const [socket,setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("https://localhost:6974"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          <Card socket={socket} user={user} />
          <span className="username">{user}</span>
        </>
      ) 
      : 
      (<Login setUsername={setUsername} username={username} setUser={setUser} />)
      }
    </div>
  );
}

export default App;
