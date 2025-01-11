
"use client";
 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NeuronBackground from "./components/NeuronBackground";

 
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <NeuronBackground />
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
    </main>
  );
}

