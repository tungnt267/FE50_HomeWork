import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { placeABetAction } from "../../redux/actions/bauCuaActions";

class BettingList extends Component {
  renderBettingList = () => {
    return this.props.bettingList.map((item, index) => {
      return (
        <div key={index} className="col-4 text-center mt-4 p-0">
          <img src={item.image} alt={item.image} className="img-betting" />
          <br />
          <br />
          <span className="sp-amount p-3 pl-md-2 pr-md-2 pl-lg-4 pr-lg-4 bg-warning">
            Cược:
            <button
              className="btn btn-amount btn-success ml-1 ml-md-2"
              style={{ fontSize: 15 }}
              onClick={() => {
                this.props.placeABet(item, false);
              }}
            >
              -
            </button>
            <span className="text-success mx-sm-1 mx-md-2">
              {item.betScore}
            </span>
            <button
              onClick={() => {
                this.props.placeABet(item, true);
              }}
              className="btn btn-amount btn-success"
              style={{ fontSize: 15 }}
            >
              +
            </button>
          </span>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="betting container px-0 px-xl-5">
        <div className="row px-0 px-lg-5">
          <div className="col-12">
            <div className="row text-center mt-5">
              {this.renderBettingList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bettingList: state.bauCuaReducer.bettingList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeABet: (bet, status) => {
      dispatch(placeABetAction(bet, status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BettingList);
