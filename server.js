const express = require("express");
const app = express();

const auth = require("./middleware/auth");

// Connect Database
require("./config/db")();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", auth, require("./routes/contacts"));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
