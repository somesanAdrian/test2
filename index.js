const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

//Import routes
const postsRoutes = require('./routes/posts');

app.use('/posts', postsRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

// Mock API
app.get("/users", (req, res) => {
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" }
  ]);
});

app.post("/user", (req, res) => {
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

//Connect to db
mongoose.connect('mongodb+srv://shop-admin:qEHUuQEAsjlk6j4A@cluster0-tdi3x.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, 
    () => console.log('connected to DB')
);

