const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/Posts');

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

//Connect to db
mongoose.connect('mongodb+srv://shop-admin:qEHUuQEAsjlk6j4A@cluster0-tdi3x.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, 
    () => console.log('connected to DB')
);

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

//submit a post
app.post('/post', async (req, res) => {
  const post = new Post({
      title: req.body.title,
      description: req.body.description
  })
  try {
      const savePost = await post.save();
      res.json(savePost);
  } catch (err) {
      res.json({message: err});
  }
});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});


