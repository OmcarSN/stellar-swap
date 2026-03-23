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
CBWEC4ROB7UQFFBPVKCWECJGP2LGEIOTQNCINO3LI22NRGDMCRJ7GFWG

Verifiable on Stellar Explorer:
(https://stellar.expert/explorer/testnet/contract/CBWEC4ROB7UQFFBPVKCWECJGP2LGEIOTQNCINO3LI22NRGDMCRJ7GFWG)

## Transaction Hash
8a4d2768c149547b9a9bef379a1c4880be3c4d72c8dff1dc871322d126bff6a9

Verifiable on Stellar Explorer:
https://stellar.expert/explorer/testnet/tx/8a4d2768c149547b9a9bef379a1c4880be3c4d72c8dff1dc871322d126bff6a9

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
