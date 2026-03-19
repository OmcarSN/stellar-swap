# 🌟 Stellar Swap

A Token Swap Interface built on Stellar testnet with multi-wallet support and real-time events.

## Live Demo
https://stellar-swap-lyart.vercel.app

## Screenshots

### Wallet Connected & Live Activity
![Wallet Connected](Screenshot%202026-03-19%20154230.png)

### Swap Successful with TX Hash
![Swap Successful](Screenshot%202026-03-19%20154305.png)

## Deployed Contract Address
CBFCGN4GTFTVXOT3QOGBCMBKYPRRSGOBVW73QWMGEETCN2C7U7UNWTBZ

Verifiable on Stellar Explorer:
https://stellar.expert/explorer/testnet/contract/CBFCGN4GTFTVXOT3QOGBCMBKYPRRSGOBVW73QWMGEETCN2C7U7UNWTBZ

## Transaction Hash
95e775f31fdbc3ee677d2845f1900b71e1c7f3bdec5f3e9e6e22e7f5774786d6

Verifiable on Stellar Explorer:
https://stellar.expert/explorer/testnet/tx/95e775f31fdbc3ee677d2845f1900b71e1c7f3bdec5f3e9e6e22e7f5774786d6

## Setup Instructions
1. Clone: `git clone https://github.com/OmcarSN/stellar-swap`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: `http://localhost:5173`

## Features
- Multi-wallet support via Freighter
- 3 error types: wallet not found, rejected, insufficient balance
- Real-time swap event feed (updates every 3 seconds)
- Transaction status tracking (pending / success / failed)
- Soroban smart contract deployed on testnet
- Slippage tolerance control (0.5% / 1% / 2%)

## Tech Stack
- React + Vite
- Stellar SDK + Soroban
- Freighter Wallet
- Vercel (deployment)
