import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { WalletSection } from "@/components/WalletSection";

export default function Home() {
  
  return (
    <div className="bg-black text-white h-screen">
    <Navbar></Navbar>
    <WalletSection></WalletSection>
    <Footer></Footer>
    </div>
  );
}
