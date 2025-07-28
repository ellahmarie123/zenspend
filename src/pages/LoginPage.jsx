import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import bcrypt from "bcryptjs";

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      // .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid username or password. Try again.");
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if (!passwordMatch) {
      setError("Incorrect password. Please try again.");
      return;
    } else {
      setUser(data);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>
        Don't have and account? <a href="/signup">Signup Here</a>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
