import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerTable.css";

const CustomerTable = ({ selectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const transactionResponse = await axios.get(
        "http://localhost:5000/transactions"
      );
      const customerResponse = await axios.get(
        "http://localhost:5000/customers"
      );
      setTransactions(transactionResponse.data);
      setCustomers(customerResponse.data);
    };
    fetchData();
  }, []);

  const getCustomerName = (customerId) => {
    const customer = customers.find(
      (customer) => String(customer.id) === String(customerId)
    );
    return customer ? customer.name : "Unknown";
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      getCustomerName(transaction.customer_id)
        .toLowerCase()
        .includes(filter.toLowerCase()) &&
      transaction.amount.toString().includes(amountFilter)
  );

  return (
    <div className="customer-table-container">
      <input
        type="text"
        placeholder="Filter by customer name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filter by transaction amount"
        value={amountFilter}
        onChange={(e) => setAmountFilter(e.target.value)}
        className="filter-input"
      />
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transaction Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              onClick={() => selectCustomer(transaction.customer_id)}
              className="customer-row"
            >
              <td>{getCustomerName(transaction.customer_id)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
