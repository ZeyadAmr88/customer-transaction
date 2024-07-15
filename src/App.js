import React, { useState } from "react";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";
import "./App.css";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="App">
      <h1>Customer Transactions</h1>
      <h3>Click on Customer to get the chart</h3>
      <CustomerTable selectCustomer={setSelectedCustomer} />
      {selectedCustomer && <TransactionGraph customerId={selectedCustomer} />}
    </div>
  );
}

export default App;
