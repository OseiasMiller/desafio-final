import React from "react";

export default function Btn({ icon }) {
  return (
    <button
      className="waves-effect waves-light btn"
      style={{ marginRight: "5px", marginLeft: "5px" }}
    >
      <i className="material-icons">{icon}</i>
    </button>
  );
}
