import { useState } from 'react'

const TOKENS = [
  { symbol: 'XLM', name: 'Stellar Lumens', color: '#6366f1' },
  { symbol: 'USDC', name: 'USD Coin', color: '#22d3ee' },
  { symbol: 'yXLM', name: 'Yield XLM', color: '#a78bfa' },
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
    if (!address) {
      setError('Please connect your wallet first.')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    if (parseFloat(amount) > 10000) {
      setError('Insufficient balance to complete this swap.')
      return
    }
    setError(null)
    setTxStatus('pending')
    setTxHash(null)
    try {
      const { callSwapContract } = await import('../utils/contract.js')
      const result = await callSwapContract(
        fromToken,
        toToken,
        Math.floor(parseFloat(amount) * 100)
      )
      if (result.success) {
        setTxHash(result.txHash)
        setTxStatus('success')
      } else {
        throw new Error(result.error || 'Transaction failed on network.')
      }
    } catch (err) {
      setError(err.message)
      setTxStatus('failed')
    }
  }

  return (
    <div style={{
      background: '#1a1a2e',
      border: '1px solid #2d2d44',
      borderRadius: '20px',
      padding: '28px',
      width: '100%',
      maxWidth: '420px',
    }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.2rem', color: '#a5b4fc' }}>
        Swap Tokens
      </h2>

      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '16px', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>From</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select
            value={fromToken}
            onChange={e => setFromToken(e.target.value)}
            style={{ background: '#2d2d44', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '1rem', cursor: 'pointer' }}
          >
            {TOKENS.filter(t => t.symbol !== toToken).map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1.4rem', outline: 'none', textAlign: 'right' }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '4px 0' }}>
        <button
          onClick={switchTokens}
          style={{ background: '#2d2d44', border: 'none', color: '#a5b4fc', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.1rem' }}
        >⇅</button>
      </div>

      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>To (estimated)</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select
            value={toToken}
            onChange={e => setToToken(e.target.value)}
            style={{ background: '#2d2d44', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '1rem', cursor: 'pointer' }}
          >
            {TOKENS.filter(t => t.symbol !== fromToken).map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
          <div style={{ flex: 1, textAlign: 'right', fontSize: '1.4rem', color: '#a5f3fc' }}>
            {getEstimate()}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.85rem', color: '#888' }}>
        <span>Slippage tolerance</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['0.5', '1', '2'].map(s => (
            <button
              key={s}
              onClick={() => setSlippage(s)}
              style={{ background: slippage === s ? '#6366f1' : '#2d2d44', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
            >{s}%</button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSwap}
        disabled={txStatus === 'pending'}
        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: txStatus === 'pending' ? '#444' : '#6366f1', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: txStatus === 'pending' ? 'not-allowed' : 'pointer' }}
      >
        {txStatus === 'pending' ? '⏳ Swapping...' : 'Swap Now'}
      </button>

      {txStatus === 'success' && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#052e16', borderRadius: '10px', fontSize: '0.85rem' }}>
          <div style={{ color: '#4ade80', fontWeight: 'bold' }}>✅ Swap Successful!</div>
          <div style={{ color: '#888', marginTop: '4px', wordBreak: 'break-all' }}>TX: {txHash}</div>
          <a href={'https://stellar.expert/explorer/testnet/tx/' + txHash} target="_blank" rel="noreferrer" style={{ color: '#6366f1', fontSize: '0.8rem', marginTop: '6px', display: 'block' }}>
            View on Stellar Explorer
          </a>
        </div>
      )}

      {txStatus === 'failed' && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#2d0707', borderRadius: '10px', fontSize: '0.85rem' }}>
          <div style={{ color: '#f87171', fontWeight: 'bold' }}>❌ Swap Failed</div>
        </div>
      )}

      {error && (
        <p style={{ color: '#f87171', marginTop: '12px', fontSize: '0.85rem', textAlign: 'center' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}