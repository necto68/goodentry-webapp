export const getTransactionErrorMessage = (error: unknown) => {
  const { code, message, method, reason } = error as {
    code: number;
    message: string;
    method: string;
    reason: string;
  };

  if (code === 4001) {
    return "Transaction cancelled";
  }

  if (reason === "6" && method.startsWith("withdraw")) {
    return "Health Factor would become lower than liquidation threshold";
  }

  if (code === -32_603 && message.startsWith("Unexpected token '<'")) {
    return "Seems like Metamask experimental features using OpenSea is turned on and is causing issues. You can try disabling that feature by going into Metamask → Settings → Experimental. Alternatively, you can use other wallets like OKX or Rabby.";
  }

  return message;
};
