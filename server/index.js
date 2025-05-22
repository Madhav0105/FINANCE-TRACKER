const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const Transaction = require("./models/Transaction");

mongoose.connect(process.env.MONGO_URI);

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
  const { title, amount, type } = req.body;
  const transaction = await Transaction.create({ title, amount, type });
  res.json(transaction);
});

app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(4000, () => console.log("Server running on port 4000"));
