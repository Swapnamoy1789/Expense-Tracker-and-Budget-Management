import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { api } from "../utils/api";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { ArrowBack, Brightness4, Brightness7 } from "@mui/icons-material"; // ✅ Import Back Arrow Icon
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

const Reports: React.FC = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<{ [key: string]: number }>({});
  const [categoryExpenses, setCategoryExpenses] = useState<{ [key: string]: number }>({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }

      const response = await api.get("/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      setExpenses(Array.isArray(response.data.expenses) ? response.data.expenses : []);

      const categoryTotals: { [key: string]: number } = {};
      response.data.expenses.forEach((expense: Expense) => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      });
      setCategoryExpenses(categoryTotals);

      const monthlyTotals: { [key: string]: number } = {};
      response.data.expenses.forEach((expense: Expense) => {
        const month = new Date(expense.date).toLocaleString("default", { month: "short", year: "numeric" });
        monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
      });
      setMonthlyExpenses(monthlyTotals);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(expenses);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "expense_report.csv");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, "expense_report.xlsx");
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // ✅ Pie Chart Data
  const categoryChartData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
      },
    ],
  };

  // ✅ Bar Chart Data
  const monthlyChartData = {
    labels: Object.keys(monthlyExpenses),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyExpenses),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          background: darkMode ? "linear-gradient(to right, #232526, #414345)" : "linear-gradient(to right, #ffafbd, #ffc3a0)",
          color: darkMode ? "#fff" : "#000",
          padding: "30px",
          minHeight: "100vh",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {/* ✅ Back Button to Home */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>

        <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ position: "absolute", right: 20, top: 20, color: darkMode ? "#fff" : "#000" }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Expense Reports
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: "10px", background: darkMode ? "#333" : "#fff" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Amount</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(expenses) && expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>₹{expense.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: "center", fontWeight: "bold", color: "gray" }}>
                    No expenses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ✅ Charts Section */}
        <Box mt={4} display="flex" justifyContent="space-around">
          <Paper sx={{ padding: "20px", borderRadius: "10px", width: "45%" }}>
            <Typography variant="h6" align="center">Expenses by Category</Typography>
            <Pie data={categoryChartData} />
          </Paper>
          <Paper sx={{ padding: "20px", borderRadius: "10px", width: "45%" }}>
            <Typography variant="h6" align="center">Monthly Expenses</Typography>
            <Bar data={monthlyChartData} />
          </Paper>
        </Box>

        {/* ✅ Export Buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Download CSV
          </Button>
          <Button variant="contained" color="secondary" onClick={exportToExcel}>
            Download Excel
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Reports;
