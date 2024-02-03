import { DocumentSide } from "../components/media/Camera";

export interface DetectDocumentResponse {
  code: string;
  description?: string;
  scanId?: string;
  imageDocumentDetected?: string;
  imageMRZCoordinates?: unknown;
  imageFaceCoordinates?: unknown;
  imageQuality?: string;
  imageQualityScore?: number;
}

export const documentDetect = async (
  file: File,
  side: DocumentSide,
): Promise<DetectDocumentResponse> => {
  const data = new FormData();
  data.append("documentSide", side);
  data.append("documentType", "TD1");
  data.append("image", file);
  data.append("licenseId", "mobbscan-challenge");
  data.append("returnCroppedImage", "true");
  const response = await fetch(import.meta.env.VITE_BASE_URL, {
    method: "POST",
    body: data,
  });
  return await response.json();
};
