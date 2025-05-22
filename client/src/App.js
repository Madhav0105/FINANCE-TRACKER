import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async () => {
    if (!title || !amount) return;
    try {
      await axios.post("http://localhost:4000/api/transactions", {
        title,
        amount: parseFloat(amount),
        type,
      });
      setTitle("");
      setAmount("");
      setType("expense");
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const balance = transactions.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const incomeItems = transactions.filter((t) => t.type === "income");
  const expenseItems = transactions.filter((t) => t.type === "expense");

  const incomeLabels = incomeItems.map((t) => t.title);
  const incomeData = incomeItems.map((t) => t.amount);

  const expenseLabels = expenseItems.map((t) => t.title);
  const expenseData = expenseItems.map((t) => t.amount);

  return (
    <div
      className="app-container"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "900",
          fontSize: "3rem",
          color: "#2c3e50",
          letterSpacing: "1.5px",
        }}
      >
        Finance Tracker
      </h1>

      <div
        className="card"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div
          className="top-row"
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div
            className="form"
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              padding: "20px",
              borderRadius: "12px",
              border: "1.8px solid #ddd",
              boxShadow: "0 0 10px rgba(0,0,0,0.03)",
              background: "#fafafa",
              minWidth: "280px",
            }}
          >
            <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
              Add Transaction
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1.8px solid #ddd",
                outline: "none",
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1.8px solid #ddd",
                outline: "none",
              }}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1.8px solid #ddd",
                outline: "none",
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button
              onClick={addTransaction}
              style={{
                background: "#3498db",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "10px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#2980b9")}
              onMouseLeave={(e) => (e.target.style.background = "#3498db")}
            >
              Add Transaction
            </button>
            <div
              className="balance"
              style={{
                marginTop: "auto",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "700",
                color: balance >= 0 ? "green" : "red",
              }}
            >
              Balance: ₹{balance.toFixed(2)}
            </div>
          </div>

          <div
            style={{
              flex: "1",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <PieChart
              labels={incomeLabels}
              data={incomeData}
              chartTitle="💹 Income Breakdown"
            />
          </div>

          <div
            style={{
              flex: "1",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <PieChart
              labels={expenseLabels}
              data={expenseData}
              chartTitle="💸 Expense Breakdown"
            />
          </div>
        </div>

        <div
          className="transactions"
          style={{
            background: "#fafafa",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              borderBottom: "2px solid #3498db",
              paddingBottom: "5px",
              fontWeight: "700",
              color: "#333",
              textAlign: "center",
            }}
          >
            Transactions
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {transactions.length === 0 && (
              <li style={{ textAlign: "center", color: "#777" }}>
                No transactions yet.
              </li>
            )}
            {transactions.map((t) => (
              <li
                key={t._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  color: t.type === "income" ? "green" : "red",
                  fontWeight: "600",
                  fontSize: "14px",
                  gap: "10px",
                }}
              >
                <span style={{ flex: "3" }}>{t.title}</span>
                <span style={{ flex: "1", textAlign: "right" }}>
                  ₹{t.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteTransaction(t._id)}
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "1",
                  }}
                  title="Delete transaction"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
