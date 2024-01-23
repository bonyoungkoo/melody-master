import { selector } from "recoil";
import { numberOfAnswerState } from "./atom";

export const numberOfAnswerSelector = selector({
  key: "numberOfAnswerSelector",
  get: ({get}) => {
    return get(numberOfAnswerState);
  },
  set: ({set}, newValue: any) => {
    set(numberOfAnswerState, newValue);
  }
})