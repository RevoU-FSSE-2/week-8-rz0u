import { message } from './../express-typescript-route/day-3/data';
// Environment -------------------------------------------------------------------
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { receipts } from "./data";
import { Receipt } from "./data";
// import jwt from "jsonwebtoken";

dotenv.config();

const app: Express = express();
const port = process.env.port || 1405;

app.use(bodyParser.json());
app.use(express.json());

// Landing
app.get("/", (req,res) => {
    res.send("Financial Tracker Week 8, use /transactions endpoint")    
});

// Get all Transactions -------------------------------------------------------
app.get("/transactions", (req,res) => {
    res.send({
        messages: "Here are all the transactions!",
        receipts,
    });
});

// Get Transactions by ID -----------------------------------------------------
app.get("/transactions/:id", (req:Request,res:Response) => {
    const receiptId = parseInt(req.params.id, 10);

    if (!Number.isNaN(receiptId)) {
        let receipt = receipts.filter((item) => item.id === receiptId);
        if (receipt.length !== 0) {
            res.json({
                message: "Here is the transaction youre looking for!",
                receipt,
            });
        } else {
            res.status(400).json({
                message: "Failed to find the transaction :("
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid transaction ID :("
        });
    }
});

// Post New Transaction(s) -----------------------------------------------------
app.post("/transactions", (req,res) => {
    console.log(req.body);

    let receipt = {
        id: receipts[receipts.length -1].id + 1,
        type: req.body.type,
        name: req.body.name,
        detail: req.body.detail,
        amount: req.body.amount,        
    };

    receipts.push(receipt);

    res.json({
        message: "Successfully adding new transaction(s)!",
        receipts,
    });
});

// Put (Updates existing object with the given ID) -----------------------------
app.put("/transactions/:id", (req,res) => {
    const receiptId = parseInt(req.params.id, 10);
    if (!Number.isNaN(receiptId)) {
        let updatedTransaction = req.body;

        const transactionIndex = receipts.findIndex((item) => item.id === receiptId);

        if (transactionIndex !== -1) {
            receipts[transactionIndex] = {
                ...updatedTransaction,
                id: receiptId,
            };
            res.json({
                message: "Transaction updated successfully!",
                updatedTransaction: receipts[transactionIndex],
            });
        } else {
            res.status(400).json({
                message: "Failed to find the transaction :("
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid transaction ID :("
        });
    }
});

// // Patch (Partially updates existing object with the given ID) -------------------------------------
app.patch("/transactions:id", (req,res) => {
    const updateReceipt = receipts;
    let success:boolean = false;
    for (let i = 0; i < updateReceipt.length; i++) {
        if (updateReceipt[i].id == +req.params.id) {
            const currReceipt = updateReceipt[i];
            if (req.body.id) { updateReceipt[i].id = req.body.id};
            if (req.body.type) { updateReceipt[i].type = req.body.type};
            if (req.body.name) { updateReceipt[i].name = req.body.name};
            if (req.body.detail) { updateReceipt[i].detail = req.body.detail};
            if (req.body.amount) { updateReceipt[i].amount = req.body.amount};
            success = true;
            res.json({
                message: "Transaction updated successfully!", currReceipt
            });
            console.log(req.body.id, req.body.type, req.body.detail);
        }
    }
})

// app.patch("/transactions/:id", (req: Request, res: Response) => {
//     const receiptId: number = parseInt(req.params.id, 10);

//     if (!Number.isNaN(receiptId)) {
//         const fieldToUpdate: keyof Receipt = req.body.field; // Request body contains field to update
//         const updatedValue = req.body.value; // Updated value for the field
//         console.log(req.body.field);
//         console.log(req.body.value);

//         // Find the transaction with the matching ID in the receipts array
//         const transaction = receipts.find((item) => item.id === receiptId);

//         if (transaction) {
//             // Update the specified field with the new value
//             (transaction as any)[fieldToUpdate] = updatedValue;

//             res.json({
//                 message: "Transaction updated successfully!",
//                 updatedTransaction: transaction,
//             });
//         } else {
//             res.json({
//                 message: "Transaction not found :("
//             });
//         }
//     } else {
//         res.json({
//             message: "Invalid transaction ID :("
//         });
//     }
// });

// Delete (*ID*)
app.delete("/transactions/:id", (req,res) => {
    const receiptId = parseInt(req.params.id, 10);
    if (!Number.isNaN(receiptId)) {
        const transactionIndex = receipts.findIndex((item) => item.id === receiptId);
        if(transactionIndex !== -1) {
            const deletedTransaction = receipts.splice(transactionIndex, 1)[0];

            res.json({
                message: "Transaction deleted successfully!",
                deletedTransaction,
            });
        } else {
            res.status(400).json({
                message: "Failed to find the transaction :("
            })
        }     
    } else {
        res.status(400).json({
            message: "Invalid transaction ID :("
        })
    }
})

// Not Found
app.get("*", (req, res) => {
    let body = `<h1>Error Page not found</h1>`;
    res.send(body);
  });

// Port ----------------------------------------------------------------------
app.listen(port, () => {
    console.log(`[server]: Server is running at localhost:${port}`);
});

// // User Data -------------------------------------------------------------------
// interface User {
//     username : string;
//     password: string;
//     role : string;
// };

// const users: User[] = [
//     { username: "reovu", password: "pass123", role: "user"},
//     { username: "donat", password: "123pass", role: "user"},
//     { username: "dion", password: "123admin", role: "admin"},
// ]

// // Books --------------------------------------------------------------------
// const books = [
//     { name : "harry 1"},
//     { name : "harry 2"},
//     { name : "harry 3"},
// ]

// // Secret Access Token -------------------------------------------------------
// const accessTokenSecret = process.env.secret || "secret";

// // Function Login >> Bearer Token JWT ----------------------------------------
// app.post("/login", (req,res) => {
//     const {username, password} = req.body;
//     console.log("body", username, password);

//     const user = users.find((item) => {
//         return item.username === username && item.password === password
//     });

//     if(user) {
//         const accessToken = jwt.sign(
//             {
//                 username : user.username,
//                 role : user.role,
//             },
//             accessTokenSecret!
//         );
//         res.json({
//             accessToken,
//         });
//     }
//     else {
//         res.send("Username or Password is Incorrect!");
//     }
// });

// // Endpoint Books ( only Admin )------------------------------------------------
// const verifyJWTAdmin = (req:any, res:Response, next:NextFunction) => {
//     const authHeader = req.headers.authorization;
//     console.log("cek auth header");

//     if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, authHeader, accessTokenSecret, (error:any, user:any) =>{
//             if(error) {
//                 console.log("jwt error", error);
//                 return res.status(401)
//             }
//             console.log("jwt okay", user);

//             // Pass Data
//             req.user = user as {username: string, role:string};
//             next()
//         });
//     } else {
//         console.log("No bearer token authorization found");
//         res.status(401);
//     }
// }

// app.get("/books", verifyJWTAdmin, (req:any,res:Response) => {
//     const { role } = 
// })