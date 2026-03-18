import { Contract, TransactionBuilder, Networks, BASE_FEE, nativeToScVal, xdr } from '@stellar/stellar-sdk'
import { Server } from '@stellar/stellar-sdk/rpc'

const CONTRACT_ID = 'CBFCGN4GTFTVXOT3QOGBCMBKYPRRSGOBVW73QWMGEETCN2C7U7UNWTBZ'
const NETWORK_PASSPHRASE = Networks.TESTNET
const RPC_URL = 'https://soroban-testnet.stellar.org'

const server = new Server(RPC_URL)

export async function callSwapContract(fromToken, toToken, amountIn) {
  try {
    const contract = new Contract(CONTRACT_ID)

    const account = await server.getAccount('GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5')

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        contract.call(
          'swap',
          xdr.ScVal.scvSymbol(fromToken),
          xdr.ScVal.scvSymbol(toToken),
          nativeToScVal(amountIn, { type: 'i128' }),
        )
      )
      .setTimeout(30)
      .build()

    const simResult = await server.simulateTransaction(tx)

    if (simResult.error) {
      throw new Error('Contract simulation failed: ' + simResult.error)
    }

    return {
      success: true,
      result: simResult,
      txHash: Array.from(tx.hash()).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase(),
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
    }
  }
}