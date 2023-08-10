"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_1 = require("./data");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 1405;
app.use(body_parser_1.default.json());
// Get all Transactions
app.get("/transactions", (req, res) => {
    res.json({
        messages: "Here are all the transactions!",
        receipts: data_1.receipts,
    });
});
// Get Transactions by ID
app.get("/transactions/:id", (req, res) => {
    const receipt = data_1.receipts.filter((item) => item.id == req.params.id);
    res.json({
        message: "Here is the transaction you ask!",
        receipt,
    });
});
// Post New Transaction(s)
app.post("/transactions", (req, res) => {
    console.log(req.body.title);
    console.log(req.body.id);
    data_1.receipts.push(req.body);
    console.log(data_1.receipts);
    res.json({
        message: "Thankyou for using our service!",
        receipts: data_1.receipts,
    });
});
