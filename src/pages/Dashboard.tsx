import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // ✅ Import Back Arrow Icon
import API_BASE_URL from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTotalExpenses(response.data.totalExpenses);
        setRemainingBudget(response.data.remainingBudget);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      {/* ✅ Back Button to Home */}
      <IconButton
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
        }}
      >
        <ArrowBack fontSize="large" />
      </IconButton>

      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card style={{ background: "rgba(255, 255, 255, 0.2)", color: "white", backdropFilter: "blur(10px)" }}>
            <CardContent>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4">₹{totalExpenses}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ background: "rgba(255, 255, 255, 0.2)", color: "white", backdropFilter: "blur(10px)" }}>
            <CardContent>
              <Typography variant="h6">Remaining Budget</Typography>
              <Typography variant="h4">₹{remainingBudget}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
