<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# stellar-swap
>>>>>>> c91bd440d62560f03eaebf9619d1dde790c85e2a
# 🌟 Stellar Swap

A Token Swap Interface built on Stellar testnet with multi-wallet support and real-time events.

## Live Demo
https://stellar-swap-lyart.vercel.app

## Screenshots

### Wallet Options Available
![Wallet](https://raw.githubusercontent.com/OmcarSN/stellar-swap/main/Screenshot%202026-03-19%20154230.png)

### Swap Successful  
![Swap](https://raw.githubusercontent.com/OmcarSN/stellar-swap/main/Screenshot%202026-03-19%20154305.png)

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
