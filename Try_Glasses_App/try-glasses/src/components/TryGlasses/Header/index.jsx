import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  render() {
    return (
      <div>
        <h4
          className="header text-center text-white font-weight-bold py-4"
          style={{ backgroundColor: "rgba(36,36,36,0.8)" }}
        >
          TRY GLASSES APP ONLINE
        </h4>
      </div>
    );
  }
}

export default Header;
