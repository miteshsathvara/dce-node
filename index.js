const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const cookieParser = require('cookie-parser');

// parse requests of content-type - application/json
app.use(express.json());

app.use(cookieParser())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// model;
require("./app/config/db.config");
// routes
require("./app/routes/auth.routes")(app);
require('./app/routes/user.routes')(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});