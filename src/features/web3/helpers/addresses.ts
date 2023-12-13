export const getTruncatedAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const areAddressesEqual = (address0: string, address1: string) =>
  address0.toLowerCase() === address1.toLowerCase();
