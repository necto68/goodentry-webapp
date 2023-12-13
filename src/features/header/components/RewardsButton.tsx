import { Tooltip } from "@chakra-ui/react";
import React from "react";

import { good } from "../../icons/coins";
import { getFormattedNumber } from "../../shared/helpers/baseFormatters";
import { useRewards } from "../../shared/hooks/useRewards";
import { useWallet } from "../../wallet/hooks/useWallet";
import { Icon } from "../styles/AuthHeader";
import { RewardsButtonContainer } from "../styles/RewardsButton";

export const RewardsButton = () => {
  const { account = "" } = useWallet();
  const [rewards] = useRewards(account);
  return (
    <Tooltip
      label="50M $esGOOD rewards will be airdropped after a 4 month liquidity mining program"
      placement="bottom"
    >
      <RewardsButtonContainer variant="border">
        <Icon src={good} />
        {getFormattedNumber(rewards)}
      </RewardsButtonContainer>
    </Tooltip>
  );
};
