import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "10px", background: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: "20px" }}>
          Login
        </Button>

        {/* ✅ Register Now Link */}
        <Typography variant="body2" style={{ marginTop: "20px", cursor: "pointer", color: "#1976d2" }} onClick={() => navigate("/register")}>
          New user? <strong>Register Now</strong>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
