import { useState } from 'react'

export function useWallet() {
  const [address, setAddress] = useState(null)
  const [error, setError] = useState(null)
  const [connecting, setConnecting] = useState(false)

  async function connectWallet() {
    setConnecting(true)
    setError(null)
    try {
      const freighterApi = await import('@stellar/freighter-api')
      
      const connectedObj = await freighterApi.isConnected()
      const connected = connectedObj?.isConnected ?? connectedObj
      
      if (!connected) {
        setError('Wallet not found. Please install Freighter extension.')
        setConnecting(false)
        return
      }

      let pubKey = null

      // Try new API (v2+)
      if (typeof freighterApi.requestAccess === 'function') {
        const result = await freighterApi.requestAccess()
        pubKey = result?.address ?? result?.publicKey ?? result
      }

      // Try getAddress (v2)
      if (!pubKey && typeof freighterApi.getAddress === 'function') {
        const result = await freighterApi.getAddress()
        pubKey = result?.address ?? result
      }

      // Try getPublicKey (v1)
      if (!pubKey && typeof freighterApi.getPublicKey === 'function') {
        pubKey = await freighterApi.getPublicKey()
      }

      if (!pubKey) {
        setError('Connection rejected. Please approve in Freighter.')
        setConnecting(false)
        return
      }

      setAddress(pubKey)
    } catch (err) {
      const msg = err?.message?.toLowerCase() || ''
      if (msg.includes('reject') || msg.includes('cancel') || msg.includes('denied')) {
        setError('Connection rejected. Please approve in your wallet.')
      } else if (msg.includes('balance') || msg.includes('insufficient')) {
        setError('Insufficient balance to complete this swap.')
      } else {
        setError('Error: ' + err.message)
      }
    }
    setConnecting(false)
  }

  function disconnectWallet() {
    setAddress(null)
    setError(null)
  }

  return { address, error, connecting, connectWallet, disconnectWallet }
}