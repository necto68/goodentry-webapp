import { useToast as useBaseToast } from "@chakra-ui/react";

import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { Toast } from "../components/Toast";
import { Description, Title, TransactionLink } from "../styles/Toast";
import { ToastType } from "../types/ToastType";

import type { ToastParameters } from "../types/ToastParameters";
import type { ToastProps } from "@chakra-ui/react";

const getStatusByToastType = (type: ToastType): ToastProps["status"] => {
  switch (type) {
    case ToastType.SUCCESS:
      return "success";
    case ToastType.ERROR:
      return "error";
    default:
      return "success";
  }
};
export const useToast = () => {
  const toast = useBaseToast({
    position: "top-right",
    duration: 5000,

    render: ({ status, title, description }) => (
      <Toast description={description} status={status} title={title} />
    ),
  });

  return (parameters: ToastParameters) => {
    const { type, title, description, chainId, transactionHash } = parameters;
    const status = getStatusByToastType(type);

    const titleComponent = <Title>{title}</Title>;

    const transactionLink =
      chainId && transactionHash
        ? getExplorerLink(chainId, ExplorerLinkType.TX, transactionHash)
        : null;
    const descriptionComponent = transactionLink ? (
      <TransactionLink href={transactionLink} target="_blank">
        Click here to view transaction
      </TransactionLink>
    ) : (
      <Description>{description}</Description>
    );

    toast({ status, title: titleComponent, description: descriptionComponent });
  };
};
