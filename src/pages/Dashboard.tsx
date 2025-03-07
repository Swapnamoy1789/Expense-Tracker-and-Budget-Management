import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import API_BASE_URL from "../utils/api";

interface CategoryBudget {
  budget: number;
  spent: number;
  remaining: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, CategoryBudget>>({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setCategoryBudgets(response.data.categoryBudgets);
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
        {Object.entries(categoryBudgets).map(([category, data]) => (
          <Grid item xs={12} sm={6} key={category}>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Typography variant="h6">{category} Budget</Typography>
                <Typography variant="body1">Allocated: ₹{data.budget}</Typography>
                <Typography variant="body1">Spent: ₹{data.spent}</Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Remaining: ₹{data.remaining}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
