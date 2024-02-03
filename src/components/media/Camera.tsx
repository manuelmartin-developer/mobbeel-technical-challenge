import { useEffect, useRef, useState } from "react";
import styles from "./Camera.module.scss";
import { toast } from "react-toastify";
import {
  mediaStreamConstraints,
  handleDetectDocument,
} from "../../services/media.service";
import { useDetectedFilesStore } from "../../store/detectedFiles";

export enum DocumentSide {
  FRONT = "front",
  BACK = "back",
}

interface CameraProps {
  side: DocumentSide;
}

const Camera: React.FC<CameraProps> = ({ side }) => {
  // Constants
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureInterval = useRef<NodeJS.Timeout | null>(null);

  // Store states
  const { setFrontDocument, setBackDocument } = useDetectedFilesStore();

  //   Component states
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [detectingMode, setDetectingMode] = useState<"image" | "video">(
    "image",
  );

  //   Methods
  const handleCaptureVideo = () => {
    toast.loading("Detecting document...", { toastId: "detecting" });
    captureInterval.current = setInterval(async () => {
      const response = await handleDetectDocument(
        videoRef,
        canvasRef,
        side,
        detectingMode,
      );
      console.log(response);
      if (response?.imageDocumentDetected) {
        videoRef.current!.pause();
        toast.update("detecting", {
          isLoading: false,
          render: "Document detected",
          type: "success",
          autoClose: 3000,
        });
        side === DocumentSide.FRONT
          ? setFrontDocument(response?.imageDocumentDetected)
          : setBackDocument(response?.imageDocumentDetected);
        clearInterval(captureInterval.current!);
        return;
      }
    }, 1000);

    captureInterval.current &&
      setTimeout(() => {
        toast.update("detecting", {
          isLoading: false,
          render: "Document not detected",
          type: "error",
          autoClose: false,
        });
        clearInterval(captureInterval.current!);
      }, 20000);
  };

  const handleCaptutePhoto = async () => {
    const response = await handleDetectDocument(
      videoRef,
      canvasRef,
      side,
      detectingMode,
    );
    if (response?.imageDocumentDetected) {
      toast.success("Document detected");
      side === DocumentSide.FRONT
        ? setFrontDocument(response?.imageDocumentDetected)
        : setBackDocument(response?.imageDocumentDetected);
      return;
    }
    toast.error("Document not detected", {
      autoClose: 5000,
    });
  };

  //   Component Lifecycle
  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({
          ...mediaStreamConstraints,
          video: { facingMode: facingMode },
        })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((error) => {
          toast.error(`Error accessing camera: ${error.message}`);
        });
    }

    return () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((error) => {
          toast.error(`Error stopping camera: ${error.message}`);
        });
    };
  }, [videoRef, facingMode]);

  useEffect(() => {
    return () => {
      clearInterval(captureInterval.current!);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${styles.canvas_hidden}`}
      ></canvas>

      <video crossOrigin="anonymous" ref={videoRef} autoPlay muted></video>

      <button onClick={() => setDetectingMode("image")}>Image</button>
      <button onClick={() => setDetectingMode("video")}>Video</button>
      <button
        onClick={() => {
          side === "front" ? setFrontDocument(null) : setBackDocument(null);
          videoRef.current!.play();
        }}
      >
        Retry
      </button>
      {detectingMode === "video" && (
        <button onClick={handleCaptureVideo}>Start</button>
      )}
      <button onClick={handleCaptutePhoto}>Capture</button>
      {isMobile && (
        <button
          onClick={() =>
            setFacingMode(facingMode === "user" ? "environment" : "user")
          }
        >
          Switch Camera
        </button>
      )}
    </div>
  );
};

export default Camera;
