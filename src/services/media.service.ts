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

/**
 * Handles the detection of a document
 * @param file The file to detect
 * @param side The side of the document
 * @returns Promise<DetectDocumentResponse | undefined>
 * */
export const handleDetectFileDocument = async (
  file: File,
  side: DocumentSide,
): Promise<DetectDocumentResponse | undefined> => {
  try {
    const response = await documentDetect(file, side);
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handles the detection of a document from the camera
 * @param videoRef The reference to the video element
 * @param canvasRef The reference to the canvas element
 * @param side The side of the document
 * @param detectingMode The detecting mode
 * @returns Promise<DetectDocumentResponse | undefined>
 * */
export const handleDetectCameraDocument = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  side: DocumentSide,
  detectingMode: DetectingMode,
): Promise<DetectDocumentResponse | undefined> => {
  if (!videoRef.current || !canvasRef.current) return;

  const context = canvasRef.current.getContext("2d");
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
  try {
    const response = await documentDetect(file, side);
    return response;
  } catch (error) {
    console.error(error);
  }
};
