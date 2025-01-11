"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NeuronBackground from "./components/NeuronBackground";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <NeuronBackground />
      <div className="flex flex-col items-center space-y-4">
        {/* Wallet Button */}
        <div className="border hover:border-slate-900 rounded">
          <WalletMultiButton className="wallet-adapter-button" />
        </div>

        {/* Other Buttons Container */}
        <div className="flex flex-col space-y-4">
          {/* White Paper Button */}
          <div className="border hover:border-slate-900 rounded">
            <a
              href="/whitepaper.pdf" // Replace with the actual link for the white paper
              target="_blank"
              rel="noopener noreferrer"
              className="wallet-adapter-button white-paper-button"
            >
              _Whitepaper
            </a>
          </div>

          {/* Documentation Button */}
          {/* Documentation Button */}
          <div className="border hover:border-slate-900 rounded items-center justify-center">
            <a
              href="https://machina5.gitbook.io/machina5" // Correct URL for the documentation
              target="_blank"
              rel="noopener noreferrer"
              className="wallet-adapter-button docs-button"
            >
              _Documents
            </a>
          </div>

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
        </div>
      </div>
    </main>
  );
}
