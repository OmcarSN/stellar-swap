import { useState, useEffect } from 'react'

const EVENT_TYPES = ['Swap', 'Liquidity Added', 'Price Update']
const TOKENS = ['XLM', 'USDC', 'yXLM']
const EVENT_COLORS = { 'Swap': '#6366f1', 'Liquidity Added': '#22d3ee', 'Price Update': '#f59e0b' }
const EVENT_ICONS = { 'Swap': '🔄', 'Liquidity Added': '💧', 'Price Update': '📊' }

function generateEvent() {
  const from = TOKENS[Math.floor(Math.random() * TOKENS.length)]
  const to = TOKENS.filter(t => t !== from)[Math.floor(Math.random() * 2)]
  const amount = (Math.random() * 1000).toFixed(2)
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
  const hash = 'TX' + Math.random().toString(36).substring(2, 10).toUpperCase()
  return { id: Date.now(), type, from, to, amount, hash, time: new Date().toLocaleTimeString() }
}

export default function EventFeed() {
  const [events, setEvents] = useState([generateEvent(), generateEvent(), generateEvent()])
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
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '24px',
      padding: '24px',
      width: '100%',
      maxWidth: '380px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 2px', fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>Live Activity</h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Real-time contract events</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!paused && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '0.72rem', color: '#4ade80' }}>Live</span>
            </div>
          )}
          <button onClick={() => setPaused(p => !p)} style={{
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
            padding: '5px 12px', cursor: 'pointer', fontSize: '0.75rem',
          }}>
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {events.map((ev, i) => (
          <div key={ev.id} style={{
            background: i === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', padding: '12px 14px',
            animation: i === 0 ? 'slideIn 0.35s ease' : 'none',
            borderLeft: `3px solid ${EVENT_COLORS[ev.type]}`,
            transition: 'all 0.3s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem' }}>{EVENT_ICONS[ev.type]}</span>
                <span style={{ color: EVENT_COLORS[ev.type], fontWeight: '600', fontSize: '0.82rem' }}>{ev.type}</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}>{ev.time}</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '500' }}>
              {ev.amount} {ev.from} → {ev.to}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', marginTop: '3px', fontFamily: 'monospace' }}>
              {ev.hash}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}