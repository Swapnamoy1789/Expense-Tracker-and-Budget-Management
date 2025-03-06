import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import API_BASE_URL from "../utils/api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // ✅ Import Back Arrow Icon

interface Budget {
  id: number;
  category: string;
  limit: number;
}

const Budgets = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budgets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const addBudget = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/budgets`,
        { category: newCategory, limit: newLimit },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchBudgets();
      setNewCategory(""); // ✅ Reset form after adding budget
      setNewLimit("");
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(to right, #11998e, #38ef7d)",
        color: "white",
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

      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: "bold" }}>
        Budget Management
      </Typography>

      {/* Add Budget Form */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.9)", color: "black" }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} fullWidth />
          <TextField label="Limit" type="number" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} fullWidth />
          <Button onClick={addBudget} variant="contained" color="primary" fullWidth>
            Add Budget
          </Button>
        </Box>
      </Paper>

      {/* Budgets Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px", borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Limit</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.category}</TableCell>
                <TableCell>₹{budget.limit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Budgets;
