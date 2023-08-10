import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { receipts } from "./data"
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1405;

app.use(bodyParser.json());

// Get all Transactions
app.get("/transactions", (req,res) => {
    res.json({
        messages: "Here are all the transactions!",
        receipts,
    });
});

// Get Transactions by ID
app.get("/transactions/:id", (req,res) => {
    const receipt = receipts.filter((item:any) => item.id == req.params.id);
    
    res.json({
        message: "Here is the transaction you ask!",
        receipt,
    });
});

// Post New Transaction(s)
app.post("/transactions", (req,res) => {
    console.log(req.body.title);
    console.log(req.body.id);

    receipts.push(req.body);
    console.log(receipts);

    res.json({
        message: "Thankyou for using our service!",
        receipts,
    });
});
