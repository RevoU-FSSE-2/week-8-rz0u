const express = require("express");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 8888;

dotenv.config();

app.get('/', (req,res) => {
    res.send('lagi belajar express');
})

app.listen (port, () => {
    console.log(`server listen ${port}`);
});