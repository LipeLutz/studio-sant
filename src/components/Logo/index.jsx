import React from "react";
import "./index.css";

function Logo() {
  return (
    <div
      style={{
        width: "fit-content",
        minWidth: "max-content",
        textAlign: "center",
      }}
    >
      <h1 className="highText">
        <span style={{ fontWeight: "100" }}>Studio</span>
        <span style={{ fontWeight: "400", marginLeft: "5px" }}>J.Sant </span>
      </h1>
      <h6
        className="lowText"
        style={{
          fontWeight: "300",
        }}
      >
        arquitetura . arte . design
      </h6>
    </div>
  );
}

export default Logo;
