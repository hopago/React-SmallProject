import { useRef, useState, useEffect } from "react"
import './login.css';
import axios from './api/axios';
import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const LOGIN_URL = "/auth";

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                LOGIN_URL, 
                JSON.stringify({ user, pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            const accessToken = res?.data?.accessToken;
            const roles = res?.data?.roles; // Array of roles, value = number
            setAuth({
                user, pwd, roles, accessToken
            });
            // navigate user
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
        // clear fields
        setUser('');
        setPwd('');
        setSuccess(true);
    };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <a href="#">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
}

export default Login
