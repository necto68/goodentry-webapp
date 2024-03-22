export const getReferralLink = (code: string) =>
  `https://app.goodentry.io/referrals?code=${code.replace(" ", "")}`;

export const setToClipboard = async (text: string) => {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
};
