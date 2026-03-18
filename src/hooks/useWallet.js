import { useState } from 'react'

export function useWallet() {
  const [address, setAddress] = useState(null)
  const [error, setError] = useState(null)
  const [connecting, setConnecting] = useState(false)

  async function connectWallet() {
    setConnecting(true)
    setError(null)
    try {
      const { isConnected } = await window.freighter?.isConnected()
      if (!isConnected) {
        throw new Error('Wallet not found. Please install Freighter extension.')
      }
      const result = await window.freighter?.getPublicKey()
      if (!result) {
        throw new Error('User rejected the connection request.')
      }
      setAddress(result)
    } catch (err) {
      const msg = err?.message?.toLowerCase() || ''
      if (msg.includes('not found') || msg.includes('install')) {
        setError('Wallet not found. Please install Freighter.')
      } else if (msg.includes('rejected') || msg.includes('cancel')) {
        setError('Connection rejected. Please approve in your wallet.')
      } else {
        setError('Something went wrong: ' + err.message)
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