"use client"
import React from 'react'
import logo from '../public/logo.svg'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRecoilState } from 'recoil'
import { blockchainAtom } from '@/lib/store/atoms/atom'
import { cn } from '@/lib/utils'
import { useToast } from "@/components/ui/use-toast"

const Navbar = () => {
  const [ blockchainCode, setBlockchain ] = useRecoilState(blockchainAtom);
  const { toast } = useToast()

  return (
    <div className='p-8 flex flex-col gap-4'>

      <div className='flex flex-row gap-4'>
        <Image src={logo} alt='logo' height={40} width={40}></Image>
        <h1 className='raleway-heading-one text-3xl'>cryptoCAVE</h1>
      </div>

      <div className={cn('flex flex-col', {'hidden': blockchainCode!=''})}>
        <p className='raleway-heading-one text-3xl'>We work with multiple blockchains.</p>
        <p className='raleway-heading-two text-xl'>Choose a blockchain to get started.</p>
      </div>

      <div className={cn('flex flex-row gap-4', {'hidden': blockchainCode!=''})}>
        <Button className='text-xl w-fit' onClick={()=>{
          setBlockchain('501')
          toast({
            title: "Solana blockchain has been selected.",
            description: "You can create your own crypto wallets now.",
          })
        }}>Solana</Button>
        <Button className='text-xl w-fit' onClick={()=>{
          setBlockchain('60')
          toast({
            title: "Ethereum blockchain has been selected.",
            description: "You can create your own crypto wallets now.",
          })
        }}>Ethereum</Button>
      </div>

    </div>
  )
}

export default Navbar