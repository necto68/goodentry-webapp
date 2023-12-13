import { Button } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Link } from "react-router-dom";

import { InfoTitle } from "../../shared/modal/styles/ModalInfo";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { getTwitterXShareLink } from "../helpers/getTwitterXShareLink";
import {
  copyImageToClipboard,
  downloadImage,
  getCanvasFromContent,
} from "../helpers/imageHelpers";
import {
  Container,
  Content,
  ActionsContainer,
} from "../styles/SocialShareModalRoot";

import { SocialShareContent } from "./SocialShareContent";

import type { Ref } from "react";

export const SocialShareModalRoot = () => {
  const toast = useToast();

  const contentReference: Ref<HTMLDivElement | null> = useRef(null);
  const [isCoping, setIsCoping] = useState(false);

  const shareLink = getTwitterXShareLink();

  const handleCopyButtonClick = useCallback(async () => {
    const { current } = contentReference;

    if (current) {
      setIsCoping(true);

      await copyImageToClipboard(current);

      toast({
        type: ToastType.SUCCESS,
        title: "Image Copied",
        description: "Press Ctrl+V or ⌘+V to paste the Image",
      });

      setIsCoping(false);
    }
  }, [toast]);

  const handleDownloadButtonClick = useCallback(async () => {
    const { current } = contentReference;
    const filename = `GoodEntry-${Date.now()}`;

    if (current) {
      const canvas = await getCanvasFromContent(current);
      const dataURL = canvas.toDataURL();

      downloadImage(dataURL, filename);
    }
  }, []);

  return (
    <Container>
      <SocialShareContent ref={contentReference} />
      <Content>
        <InfoTitle>1. Click &quot;Copy&quot;</InfoTitle>
        <InfoTitle>2. Click &quot;Share on X&quot;</InfoTitle>
        <InfoTitle>3. Press Ctrl+V or ⌘+V to paste the Image</InfoTitle>
        <InfoTitle>4. Click &quot;Post&quot;</InfoTitle>
      </Content>
      <ActionsContainer>
        <Button
          isLoading={isCoping}
          leftIcon={<BiCopy size={18} />}
          onClick={() => {
            void handleCopyButtonClick();
          }}
        >
          Copy
        </Button>
        <Link target="_blank" to={shareLink}>
          <Button leftIcon={<BsTwitterX size={18} />}>Share on X</Button>
        </Link>
        <Button
          leftIcon={<HiOutlineDocumentDownload size={18} />}
          onClick={() => {
            void handleDownloadButtonClick();
          }}
        >
          Download
        </Button>
      </ActionsContainer>
    </Container>
  );
};
