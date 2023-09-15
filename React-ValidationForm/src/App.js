import { useRef, useState } from 'react';
import './app.css';
import FormInput from './components/FormInput';


function App() {

  // const [user,setUser] = useState("");
  // const usernameRef = useRef();
  const [values,setValues] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    birthday: ""
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 chars and shouldn't include any special char",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "fullName",
      type: "text",
      placeholder: "FullName",
      errorMessage: "",
      label: "FullName",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 chars and include at least 1 letter, 1 number and 1 special char",
      label: "Password",
      pattern: `^(?=.*[0,9])(?=.*[a-zA-z])(?=.*[!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      errorMessage: "",
      label: "Birthday"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handelChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map(i => (
          <FormInput 
            key={i.id} 
            {...i} 
            value={values[inputs.name]} 
            onChange={handelChange} 
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
