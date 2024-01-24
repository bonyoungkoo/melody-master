import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const numberOfAHitState = atom({
  key: 'numberOfAnswerState',
  default: 0,
  effects_UNSTABLE: [persistAtom]
})

export const numberOfMissState = atom({
  key: 'numberOfAHitState',
  default: 0,
  effects_UNSTABLE: [persistAtom]
})