import React, { Component } from "react";

class ModelGlass extends Component {
  render() {
    const { url, name, desc } = this.props.selectedGlass;
    return (
      <div>
        <div className="model-glass">
          <img src={url} alt="glass-img" />
        </div>
        <div className="glass-detail text-left m-auto">
          <h6 className="glass-name">{name}</h6>
          <p>{desc}</p>
        </div>
      </div>
    );
  }
}

export default ModelGlass;
