"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRecoilValue } from "recoil"
import { seedPhraseAtom, walletCountAtom } from "@/lib/store/atoms/atom"
import { useToast } from './ui/use-toast'


export const SeedPhraseGrid = () => {
  const walletCount = useRecoilValue(walletCountAtom)
  const seedPhraseArray = useRecoilValue(seedPhraseAtom)
  const seedPhraseString = seedPhraseArray.join(" ");
  const {toast} = useToast();

  if(walletCount){
    return <Accordion type="single" collapsible className='w-full m-auto px-8 border-dotted border-2'>
      <AccordionItem value="item-1" className='border-none'>
        <AccordionTrigger className='raleway-heading-two text-2xl'>Your secret recovery phase</AccordionTrigger>
        <AccordionContent onClick={()=>{
          navigator.clipboard.writeText(seedPhraseString);
          toast({
            variant: 'default',
            title: "Seed phrase has been copied.",
            description: "You can now paste it elsewhere."
          })}}>
          <div className='grid grid-cols-4 gap-4 p-4 m-auto'>
            {seedPhraseArray.map(item => {
              return <div key={item.toString()} className='bg-slate-100 text-black p-2 rounded-lg text-center raleway-heading-two text-xl'>
                {item} 
              </div>
            })}
          </div>
          <p className='text-center raleway-body m-auto'>Click anywhere to copy.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

}
  
}