const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const employeeRoutes = require("./controllers/employee.controller");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://example.com", "http://localhost:3000"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use("/api/employees", employeeRoutes);
app.use(errorHandler);

// Database connection and server start
db.query("SELECT 1")
  .then(() => {
    console.log("MySQL successfully connected!");
    app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("DB connection failed: ", err));
