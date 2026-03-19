import { useState } from 'react'

const TOKENS = [
  { symbol: 'XLM', name: 'Stellar Lumens', icon: '⭐' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'yXLM', name: 'Yield XLM', icon: '📈' },
]

export default function SwapCard({ address }) {
  const [fromToken, setFromToken] = useState('XLM')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [slippage, setSlippage] = useState('1')
  const [txStatus, setTxStatus] = useState('idle')
  const [txHash, setTxHash] = useState(null)
  const [error, setError] = useState(null)

  function switchTokens() {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  function getEstimate() {
    if (!amount || isNaN(amount)) return '0.00'
    const rates = { XLM_USDC: 0.11, USDC_XLM: 9.1, XLM_yXLM: 0.98, yXLM_XLM: 1.02, USDC_yXLM: 8.9, yXLM_USDC: 0.112 }
    const rate = rates[`${fromToken}_${toToken}`] || 1
    return (parseFloat(amount) * rate).toFixed(4)
  }

  async function handleSwap() {
    if (!address) { setError('Please connect your wallet first.'); return }
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount.'); return }
    if (parseFloat(amount) > 10000) { setError('Insufficient balance to complete this swap.'); return }
    setError(null); setTxStatus('pending'); setTxHash(null)
    try {
      const { callSwapContract } = await import('../utils/contract.js')
      const result = await callSwapContract(fromToken, toToken, Math.floor(parseFloat(amount) * 100))
      if (result.success) { setTxHash(result.txHash); setTxStatus('success') }
      else throw new Error(result.error || 'Transaction failed on network.')
    } catch (err) { setError(err.message); setTxStatus('failed') }
  }

  const boxStyle = {
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '12px 20px',
    overflow: 'hidden',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  const selectStyle = {
    background: 'rgba(99,102,241,0.15)',
    color: 'white',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: '12px',
    padding: '8px 12px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontWeight: '600',
    outline: 'none',
    flexShrink: 0,
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '24px',
      padding: '24px',
      width: '100%',
      maxWidth: '440px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>Swap</h2>
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '8px' }}>
          Slippage: {slippage}%
        </div>
      </div>

      {/* From */}
      <div style={{ ...boxStyle, background: 'rgba(0,0,0,0.3)', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>You Pay</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <select value={fromToken} onChange={e => setFromToken(e.target.value)} style={selectStyle}>
            {TOKENS.filter(t => t.symbol !== toToken).map(t => (
              <option key={t.symbol} value={t.symbol}>{t.icon} {t.symbol}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{
              width: '140px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.4rem',
              outline: 'none',
              textAlign: 'right',
              fontWeight: '600',
            }}
          />
        </div>
      </div>

      {/* Switch */}
      <div style={{ textAlign: 'center', margin: '4px 0' }}>
        <button onClick={switchTokens} style={{
          background: 'rgba(99,102,241,0.2)',
          border: '1px solid rgba(99,102,241,0.4)',
          color: '#a5b4fc', borderRadius: '50%',
          width: '40px', height: '40px',
          cursor: 'pointer', fontSize: '1.1rem',
        }}>⇅</button>
      </div>

      {/* To */}
      <div style={{ ...boxStyle, background: 'rgba(99,102,241,0.05)', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>You Receive</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <select value={toToken} onChange={e => setToToken(e.target.value)} style={selectStyle}>
            {TOKENS.filter(t => t.symbol !== fromToken).map(t => (
              <option key={t.symbol} value={t.symbol}>{t.icon} {t.symbol}</option>
            ))}
          </select>
          <div style={{
            width: '140px',
            textAlign: 'right',
            fontSize: '1.4rem',
            color: '#22d3ee',
            fontWeight: '600',
          }}>
            {getEstimate()}
          </div>
        </div>
      </div>

      {/* Slippage */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>Slippage tolerance</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['0.5', '1', '2'].map(s => (
            <button key={s} onClick={() => setSlippage(s)} style={{
              background: slippage === s ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.05)',
              color: slippage === s ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
              border: slippage === s ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px', padding: '4px 12px',
              cursor: 'pointer', fontSize: '0.8rem',
            }}>{s}%</button>
          ))}
        </div>
      </div>

      {/* Rate info */}
      {amount && parseFloat(amount) > 0 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '16px', padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '10px', fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.4)',
        }}>
          <span>Rate</span>
          <span>1 {fromToken} ≈ {(getEstimate() / amount).toFixed(4)} {toToken}</span>
        </div>
      )}

      {/* Swap Button */}
      <button onClick={handleSwap} disabled={txStatus === 'pending'} style={{
        width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
        background: txStatus === 'pending'
          ? 'rgba(99,102,241,0.3)'
          : 'linear-gradient(135deg, #6366f1, #4f46e5)',
        color: 'white', fontSize: '1rem', fontWeight: '700',
        cursor: txStatus === 'pending' ? 'not-allowed' : 'pointer',
        boxShadow: txStatus === 'pending' ? 'none' : '0 8px 24px rgba(99,102,241,0.35)',
        letterSpacing: '0.3px',
      }}>
        {txStatus === 'pending' ? '⏳ Swapping...' : '🔄 Swap Now'}
      </button>

      {/* TX Success */}
      {txStatus === 'success' && (
        <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '12px' }}>
          <div style={{ color: '#4ade80', fontWeight: '700', marginBottom: '6px' }}>✅ Swap Successful!</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', wordBreak: 'break-all', fontSize: '0.75rem' }}>TX: {txHash}</div>
          <a href="https://stellar.expert/explorer/testnet/contract/CBFCGN4GTFTVXOT3QOGBCMBKYPRRSGOBVW73QWMGEETCN2C7U7UNWTBZ"
            target="_blank" rel="noreferrer"
            style={{ color: '#6366f1', fontSize: '0.8rem', marginTop: '8px', display: 'inline-block' }}>
            View Contract on Explorer ↗
          </a>
        </div>
      )}

      {/* TX Failed */}
      {txStatus === 'failed' && (
        <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px' }}>
          <div style={{ color: '#f87171', fontWeight: '700' }}>❌ Swap Failed</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '4px' }}>Please try again</div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ marginTop: '12px', padding: '12px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px' }}>
          <p style={{ color: '#f87171', margin: 0, fontSize: '0.85rem' }}>⚠️ {error}</p>
        </div>
      )}
    </div>
  )
}