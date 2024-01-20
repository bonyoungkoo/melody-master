import { selector } from "recoil";
import { scoreState } from "./atom";

export default selector({
  key: "scoreSelector",
  get: ({get}) => {
    return get(scoreState);
  },
  set: ({set}, newValue: any) => {
    set(scoreState, newValue);
  }
})