// 3 error types required by the challenge

export const ERROR_TYPES = {
  WALLET_NOT_FOUND: "WALLET_NOT_FOUND",
  USER_REJECTED: "USER_REJECTED",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  NETWORK_ERROR: "NETWORK_ERROR",
  TX_FAILED: "TX_FAILED",
};

export function handleWalletError(error) {
  const msg = error?.message?.toLowerCase() || "";

  if (msg.includes("not found") || msg.includes("not installed")) {
    return {
      type: ERROR_TYPES.WALLET_NOT_FOUND,
      message: "Wallet not found. Please install Freighter or xBull.",
      action: "install",
    };
  }

  if (msg.includes("rejected") || msg.includes("declined") || msg.includes("cancel")) {
    return {
      type: ERROR_TYPES.USER_REJECTED,
      message: "Connection rejected. Please approve in your wallet.",
      action: "retry",
    };
  }

  if (msg.includes("insufficient") || msg.includes("balance")) {
    return {
      type: ERROR_TYPES.INSUFFICIENT_BALANCE,
      message: "Insufficient balance to complete this swap.",
      action: "topup",
    };
  }

  if (msg.includes("timeout") || msg.includes("network") || msg.includes("failed")) {
    return {
      type: ERROR_TYPES.TX_FAILED,
      message: "Transaction failed. Please try again.",
      action: "retry",
    };
  }

  return {
    type: ERROR_TYPES.NETWORK_ERROR,
    message: error?.message || "Something went wrong.",
    action: "retry",
  };
}