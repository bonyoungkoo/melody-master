import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const numberOfAnswerState = atom({
  key: 'numberOfAnswerState',
  default: 0,
  effects_UNSTABLE: [persistAtom]
})