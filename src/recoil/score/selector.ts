import { selector } from "recoil";
import { numberOfAHitState, numberOfMissState } from "./atom";

export const numberOfHitSelector = selector({
  key: "numberOfHitSelector",
  get: ({get}) => {
    return get(numberOfAHitState);
  },
  set: ({set}, newValue: any) => {
    set(numberOfAHitState, newValue);
  }
})

export const numberOfMissSelector = selector({
  key: "numberOfMissSelector",
  get: ({get}) => {
    return get(numberOfMissState);
  },
  set: ({set}, newValue: any) => {
    set(numberOfMissState, newValue);
  }
})