import React, { Component } from "react";

class GlassItem extends Component {
  render() {
    const { url } = this.props.item;
    return (
      <img
        onClick={() => this.props.getGlass(this.props.item)}
        src={url}
        alt="glass-img"
      />
    );
  }
}

export default GlassItem;
