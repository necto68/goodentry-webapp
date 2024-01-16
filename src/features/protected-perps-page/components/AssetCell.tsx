import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { TitleCell } from "../../table/components/TitleCell";
import { usePair } from "../hooks/usePair";

import type { FC } from "react";

interface AssetCellProps {
  readonly pairId: string;
}

export const AssetCell: FC<AssetCellProps> = ({ pairId }) => {
  const { baseTokenSymbol } = usePair(pairId) ?? {};

  const symbols: [string] | undefined = baseTokenSymbol
    ? [baseTokenSymbol]
    : undefined;
  const title = baseTokenSymbol ?? loadingPlaceholder;

  return <TitleCell symbols={symbols} title={title} />;
};
