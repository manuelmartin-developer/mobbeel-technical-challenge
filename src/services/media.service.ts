import {
  DetectDocumentResponse,
  DocumentSide,
  documentDetect,
} from "./mobbscan.service";

export enum DetectingMode {
  FILE = "file",
  PHOTO = "photo",
  VIDEO = "video",
}

export const mediaStreamConstraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
    advanced: [
      {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 360, ideal: 720, max: 1080 },
        frameRate: 30,
      },
    ],
  },
  audio: false,
};

export const handleDetectFileDocument = async (
  file: File,
  side: DocumentSide,
): Promise<DetectDocumentResponse | undefined> => {
  const response = await documentDetect(file, side);
  return response;
};

export const handleDetectCameraDocument = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  side: DocumentSide,
  detectingMode: DetectingMode,
): Promise<DetectDocumentResponse | undefined> => {
  if (!videoRef.current || !canvasRef.current) return;

  const context = canvasRef.current.getContext("2d");

  // Capture a high quality image from the video
  context!.drawImage(
    videoRef.current,
    0,
    0,
    canvasRef.current.width,
    canvasRef.current.height,
  );

  detectingMode === DetectingMode.PHOTO && videoRef.current.pause();
  const dataURL = canvasRef.current.toDataURL("image/jpeg");
  const blob = await fetch(dataURL).then((res) => res.blob());
  const file = new File([blob], `${side}_document.jpeg`, {
    type: "image/jpeg",
  });
  const response = await documentDetect(file, side);
  return response;
};
