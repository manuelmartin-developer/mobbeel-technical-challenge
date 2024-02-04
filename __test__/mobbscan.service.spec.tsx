import { beforeAll, describe, expect, it, vi, beforeEach } from "vitest";
import {
  DetectedImageQuality,
  DocumentSide,
  documentDetect,
  DetectDocumentResponse,
} from "../src/services/mobbscan.service";

describe("mobbscan.service", () => {
  let mockResponse: DetectDocumentResponse;
  beforeAll(() => {
    Object.defineProperty(global.navigator, "mediaDevices", {
      value: {
        getUserMedia: vi.fn().mockResolvedValue({}),
      },
    });
  });

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

  it("should correctly detect the document side and type when passed valid input", async () => {
    // Arrange
    const file = new File([""], "test.jpg");
    const side = DocumentSide.FRONT;

    // Act
    const result = await documentDetect(file, side);

    // Assert
    expect(result.code).toBe("OK");
    expect(result.description).toBe("DETECT_DOCUMENT_SUCCESS");
  });

  it("should correctly send a POST request to the specified URL with the correct data when passed valid input", async () => {
    // Arrange
    const file = new File([""], "test.jpg");
    const side = DocumentSide.FRONT;
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ json: vi.fn().mockResolvedValue({ code: "OK" }) });
    global.fetch = fetchMock;

    // Act
    await documentDetect(file, side);

    // Assert
    expect(fetchMock).toHaveBeenCalledWith(import.meta.env.VITE_BASE_URL, {
      method: "POST",
      body: expect.any(FormData),
    });
  });

  it("should correctly return a DetectDocumentResponse object when passed valid input and receiving a valid response from the server", async () => {
    // Arrange
    const file = new File([""], "test.jpg");
    const side = DocumentSide.FRONT;
    const response = {
      code: "OK",
      description: "Document detected",
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ json: vi.fn().mockResolvedValue(response) });
    global.fetch = fetchMock;

    // Act
    const result = await documentDetect(file, side);

    // Assert
    expect(result).toEqual(response);
  });
});
