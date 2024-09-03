"use client"

import { generateMnemonic } from "bip39";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { walletCountAtom, seedPhraseAtom, blockchainAtom, mnemonicAtom } from "../lib/store/atoms/atom";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

export const SeedPhraseGenerator = () => {
  const blockchainCode = useRecoilValue(blockchainAtom);
  const [ currentIndex, setCurrentIndex ] = useRecoilState(walletCountAtom)
  const [ seedPhraseArray, setSeedPhraseArray ] = useRecoilState(seedPhraseAtom)
  const setMnemonic = useSetRecoilState(mnemonicAtom)

  const generateSeedPhrase = () => {
    const mnemonic = generateMnemonic();
    const mnemonicArray = mnemonic.split(" ");
    setSeedPhraseArray(mnemonicArray);
    setMnemonic(mnemonic)
    setCurrentIndex(currentIndex+1)
  }

  return <div className={cn('w-full flex flex-col gap-6 p-6', {'hidden': blockchainCode==''})}>
    <div>
      <div className='text-3xl raleway-heading-one'>Your Secret Recovery Phrase</div>
      <div className="text-xl text-gray-200 raleway-heading-two">Save these words in a safe place.</div>
    </div>
    <div className="flex flex-col gap-4">
      <input className='w-full bg-transparent raleway-body p-4 rounded-lg text-xl border border-gray-400 placeholder:text-gray-200 outline-1 outline-white' type='text' placeholder='Enter your secret phrase (or leave blank to generate)'></input>
      <Button className='p-6 text-lg w-fit' onClick={generateSeedPhrase}>Create Phrase</Button>
    </div>
  </div>
}