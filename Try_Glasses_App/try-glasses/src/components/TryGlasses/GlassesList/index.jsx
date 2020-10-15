import React, { Component } from "react";
import GlassItem from "../GlassItem";
import "./style.css";

class GlassesList extends Component {
  renderGlasses = () => {
    return this.props.data.map((item, index) => {
      return (
        <span style={{ cursor: "pointer" }} key={index}>
          <GlassItem item={item} getGlass={this.props.getGlass} />
        </span>
      );
    });
  };
  render() {
    return (
      <div className="container mt-5">
        <div id="glassesList" style={{ width: "80%", margin: "auto" }}>
          {this.renderGlasses()}
        </div>
      </div>
    );
  }
}

export default GlassesList;
