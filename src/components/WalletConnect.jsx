import { useWallet } from '../hooks/useWallet'
import { useEffect } from 'react'

export default function WalletConnect({ onAddressChange }) {
  const { address, error, connecting, connectWallet, disconnectWallet } = useWallet()

  useEffect(() => {
    onAddressChange?.(address)
  }, [address])

  return (
    <div style={{ textAlign: 'center' }}>
      {!address ? (
        <button
          onClick={connectWallet}
          disabled={connecting}
          style={{
            background: connecting ? '#444' : '#6366f1',
            color: 'white', border: 'none',
            padding: '12px 28px', borderRadius: '12px',
            fontSize: '1rem', cursor: connecting ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#a5f3fc' }}>✅ {address.slice(0, 6)}...{address.slice(-4)}</span>
          <button
            onClick={disconnectWallet}
            style={{
              background: 'transparent', color: '#f87171',
              border: '1px solid #f87171', padding: '6px 16px',
              borderRadius: '8px', cursor: 'pointer',
            }}
          >Disconnect</button>
        </div>
      )}
      {error && <p style={{ color: '#f87171', marginTop: '8px', fontSize: '0.85rem' }}>⚠️ {error}</p>}
    </div>
  )
}