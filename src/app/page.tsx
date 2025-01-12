"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NeuronBackground from "./components/NeuronBackground";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    setWalletConnected(!!publicKey); // Check if wallet is connected
  }, [publicKey]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <NeuronBackground />
      <div className="flex flex-col items-center space-y-4">
        {/* Wallet Button */}
        <div className="border hover:border-slate-900 rounded">
          <WalletMultiButton className="wallet-adapter-button" />
        </div>

        <div className="border hover:border-slate-900 rounded items-center justify-center">
          <a
            href="https://machina5.gitbook.io/machina5" // Correct URL for the documentation
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-adapter-button docs-button"
          >
            Learn More
          </a>
        </div>

        {/* White Paper Button */}
        <div className="border hover:border-slate-900 rounded items-center justify-center">
          <a
            href="/whitepaper.pdf" // Replace with the actual link for the white paper
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-adapter-button white-paper-button"
          >
            Whitepaper
          </a>
        </div>

        {/* Documentation Button */}
        <div className="border hover:border-slate-900 rounded items-center justify-center">
          <a
            href="https://x.com/machina_5" // Correct URL for the documentation
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-adapter-button x-button"
          >
            @machina_5
          </a>
        </div>

        {/* M⁵ Exchange Button */}
        <div className="border hover:border-slate-900 rounded">
          <a
            href="/m5-exchange" // Replace with the actual link for M⁵ Exchange
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-adapter-button m5-exchange-button"
          >
            m⁵ Exchange
          </a>
        </div>

        {/* Conditional Button: Display only if wallet is connected */}
        {walletConnected && (
          <div className="border hover:border-slate-900 rounded">
            <button
              className="wallet-adapter-button connected-wallet-button"
              onClick={() => {
                console.log("Additional button clicked");
              }}
            >
              Daria Offline
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
