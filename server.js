const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// declares variable 'app' for use
const app = express();

/* ======================\\
|| setting up middleware ||
\\====================== */

// uses dev logger by morgan
app.use(logger("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

// requires HTML and API routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});