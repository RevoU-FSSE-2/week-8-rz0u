# Financial Tracker with Express and Node.Js

This project is a super simple financial tracker built using Express.js, Node.Js and TypeScript. It provides basic functionality to manage financial transactions using HTTP methods such as GET, POST, PUT, PATCH, and DELETE. Transactions can be tracked individually by their unique ID. Additionally, we will deploy the application using the Fly.io service.

## Usage
- Access to transactions history
- Add new transactions
- Edit old transactions
- Delete transactions

## Getting Started

1. Clone the repository: `git clone <https://github.com/rz0u/week-8-rz0u>`
2. Install dependencies: `npm install`
3. Build the TypeScript code: `npm run build`
4. Start the server: `npm start`

## Deployment with Fly.io

[Fly.io](https://fly.io) is a platform that simplifies deployment and scaling of applications globally. Here's how to deploy your Express TypeScript Financial Tracker to Fly.io:

1. Install the Fly CLI: `npm install -g @fly/fly`

2. Log in to your Fly.io account: `flyctl auth login`

3. Initialize Fly.io in your project directory: `flyctl init`

4. Update the `fly.toml` configuration file:

   ```toml
   app = "express-financial-tracker"

   [[services]]
     internal_port = 3000
     protocol = "tcp"

   [[deploy.targets]]
     name = "production"
   ```

5. Deploy your app to Fly.io: `flyctl deploy`

6. Open your deployed app in a web browser: `flyctl open`

## API Endpoints

### Get All Transactions

- **URL**: `/transactions`
- **Method**: GET
- **Response**: JSON array of all transactions.

### Get Transaction by ID

- **URL**: `/transactions/:id`
- **Method**: GET
- **Response**: JSON object representing the transaction with the given ID.

### Create Transaction

- **URL**: `/transactions`
- **Method**: POST
- **Request Body**: JSON object representing the new transaction.
  
  Example:
  ```json
  {
    "id": 1, 
    "type": "cash in", 
    "name": "gaji" , 
    "detail": "gaji agustus" , 
    "amount": 500.000
  }
  ```

- **Response**: JSON object representing the created transaction.

### Update Transaction

- **URL**: `/transactions/:id`
- **Method**: PUT or PATCH
- **Request Body**: JSON object containing the fields to update.
  
  Example:
  ```json
  {
    "id": 1, 
    "type": "cash in", 
    "name": "gaji + bonus" , 
    "detail": "gaji agustus + bonus menang lomba" , 
    "amount": 550.000
  }
  ```

- **Response**: JSON object representing the updated transaction.

### Delete Transaction

- **URL**: `/transactions/:id`
- **Method**: DELETE
- **Response**: JSON object indicating the success of the deletion.

## Transaction Object

A transaction object has the following properties:

- `id`: Unique identifier for the transaction.
- `type`: Cash In for income, Cash Out for expenses.
- `name`: Brief Name / Source of income.
- `detail`: Description of the transaction.
- `amount`: The transaction amount.

## Example Usage

Assuming the server is running locally on port 3000:

- To get all transactions: `GET http://localhost:3000/transactions`
- To get a transaction by ID: `GET http://localhost:3000/transactions/:id`
- To create a new transaction: `POST http://localhost:3000/transactions`
- To update a transaction by ID: `PUT http://localhost:3000/transactions/:id` or `PATCH http://localhost:3000/transactions/:id`
- To delete a transaction by ID: `DELETE http://localhost:3000/transactions/:id`

## Conclusion

This Express TypeScript Financial Tracker provides a simple yet effective way to manage and track financial transactions. It's a starting point that can be extended with additional features such as authentication, data validation, and more advanced querying options. Happy tracking!