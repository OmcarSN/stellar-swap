import { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import SwapCard from './components/SwapCard'

function App() {
  const [address, setAddress] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f1a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      gap: '24px',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
        🌟 Stellar Swap
      </h1>
      <WalletConnect onAddressChange={setAddress} />
      <SwapCard address={address} />
    </div>
  )
}

export default App