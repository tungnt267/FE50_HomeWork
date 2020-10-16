import React, { Component } from "react";
import BettingList from "../BettingList";
import Reward from "../Reward";
import XucXac from "../XucXac";
import "./style.css";

class Home extends Component {
  render() {
    return (
      <div className="game">
        <div className="container">
          <div className="title-game display-4 text-center text-danger mt-3">
            GAME BẦU CUA
          </div>
          <Reward />
          <BettingList />
          <XucXac />
        </div>
      </div>
    );
  }
}

export default Home;
