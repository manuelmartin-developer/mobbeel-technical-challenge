import { DocumentSide } from "../components/media/Camera";
import { DetectDocumentResponse, documentDetect } from "./mobbscan.service";

export const mediaStreamConstraints = {
  video: {
    advanced: [
      {
        width: { min: 1280, ideal: 1920, max: 1920 },
        height: { min: 720, ideal: 1080, max: 1080 },
      },
    ],
  },
  audio: false,
};

export const handleDetectDocument = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  side: DocumentSide,
  detectingMode: "image" | "video",
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

  detectingMode === "image" && videoRef.current.pause();
  const dataURL = canvasRef.current.toDataURL("image/jpeg");
  const blob = await fetch(dataURL).then((res) => res.blob());
  const file = new File([blob], `${side}_document.jpeg`, {
    type: "image/jpeg",
  });
  detectingMode === "image" && setFile(file);
  const response = await documentDetect(file, side);
  return response;
};
