"use client"

import { useRecoilState } from "recoil";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";
import { WalletsAtom, walletCountAtom } from "@/lib/store/atoms/atom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const CreateWalletButton = ({mnemonic, blockchainCode}: {mnemonic: string, blockchainCode: string}) => {
  const [ walletsArray, setWalletsArray ] = useRecoilState(WalletsAtom);
  const [ currentIndex, setCurrentIndex ] = useRecoilState(walletCountAtom)

  const createWallet = () => {
    createWalletHandler({blockchainCode, mnemonic, currentIndex, setCurrentIndex, walletsArray, setWalletsArray})
  }

  if(blockchainCode=='501'){
    return <div>
      <Button className={cn('p-6 text-xl my-6', {'hidden': mnemonic==''})} onClick={createWallet}>Add SOL Wallet</Button>
    </div>
  } else if(blockchainCode=='60'){
    return <div>
      <Button className={cn('p-6 text-lg my-6', {'hidden': mnemonic==''})} onClick={createWallet}>Add ETH Wallet</Button>
    </div>
  }
}

const createWalletHandler = async ({blockchainCode, mnemonic, currentIndex, setCurrentIndex, walletsArray, setWalletsArray}: createWalletHandlerTypes) => {
  if(blockchainCode=='501'){
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString()).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex+1);
    setWalletsArray([...walletsArray, {id: currentIndex, publicKey: keypair.publicKey, privateKey: secret}])
  } 
  else if(blockchainCode=='60'){
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setWalletsArray([...walletsArray, {id: currentIndex, publicKey: child.publicKey, privateKey: privateKey}])

  }
}