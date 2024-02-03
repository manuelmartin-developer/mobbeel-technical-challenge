export enum DocumentSide {
  FRONT = "front",
  BACK = "back",
}

export enum DetectedImageQuality {
  VALID = "VALID",
  NOT_VALID = "NOT_VALID",
}

export interface DetectDocumentResponse {
  /**
   * The status code of the response
   * @type {string}
   * @memberof DetectDocumentResponse
   * @example
   * code: "OK"
   * */
  code: string;
  /**
   * The message of the response
   * @type {string}
   * @memberof DetectDocumentResponse
   * @example
   * message: "Document detected"
   * */
  description?: string;
  /**
   * The ID of the scan
   * @type {string}
   * @memberof DetectDocumentResponse
   * @example
   * scanId: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
   * */
  scanId?: string;
  /**
   * The image of the document detected
   * @type {string}
   * @memberof DetectDocumentResponse
   * @example
   * imageDocumentDetected: "data:image/jpeg;base64,/9j/4AAQ..."
   * */
  imageDocumentDetected?: string;
  /**
   * The coordinates of the MRZ in the image
   * @type {unknown}
   * @memberof DetectDocumentResponse
   * @example
   * imageMRZCoordinates: { x: 0, y: 0, width: 0, height: 0 }
   * */
  imageMRZCoordinates?: unknown;
  /**
   * The coordinates of the face in the image
   * @type {unknown}
   * @memberof DetectDocumentResponse
   * @example
   * imageFaceCoordinates: { x: 0, y: 0, width: 0, height: 0 }
   * */
  imageFaceCoordinates?: unknown;
  /**
   * The quality of the image
   * @type {string}
   * @memberof DetectDocumentResponse
   * @example
   * imageQuality: "VALID"
   * */
  imageQuality?: DetectedImageQuality;
  /**
   * The quality score of the image
   * @type {number}
   * @memberof DetectDocumentResponse
   * @example
   * imageQualityScore: 0.9
   * */
  imageQualityScore?: number;
}

/**
 *
 * @param file
 * @param side
 * @returns Promise<DetectDocumentResponse>
 */
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
