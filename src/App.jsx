import { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import SwapCard from './components/SwapCard'
import EventFeed from './components/EventFeed'

function App() {
  const [address, setAddress] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f1a',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '30px 20px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 16px' }}>
          🌟 Stellar Swap
        </h1>
        <WalletConnect onAddressChange={setAddress} />
      </div>

      {/* Main Layout */}
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        <SwapCard address={address} />
        <EventFeed />
      </div>
    </div>
  )
}

export default App