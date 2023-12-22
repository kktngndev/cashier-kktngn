import { atom } from "recoil";

export const cartItemAtom = atom({
  key: 'cartItemAtom',
  default: []
})

export const cartTotalAtom = atom({
  key: 'cartTotalAtom',
  default: 0
})

export const checkedCategoryAtom = atom({
  key: 'checkedCategoryAtom',
  default: 'Post Modernism'
})

export const paymentAtom = atom({
  key: 'paymentAtom',
  default: 0
}) 