import React from "react";

import "./Transaction.css";

export default function Transaction({ transaction }) {
  const { description, day, category, value, type } = transaction;
  return (
    <div
      className="transaction"
      style={{ backgroundColor: type === "+" ? "rgb(161, 240, 220)" : "" }}
    >
      <span className="dia">{day}</span>
      <div className="descricao">
        <div className="desc">
          <span>{category}</span>
          <span>{description}</span>
        </div>
        <span>
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="btn-div">
        <span className="material-icons">edit</span>
        <span className="material-icons">delete</span>
      </div>
    </div>
  );
}
