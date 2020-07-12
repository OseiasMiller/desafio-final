import React, { useState, useEffect } from "react";
import Btn from "./components/Btn";
import Transaction from "./components/Transaction";
import axios from "axios";
import Loading from "./components/Loading";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("2020-07");
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/transaction/months").then((result) => {
      setMonths(result.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/transaction?period=${month}`)
      .then((transactions) => {
        setLoading(false);
        setTransactions(transactions.data.transactions);
      });
  }, [month]);

  const handleOnChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="container">
      <div className="center">
        <h3>Desafio Final do Bootcamp Full Stack</h3>
        <h4>Controle Financeiro Pessoal</h4>
      </div>
      <div
        className="center"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <Btn icon={"chevron_left"} />

        <select
          className="browser-default"
          style={{ width: "150px" }}
          value={month}
          onChange={handleOnChange}
        >
          {months.map((month) => {
            return (
              <option value={month} key={month}>
                {month}
              </option>
            );
          })}
        </select>

        <Btn icon={"chevron_right"} />
      </div>

      <div className="center">
        {loading ? (
          <Loading />
        ) : (
          transactions.map((transaction) => {
            return (
              <Transaction transaction={transaction} key={transaction._id} />
            );
          })
        )}
      </div>
    </div>
  );
}
