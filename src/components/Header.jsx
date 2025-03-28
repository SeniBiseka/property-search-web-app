import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Find Your Dream Space Today</h1>
    </header>
  );
}

const headerStyle = {
    color: "#fff",
    padding: "50px 20px",
    textAlign: "center",
  };

export default Header;
