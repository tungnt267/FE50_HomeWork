import React, { Component } from "react";
import GlassesList from "../GlassesList";
import Header from "../Header";
import bgImage from "../../../assets/img/background.jpg";
import ModelBackGround from "../ModelBackground";

class Home extends Component {
  data = [
    {
      id: 1,
      price: 30,
      name: "GUCCI G8850U",
      url: "../../img/v1.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 2,
      price: 50,
      name: "GUCCI G8759H",
      url: "../../img/v2.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 3,
      price: 30,
      name: "DIOR D6700HQ",
      url: "../../img/v3.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 4,
      price: 30,
      name: "DIOR D6005U",
      url: "../../img/v4.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 5,
      price: 30,
      name: "PRADA P8750",
      url: "../../img/v5.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 6,
      price: 30,
      name: "PRADA P9700",
      url: "../../img/v6.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 7,
      price: 30,
      name: "FENDI F8750",
      url: "../../img/v7.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 8,
      price: 30,
      name: "FENDI F8500",
      url: "../../img/v8.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },

    {
      id: 9,
      price: 30,
      name: "FENDI F4300",
      url: "../../img/v9.png",
      desc:
        "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
  ];

  state = {
    selectedGlass: {},
  };

  getGlass = (glass) => {
    this.setState({
      selectedGlass: glass,
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#000000",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            minHeight: "100vh",
            backgroundSize: "cover",
            width: "90%",
            margin: "auto",
          }}
        >
          <div
            style={{ backgroundColor: "rgba(36,36,36,0.8)", height: "100vh" }}
          >
            <Header />
            <ModelBackGround selectedGlass={this.state.selectedGlass} />
            <GlassesList data={this.data} getGlass={this.getGlass} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
