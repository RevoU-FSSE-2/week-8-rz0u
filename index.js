"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var data_1 = require("./data");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 1405;
app.use(body_parser_1.default.json());
// Get all Transactions
app.get("/transactions", function (req, res) {
    res.json({
        messages: "Here are all the transactions!",
        receipts: data_1.receipts,
    });
});
// Get Transactions by ID
app.get("/transactions/:id", function (req, res) {
    var receipt = data_1.receipts.filter(function (item) { return item.id == req.params.id; });
    res.json({
        message: "Here is the transaction you ask!",
        receipt: receipt,
    });
});
// Post New Transaction(s)
app.post("/transactions", function (req, res) {
    console.log(req.body.title);
    console.log(req.body.id);
    data_1.receipts.push(req.body);
    console.log(data_1.receipts);
    res.json({
        message: "Thankyou for using our service!",
        receipts: data_1.receipts,
    });
});
