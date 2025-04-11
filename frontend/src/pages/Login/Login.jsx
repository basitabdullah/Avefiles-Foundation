import { useState } from "react";
import "./Login.scss";
import MetaData from "../../components/MetaData.jsx";
import { motion } from "framer-motion";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useUserStore } from "../../stores/useUserStore.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="login"
    >
      <MetaData title={"Avefiles | Login"} />

      <form className="login-container" onSubmit={handleSubmit}>
        <h4>Login</h4>

        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          required
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>Error {error}</p>}
        <button disabled={loading}>
          {loading ? "Logging in..." : "Sign in"}
          <IoArrowForwardCircleOutline />
        </button>
        <p className="register-text">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
