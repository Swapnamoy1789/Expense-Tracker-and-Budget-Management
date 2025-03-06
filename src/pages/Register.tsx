import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", { name, email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "10px", background: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          Register
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
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
        <Button fullWidth variant="contained" color="primary" onClick={handleRegister} style={{ marginTop: "20px" }}>
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
