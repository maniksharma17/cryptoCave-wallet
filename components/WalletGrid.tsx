"use client"


import { PublicKey } from "@solana/web3.js"
import { useRecoilValue, useRecoilState } from "recoil"
import { blockchainAtom, WalletsAtom } from "@/lib/store/atoms/atom"
import bs58 from 'bs58'
import { useState } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { useToast } from "./ui/use-toast"
import trashIcon from '../public/Trash.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface WalletTypes {
  id: number,
  publicKey: PublicKey|string,
  privateKey: Uint8Array|string
}


export const WalletsGrid = ({wallets}: {wallets: WalletTypes[]}) => {
  
  const blockchainCode = useRecoilValue(blockchainAtom)

  let index = 0;

  return <div className='mx-8 mt-8 h-auto grid grid-cols-2 gap-4'>
    
    {wallets.map((wallet) => {
      let publicKey = ''
      let privateKey = ''
      if(blockchainCode=='501'){
        publicKey = (wallet.publicKey as PublicKey).toBase58()
        privateKey = bs58.encode(wallet.privateKey as Uint8Array)
      } else {
        publicKey = wallet.publicKey as string
        privateKey =  wallet.privateKey as string
      }

      index++
      
      return <WalletCard wallet={wallet} publicKey={publicKey} privateKey={privateKey} index={index}></WalletCard>
    })}
  </div>
}

const WalletCard = ({wallet, publicKey, privateKey, index}: any) => {
  const [ walletsArray, setWalletsArray ] = useRecoilState(WalletsAtom)
  const [ visibility, setVisibility ] = useState(false)
  const { toast } = useToast()

  return <div key={wallet.id}>  
  <Card className="bg-gray-800 border-gray-700 shadow-xl">
    <CardHeader className='relative bg-white text-black rounded-xl mb-8 rounded-b-none'>
      <button onClick={()=>{
        let newArray = [...walletsArray]
        newArray = newArray.filter(item => item.id != wallet.id)
        setWalletsArray(newArray)

      }} className='absolute top-4 right-4 w-fit'><Image src={trashIcon} alt='delete' height={20} width={20}></Image></button>
      <CardTitle className='font-bold text-2xl'>Wallet {index}</CardTitle>
      <CardDescription>cryptoCave Wallet</CardDescription>
    </CardHeader>
    <CardContent className='flex flex-col gap-4'>
      <div className='w-auto p-3 flex flex-col gap-2 rounded-lg border bg-white text-black'>
        <div className='raleway-heading-one mb-1'>Public Key</div>
        <div className='w-full overflow-scroll bg-zinc-100 p-2 rounded'>
          <pre>{publicKey}</pre>
        </div>
        <Button variant={'outline'} onClick={()=>{
          navigator.clipboard.writeText(publicKey)
          toast({
            title: 'Public key has been selected.',
            description: 'You can now paste it elsewhere.'
          })
        }} 
        className='py-1 rounded-ls w-fit cursor-pointer'>Copy</Button>
      </div>

      <div className='w-auto p-3 flex flex-col gap-2 rounded-lg border bg-white text-black'>
        <div className='raleway-heading-one mb-1'>Private Key</div>
        
        <div className='w-[100%] overflow-scroll bg-zinc-100 p-2 rounded'>
          <pre>{(visibility)? privateKey : '*'.repeat(privateKey.length)}</pre>
        </div>

        <div className='flex flex-row gap-2'>
          <Button variant={'outline'} onClick={()=>{
            navigator.clipboard.writeText(privateKey)
            toast({
              title: 'Private key has been selected.',
              description: 'You can now paste it elsewhere.'
            })
          }} 
          className='py-1 rounded-ls w-fit cursor-pointer'>Copy</Button>

          <Button variant={'outline'} onClick={()=>{
            setVisibility(!visibility)
          }} 
          className='py-1 rounded-ls w-fit cursor-pointer'>{visibility? 'Hide':'Show'}</Button>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
}

