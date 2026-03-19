import { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import SwapCard from './components/SwapCard'
import EventFeed from './components/EventFeed'

function App() {
  const [address, setAddress] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1117 40%, #0a0f1e 100%)',
      color: 'white',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'fixed', top: '-200px', left: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', right: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>🌟</div>
          <span style={{ fontSize: '1.3rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Stellar<span style={{ color: '#6366f1' }}>Swap</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            fontSize: '0.78rem', color: '#4ade80',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Testnet
          </div>
          <WalletConnect onAddressChange={setAddress} />
        </div>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 20px 32px' }}>
        <div style={{
          display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
          fontSize: '0.8rem', color: '#a5b4fc', marginBottom: '16px',
        }}>
          ⚡ Powered by Soroban Smart Contracts
        </div>
        <h1 style={{
          fontSize: '3rem', fontWeight: '800', margin: '0 0 12px',
          background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #22d3ee 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
        }}>
          Swap Tokens Instantly
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', margin: 0 }}>
          Fast, secure, and decentralized token swaps on Stellar
        </p>
      </div>

      {/* Main content */}
      <div style={{
        display: 'flex', gap: '24px', justifyContent: 'center',
        alignItems: 'flex-start', flexWrap: 'wrap',
        padding: '0 20px 60px',
        maxWidth: '1100px', margin: '0 auto',
      }}>
        <SwapCard address={address} />
        <EventFeed />
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem',
      }}>
        Built on Stellar Testnet · Contract: CBFCGN4GT...NWTBZ
      </div>
    </div>
  )
}

export default App