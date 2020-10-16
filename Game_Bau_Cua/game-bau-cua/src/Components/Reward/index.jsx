import React, { Component } from "react";
import { connect } from "react-redux";

class Reward extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 text-center">
            <div className="text-center mt-5">
              <span className="p-3 bg-warning score">
                Tiền thưởng:
                <span className="text-success pl-2">
                  {this.props.rewardScore} điểm
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rewardScore: state.bauCuaReducer.rewardScore,
  };
};

export default connect(mapStateToProps, null)(Reward);
