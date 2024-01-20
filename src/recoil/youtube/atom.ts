import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const youtubeState = atom({
  key: 'youtubeState',
  default: {
    initialList: [],
    currentList: []
  },
  effects_UNSTABLE: [persistAtom]
})
