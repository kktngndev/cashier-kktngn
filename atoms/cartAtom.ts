import { atom } from "recoil";

export const cartItemAtom = atom({
  key: 'cartItemAtom',
  default: []
})

export const cartTotalAtom = atom({
  key: 'cartTotalAtom',
  default: 0
})