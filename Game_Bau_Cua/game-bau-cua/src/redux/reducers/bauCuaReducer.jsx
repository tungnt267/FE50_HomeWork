import {
  HANDLE_SCORE,
  PLACE_A_BET,
  PLAY_GAME,
} from "../constants/bauCuaConstants";

const initialState = {
  bettingList: [
    { id: "cua", image: "./img/cua.png", betScore: 0 },
    { id: "nai", image: "./img/nai.png", betScore: 0 },
    { id: "ga", image: "./img/ga.png", betScore: 0 },
    { id: "tom", image: "./img/tom.png", betScore: 0 },
    { id: "ca", image: "./img/ca.png", betScore: 0 },
    { id: "bau", image: "./img/bau.png", betScore: 0 },
  ],
  xucXac: [
    { id: "cua", image: "./img/cua.png" },
    { id: "nai", image: "./img/nai.png" },
    { id: "ga", image: "./img/ga.png" },
  ],
  rewardScore: 500,
};

const bauCuaReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_GAME: {
      let { bettingList } = state;

      // Random xuc xac
      let xucXacRandomArray = [];
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * 6);
        let xucXacRandom = {
          id: bettingList[randomIndex].id,
          image: bettingList[randomIndex].image,
        };
        xucXacRandomArray.push(xucXacRandom);
      }
      state.xucXac = xucXacRandomArray;
      return { ...state };
    }

    case HANDLE_SCORE: {
      let {
        bettingList,
        rewardScore,
        xucXac: [...xucXac],
      } = state;

      // Handle reward score
      for (let xucXacRandom of xucXac) {
        const indexBetList = bettingList.findIndex(
          (item) => item.id === xucXacRandom.id
        );
        if (indexBetList !== -1) {
          rewardScore += bettingList[indexBetList].betScore;
        }
      }
      // Handle refund
      for (let bet of bettingList) {
        const indexXucXac = xucXac.findIndex((item) => item.id === bet.id);
        if (indexXucXac !== -1) {
          rewardScore += bet.betScore;
        }
      }
      state.rewardScore = rewardScore;

      // Reset bet score
      bettingList = state.bettingList.map((item, index) => {
        return { ...item, betScore: 0 };
      });
      state.bettingList = bettingList;

      return { ...state };
    }

    case PLACE_A_BET: {
      let {
        rewardScore,
        bettingList: [...bettingList],
      } = state;
      const index = bettingList.findIndex(
        (item) => item.id === action.payload.bet.id
      );

      if (index !== -1) {
        const selectedBet = { ...bettingList[index] };
        if (action.payload.status) {
          if (rewardScore > 0) {
            selectedBet.betScore += 100;
            rewardScore -= 100;
          }
        } else {
          if (selectedBet.betScore > 0) {
            selectedBet.betScore -= 100;
            rewardScore += 100;
          }
        }
        bettingList[index] = selectedBet;
      }

      state.bettingList = bettingList;
      state.rewardScore = rewardScore;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default bauCuaReducer;
