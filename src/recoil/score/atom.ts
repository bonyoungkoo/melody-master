import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const scoreState = atom({
  key: 'scoreState',
  default: {
    playTime: null,
    numberOfAnswer: null
  },
  effects_UNSTABLE: [persistAtom]
})
