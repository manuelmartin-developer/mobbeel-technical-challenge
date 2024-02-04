import "@testing-library/jest-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { handleDetectFileDocument } from "../src/services/media.service";
import {
  DetectDocumentResponse,
  DetectedImageQuality,
  DocumentSide,
} from "../src/services/mobbscan.service";

describe("media.service", () => {
  let mockResponse: DetectDocumentResponse;

  beforeEach(() => {
    vi.clearAllMocks();
    mockResponse = {
      code: "OK",
      description: "DETECT_DOCUMENT_SUCCESS",
      scanId: "1707004776227",
      imageDocumentDetected: "/9j/4AAQSkZJRg...",
      imageMRZCoordinates: {},
      imageFaceCoordinates: {},
      imageQuality: DetectedImageQuality.VALID,
      imageQualityScore: 1.838,
    };

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });
  });

  it("should correctly handle the detection of a document.", async () => {
    // Arrange
    const imagePart = "data:image/jpeg;base64,";
    const file = new File([imagePart], "test.jpg");
    const side = DocumentSide.FRONT;

    // Act
    const result = await handleDetectFileDocument(file, side);

    // Assert
    expect(result).toBeDefined();
    expect(result?.code).toBe("OK");
    expect(result?.description).toBe("DETECT_DOCUMENT_SUCCESS");
  });
});
