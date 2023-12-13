import html2canvas from "html2canvas";

export const downloadImage = (dataURL: string, filename: string) => {
  const fakeLink = document.createElement("a");

  fakeLink.download = filename;
  fakeLink.href = dataURL;
  fakeLink.target = "_blank";
  fakeLink.style.display = "none";

  document.body.append(fakeLink);

  fakeLink.click();
  fakeLink.remove();
};

export const getCanvasFromContent = async (
  contentReference: HTMLDivElement
) => {
  // This style tag is needed to prevent content from being shifted on canvas.
  // It is a conflict between html2canvas and tailwind img.

  const style = document.createElement("style");
  document.head.append(style);
  style.sheet?.insertRule("img { display: inline-block; }");

  const canvas = await html2canvas(contentReference);

  style.remove();

  return canvas;
};

export const copyImageToClipboard = async (
  contentReference: HTMLDivElement
) => {
  const canvas = await getCanvasFromContent(contentReference);

  // eslint-disable-next-line promise/avoid-new
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve);
  });

  if (blob) {
    const type = "image/png";

    const clipboardItem = new ClipboardItem({
      [type]: blob,
    });

    await navigator.clipboard.write([clipboardItem]);
  }
};
