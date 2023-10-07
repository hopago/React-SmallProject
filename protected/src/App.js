import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* protected route */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
