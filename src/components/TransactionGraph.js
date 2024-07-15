import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "./TransactionGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionGraph = ({ customerId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get("http://localhost:5000/transactions");
      setTransactions(
        response.data.filter(
          (transaction) => transaction.customer_id === customerId
        )
      );
    };
    fetchTransactions();
  }, [customerId]);

  const data = {
    labels: [...new Set(transactions.map((transaction) => transaction.date))],
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.reduce((acc, transaction) => {
          acc[transaction.date] =
            (acc[transaction.date] || 0) + transaction.amount;
          return acc;
        }, {}),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bar-container">
      <h2>Transactions for Customer {customerId}</h2>
      <Bar
        data={{
          labels: Object.keys(data.datasets[0].data),
          datasets: [
            {
              label: "Total Transaction Amount",
              data: Object.values(data.datasets[0].data),
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default TransactionGraph;
