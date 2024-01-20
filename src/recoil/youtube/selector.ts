import { selector } from "recoil";
import { youtubeState } from "./atom";

export default selector({
  key: "youtubeSelector",
  get: ({get}) => {
    return get(youtubeState);
  },
  set: ({set}, newValue: any) => {
    // console.log(newValue);
    set(youtubeState, newValue);
  }
})