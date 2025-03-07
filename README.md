💰 Expense Tracker & Budget Management System
🚀 [View Live Demo](https://expense-tracker-frontend-livid-zeta.vercel.app/)


📌 Overview
Expense Tracker & Budget Management System is a full-stack web application designed to help users track their expenses, set category-wise budgets, and manage their financial goals effectively. The app provides a seamless authentication system, expense tracking, budget allocation, and a detailed dashboard to visualize spending patterns.

🌟 Features
✅ User Authentication - Secure JWT-based login & registration
✅ Category-wise Budgeting - Set individual budgets for each category
✅ Expense Tracking - Add, categorize, and monitor expenses
✅ Dashboard Analytics - View total expenses, remaining budget, and category-wise breakdown
✅ Seamless UI/UX - Built with React & Material UI for a modern, responsive experience
✅ RESTful APIs - Secure backend with Express, Sequelize ORM, and PostgreSQL/MySQL
✅ Cloud Deployment - Hosted using Vercel (Frontend), Render (Backend), and Railway (Database)

🛠️ Tech Stack
🌐 Frontend:
React.js (TypeScript) - Modern frontend framework
Material UI - Beautiful and responsive UI components
Axios - API communication
React Router - For seamless navigation
🖥️ Backend:
Node.js + Express.js - Lightweight and scalable API
JWT Authentication - Secure login & authorization
Sequelize ORM - Efficient database management
Express Validator - Backend validation
📦 Database & Hosting:
MySQL - Cloud database hosted on Railway
Backend Hosting - Render
Frontend Hosting - Vercel
📜 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login & receive JWT token
GET	/api/budgets	Fetch user’s budgets
POST	/api/budgets	Add a budget for a category
GET	/api/expenses	Get all expenses
POST	/api/expenses	Add a new expense
GET	/api/dashboard	Get category-wise budget & expenses
🔧 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2️⃣ Backend Setup
sh
Copy
Edit
cd expense-tracker-backend
npm install
Create a .env file in expense-tracker-backend/ and add:

sh
Copy
Edit
PORT=5000
DATABASE_URL=mysql://your-railway-db-url
JWT_SECRET=your_secret_key
Run the backend:

sh
Copy
Edit
npm run dev
3️⃣ Frontend Setup
sh
Copy
Edit
cd ../expense-tracker-frontend
npm install
Create a .env file in expense-tracker-frontend/ and add:

sh
Copy
Edit
VITE_API_BASE_URL=https://expense-tracker-and-budget-management.onrender.com/api
Run the frontend:

sh
Copy
Edit
npm start
App will run at: http://localhost:3000

🚀 Deployment
Frontend Deployment (Vercel)
sh
Copy
Edit
git add .
git commit -m "Deploy frontend"
git push origin main
Vercel will automatically deploy the latest version.

Backend Deployment (Render)
Push backend changes to GitHub
Deploy as a Web Service in Render
Add .env variables manually in Render
Database Deployment (Railway)
Create a PostgreSQL/MySQL instance on Railway
Copy the database URL and update in .env

🤝 Contributing
Fork the repository
Create a new branch: git checkout -b feature-branch
Commit your changes: git commit -m "Added feature"
Push to GitHub: git push origin feature-branch
Create a Pull Request 🚀
📜 License
This project is open-source and can be used for learning purposes or customization.

📞 Contact
📧 Email: www.swapnamoyrc@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/swapnamoy-roy-choudhury-b8a38b26a/

🚀 Happy Budgeting! 🎯