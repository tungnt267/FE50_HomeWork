import React, { Component } from "react";
import modelImg from "../../../assets/img/model.jpg";
import ModelGlass from "../ModelGlass";
import "./style.css";

class ModelBackGround extends Component {
  render() {
    return (
      <div className="container text-center py-5">
        <div className="model-bg">
          <img className="model-img" src={modelImg} alt="model-img" />
          {this.props.selectedGlass.id && (
            <ModelGlass selectedGlass={this.props.selectedGlass} />
          )}
        </div>
      </div>
    );
  }
}

export default ModelBackGround;
