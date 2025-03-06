import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        style={{
          marginTop: "10px",
          textAlign: "center",
          backgroundImage: darkMode ? "url('/images/finance-bg.jpg')" : "url('/images/finance-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <IconButton onClick={() => setDarkMode(!darkMode)} style={{ position: "absolute", right: 20, top: 20, color: darkMode ? "#fff" : "#000" }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Paper
          elevation={5}
          style={{
            padding: "30px",
            borderRadius: "12px",
            background: darkMode ? "rgba(50, 50, 50, 0.9)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
              Expense Tracker
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Manage your expenses and budgets efficiently
            </Typography>
          </motion.div>

          <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
            <Grid item>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              </motion.div>
            </Grid>
            <Grid item>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="contained" color="secondary" onClick={() => navigate("/expenses")}>Manage Expenses</Button>
              </motion.div>
            </Grid>
            <Grid item>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="contained" color="success" onClick={() => navigate("/budgets")}>Set Budgets</Button>
              </motion.div>
            </Grid>
            <Grid item>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="contained" color="info" onClick={() => navigate("/reports")}>View Reports</Button>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div whileHover={{ scale: 1.1 }} style={{ marginTop: "20px" }}>
            {isAuthenticated ? (
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </motion.div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
