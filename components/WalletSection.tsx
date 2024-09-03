"use client"
import { blockchainAtom, mnemonicAtom, walletCountAtom, WalletsAtom } from '@/lib/store/atoms/atom'
import React from 'react'
import { useRecoilValue } from 'recoil'


import { SeedPhraseGenerator } from './SeedPhraseGenerator'
import { SeedPhraseGrid } from './SeedPhraseGrid'
import { CreateWalletButton } from './CreateWalletButton'
import { WalletsGrid } from './WalletGrid'


export const WalletSection = () => {
  const walletCount = useRecoilValue(walletCountAtom)
  const mnemonic = useRecoilValue(mnemonicAtom)
  const code = useRecoilValue(blockchainAtom)
  const walletArray = useRecoilValue(WalletsAtom)

  return (
    <div className='bg-black'>
      {!walletCount && <SeedPhraseGenerator></SeedPhraseGenerator>}
      <div className='flex flex-row gap-4 mx-8 mt-4'>
        <SeedPhraseGrid></SeedPhraseGrid>
        <CreateWalletButton mnemonic={mnemonic} blockchainCode={code}></CreateWalletButton>
      </div>
      <WalletsGrid wallets={walletArray}></WalletsGrid>
    </div>
  )
}


