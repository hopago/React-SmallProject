import React, { useState } from 'react'


const Login = ( { setUser, setUsername, username }) => {

  return (
    <div className="login">
        <input type="text" placeholder='UserId' onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setUser(username)}>Login</button>
    </div>
  )
}

export default Login
