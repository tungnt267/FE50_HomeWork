import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleScoreAction,
  playGameAction,
} from "../../redux/actions/bauCuaActions";

class XucXac extends Component {
  renderXucXac = () => {
    return this.props.xucXac.map((item, index) => {
      return (
        <div key={index} className="mx-2 xucXac">
          <img src={item.image} alt={item.image} style={{ width: 80 }} />
        </div>
      );
    });
  };

  render() {
    let randomNum = Date.now();
    let keyframeCSS = `@keyframes animBauCua${randomNum} { 
            0% {
              transform: scale(1) rotate3d(-1, 1, 0, 0deg);
            }
            25% {
              transform: scale(0.4) rotate3d(-1, 1, 0, -90deg);
            }
            50% {
              transform: scale(1) rotate3d(-1, 1, 0, 90deg);
            }
            75% {
              transform: scale(1) rotate3d(-1, 1, 0, 0deg);
            }
            100% {
              transform: scale(1) rotate3d(-1, 1, 0, 0deg);
            }
        }
        .xucXac{
            transform: scale(1) rotate3d(-1, 1, 0, 0deg);
            position: relative;
            animation: animBauCua${randomNum} 3s;
        }`;
    return (
      <div>
        <div className="row mt-5">
          <div className="col-12">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <style>{keyframeCSS}</style>
              {this.renderXucXac()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-success pl-5 pr-5 mt-4 pt-2 pb-2"
              style={{ fontSize: 25 }}
              onClick={() => {
                this.props.playGame();
              }}
            >
              Xốc
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    xucXac: state.bauCuaReducer.xucXac,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playGame: () => {
      let num = 0;
      let dispatchPlay = setInterval(() => {
        num++;
        dispatch(playGameAction());
        if (num > 3) {
          // Stop
          clearInterval(dispatchPlay);
          dispatch(handleScoreAction());
        }
      }, 1000);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(XucXac);
