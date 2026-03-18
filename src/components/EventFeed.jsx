import { useState, useEffect } from 'react'

const EVENT_TYPES = ['Swap', 'Liquidity Added', 'Price Update']
const TOKENS = ['XLM', 'USDC', 'yXLM']

function generateEvent() {
  const from = TOKENS[Math.floor(Math.random() * TOKENS.length)]
  const to = TOKENS.filter(t => t !== from)[Math.floor(Math.random() * 2)]
  const amount = (Math.random() * 1000).toFixed(2)
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
  const hash = 'TX' + Math.random().toString(36).substring(2, 10).toUpperCase()
  return { id: Date.now(), type, from, to, amount, hash, time: new Date().toLocaleTimeString() }
}

export default function EventFeed() {
  const [events, setEvents] = useState([generateEvent()])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setEvents(prev => [generateEvent(), ...prev].slice(0, 8))
    }, 3000)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <div style={{
      background: '#1a1a2e',
      border: '1px solid #2d2d44',
      borderRadius: '20px',
      padding: '20px',
      width: '100%',
      maxWidth: '420px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', color: '#a5b4fc' }}>
          📡 Live Events
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!paused && (
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#4ade80', display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }} />
          )}
          <button
            onClick={() => setPaused(p => !p)}
            style={{
              background: '#2d2d44', color: '#a5b4fc', border: 'none',
              borderRadius: '6px', padding: '4px 10px',
              cursor: 'pointer', fontSize: '0.75rem'
            }}
          >
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {events.map((ev, i) => (
          <div
            key={ev.id}
            style={{
              background: '#0f0f1a',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '0.82rem',
              animation: i === 0 ? 'slideIn 0.3s ease' : 'none',
              borderLeft: `3px solid ${ev.type === 'Swap' ? '#6366f1' : ev.type === 'Liquidity Added' ? '#4ade80' : '#facc15'}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#a5b4fc', fontWeight: 'bold' }}>{ev.type}</span>
              <span style={{ color: '#555', fontSize: '0.75rem' }}>{ev.time}</span>
            </div>
            <div style={{ color: '#ccc' }}>
              {ev.amount} {ev.from} → {ev.to}
            </div>
            <div style={{ color: '#555', fontSize: '0.72rem', marginTop: '2px' }}>
              {ev.hash}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}