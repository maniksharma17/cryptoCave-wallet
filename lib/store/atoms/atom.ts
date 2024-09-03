import { PublicKey } from "@solana/web3.js";
import { atom } from "recoil";

export const blockchainAtom = atom({
  key: 'blockchainAtom',
  default: ''
})

export const walletCountAtom = atom({
  key: 'walletCountAtom',
  default: 0
})

export const seedPhraseAtom = atom<String[]>({
  key: 'seedPhraseAtom',
  default: []
})
export const mnemonicAtom = atom({
  key: 'mnemonicAtom',
  default: ''
})

interface WalletTypes {
  id: number,
  publicKey: PublicKey|string,
  privateKey: Uint8Array|string
}
export const WalletsAtom = atom<WalletTypes[]>({
  key: 'walletsAtom',
  default: []
})

