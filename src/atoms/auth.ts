import { atom } from "recoil";
import * as lighty from "lighty-type";

export const userInfoAtom = atom<lighty.LoginFailResponse>({
  key: "card/Image",
  default: {
    name: "",
    email: "",
    provider: "GOOGLE",
  },
});

export const userTokenAtom = atom<lighty.LoginResponse | null>({
  key: "card/Image",
  default: null,
});
