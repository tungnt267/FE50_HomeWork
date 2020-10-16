import {
  PLACE_A_BET,
  PLAY_GAME,
  HANDLE_SCORE,
} from "../constants/bauCuaConstants";

export function playGameAction() {
  return {
    type: PLAY_GAME,
  };
}

export function handleScoreAction() {
  return {
    type: HANDLE_SCORE,
  };
}

export function placeABetAction(bet, status) {
  return {
    type: PLACE_A_BET,
    payload: { bet, status },
  };
}
