import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { TokenInputError } from "../../input-card/types/TokenInputError";
import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";
import { getTimerTitle } from "../../public-sale-page/helpers/getTimerTitle";
import { usePublicSaleData } from "../../public-sale-page/hooks/usePublicSaleData";
import { PublicSaleStatus } from "../../queries/types/PublicSaleData";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useCollateralTokenInputState } from "../hooks/useCollateralTokenInputState";
import { useSaleTokenInputState } from "../hooks/useSaleTokenInputState";
import { usePublicSaleModalTransactions } from "../stores/usePublicSaleModalTransactions";

import { ApproveMainButton } from "./ApproveMainButton";
import { PublicSaleActionButton } from "./PublicSaleActionButton";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const PublicSaleMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getPublicSaleConfig();

  const {
    collateralTokenTotalDeposited,
    collateralTokenCap,
    status = PublicSaleStatus.IN_PROGRESS,
    isPaused = false,
  } = usePublicSaleData() ?? {};

  const { tokenApproveTransaction } = usePublicSaleModalTransactions();

  const {
    tokenData: collateralTokenData,
    inputValueBig,
    isError: isCollateralTokenError,
    error: collateralTokenError,
  } = useCollateralTokenInputState();

  const { isError: isSaleTokenError, error: saleTokenError } =
    useSaleTokenInputState();

  const { isLoading: isCollateralTokenApproveMutationLoading } =
    tokenApproveTransaction.mutation;

  const isZeroBalance = inputValueBig.lte(0);
  const isCollateralTokenInsufficientAllowance = isInsufficientTokenAllowance(
    inputValueBig,
    collateralTokenData
  );

  const isCollateralTokenCapReached =
    collateralTokenTotalDeposited &&
    collateralTokenCap &&
    collateralTokenTotalDeposited.gte(collateralTokenCap);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isPaused || status !== PublicSaleStatus.IN_PROGRESS) {
    const timerTitle = getTimerTitle(status, isPaused);

    return <ErrorMainButton title={timerTitle} />;
  }

  if (isCollateralTokenCapReached) {
    return <ErrorMainButton title="Hard Cap is Reached" />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isCollateralTokenError) {
    return (
      <TokenErrorMainButton
        error={collateralTokenError}
        tokenData={collateralTokenData}
      />
    );
  }

  if (
    isSaleTokenError &&
    saleTokenError === TokenInputError.INSUFFICIENT_TOKEN_BALANCE
  ) {
    return <ErrorMainButton title="Hard Cap will be Exceeded" />;
  }

  if (
    isCollateralTokenInsufficientAllowance ||
    isCollateralTokenApproveMutationLoading
  ) {
    return <ApproveMainButton />;
  }

  return <PublicSaleActionButton />;
};
