import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import API_BASE_URL from "../utils/api";
import axios from "axios";
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
  Select,
  MenuItem,
  Box,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // ✅ Import Back Arrow Icon
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Expenses = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async () => {
    if (!description || !amount || !category || !date) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/api/expenses`,
        { description, amount: parseFloat(amount), category, date: date.format("YYYY-MM-DD") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchExpenses();
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(null);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)",
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
        Expenses
      </Typography>

      {/* Add Expense Form */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.9)", color: "black" }}>
        <Typography variant="h6" gutterBottom>Add New Expense</Typography>
        <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
        <TextField fullWidth label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} margin="normal" />
        <Select fullWidth value={category} onChange={(e) => setCategory(e.target.value)} displayEmpty style={{ marginTop: "16px" }}>
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" value={date} onChange={(newDate) => setDate(newDate)} format="YYYY-MM-DD" slotProps={{ textField: { fullWidth: true, margin: "normal" } }} />
        </LocalizationProvider>
        <Button fullWidth variant="contained" color="primary" onClick={addExpense} style={{ marginTop: "20px" }}>Add Expense</Button>
      </Paper>

      {/* Filters Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} marginTop={3}>
        {/* Date Filter */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Filter by Date"
            value={filterDate}
            onChange={(newDate) => setFilterDate(newDate)}
            format="YYYY-MM-DD"
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>

        {/* Category Filter */}
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          displayEmpty
          fullWidth
          style={{ height: "40px" }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
      </Box>

      {/* Expenses Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px", borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses
              .filter((expense) => (filterCategory ? expense.category === filterCategory : true))
              .filter((expense) => (filterDate ? dayjs(expense.date).isSame(filterDate, "day") : true))
              .map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{dayjs(expense.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>
                    <Button onClick={() => deleteExpense(expense.id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Expenses;
