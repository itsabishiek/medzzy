import { atom } from "recoil";

const defaultGlobalState = {
  sidebarShow: false,
};

export const globalState = atom({
  key: "globalState",
  default: defaultGlobalState,
});
