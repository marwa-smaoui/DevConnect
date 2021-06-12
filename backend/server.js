const express = require("express");
const connectDB= require('./config/connectDB');
const app = express();

app.use(express.json());


// define routes
app.use('/api/contacts', require('./routes/api/contactRouter'))
app.use('/api/auth', require('./routes/api/authRouter'))
app.use('/api/profile', require('./routes/api/profileRouter'))
app.use('/api/posts', require('./routes/api/postsRouter'))

require("dotenv").config({ path: "./config/.env" });

// connect db
connectDB();

const PORT = 5000;
app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`the server is running on port ${PORT}`)
);
