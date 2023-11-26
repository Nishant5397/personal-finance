import React from "react";
import transactions from "../../assets/transactions.svg";
import './styles.css'
function NoTransactions() {
  return (
    <div className="no-transaction">
      <img src={transactions} style={{ width: "400px", margin: "4rem" }} />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
}

export default NoTransactions;