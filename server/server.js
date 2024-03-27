require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const router = require("./router/auth-router");
const connectDb = require('./utils/db')

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD", // Allow specific HTTP methods
    credential: true,

};
  
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(()=>{
    app.listen(PORT);
});
