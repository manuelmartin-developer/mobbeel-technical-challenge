import { useEffect, useRef, useState } from "react";
import styles from "./Camera.module.scss";
import { toast } from "react-toastify";
import {
  mediaStreamConstraints,
  handleDetectCameraDocument,
  handleDetectFileDocument,
  DetectingMode,
} from "../../services/media.service";
import { useDetectedFilesStore } from "../../store/detectedFiles.store";
import {
  DetectedImageQuality,
  DocumentSide,
} from "../../services/mobbscan.service";
import Button from "../button/Button";
import {
  TbUpload,
  TbCamera,
  TbVideo,
  TbCapture,
  TbRefresh,
} from "react-icons/tb";
import { useStepperStore } from "../../store/stepper.store";

interface CameraProps {
  /**
   * The side of the document to detect
   * @type {DocumentSide}
   * @memberof CameraProps
   * @
   * @required
   * @example
   * side={DocumentSide.FRONT}
   * */
  side: DocumentSide;
}

const Camera: React.FC<CameraProps> = ({ side }) => {
  // Constants
  const isCameraAvailable = "mediaDevices" in navigator;

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureInterval = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Store states
  const { frontDocument, backDocument, setFrontDocument, setBackDocument } =
    useDetectedFilesStore();
  const { activeStep } = useStepperStore();

  //   Component states
  const [detectingMode, setDetectingMode] = useState<DetectingMode>();

  //   Methods
  const handleCaptureFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    toast.loading("Detecting document...", { toastId: "detecting" });
    const response = await handleDetectFileDocument(file, side);
    if (
      response?.imageDocumentDetected &&
      response?.imageQuality === DetectedImageQuality.VALID
    ) {
      toast.update("detecting", {
        isLoading: false,
        render: "Document detected",
        type: "success",
        autoClose: 3000,
      });
      side === DocumentSide.FRONT
        ? setFrontDocument(response?.imageDocumentDetected)
        : setBackDocument(response?.imageDocumentDetected);
      return;
    }

    inputRef.current!.value = null as unknown as string;
    toast.update("detecting", {
      isLoading: false,
      render: "Document not detected",
      type: "error",
      autoClose: 5000,
    });
  };
  const handleCaptureVideo = () => {
    toast.loading("Detecting document...", { toastId: "detectingVideo" });
    captureInterval.current = setInterval(async () => {
      const response = await handleDetectCameraDocument(
        videoRef,
        canvasRef,
        side,
        DetectingMode.VIDEO,
      );

      if (
        response?.imageDocumentDetected &&
        response?.imageQuality === "VALID"
      ) {
        videoRef.current!.pause();
        toast.update("detectingVideo", {
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
        toast.update("detectingVideo", {
          isLoading: false,
          render: "Document not detected",
          type: "error",
          autoClose: 5000,
        });
        clearInterval(captureInterval.current!);
      }, 20000);
  };

  const handleCaptutePhoto = async () => {
    toast.loading("Detecting document...", { toastId: "detectingPhoto" });
    const response = await handleDetectCameraDocument(
      videoRef,
      canvasRef,
      side,
      DetectingMode.PHOTO,
    );
    if (
      response?.imageDocumentDetected &&
      response?.imageQuality === DetectedImageQuality.VALID
    ) {
      toast.update("detectingPhoto", {
        isLoading: false,
        render: "Document detected",
        type: "success",
        autoClose: 3000,
      });
      side === DocumentSide.FRONT
        ? setFrontDocument(response?.imageDocumentDetected)
        : setBackDocument(response?.imageDocumentDetected);
      return;
    }
    if (
      response?.imageDocumentDetected &&
      response?.imageQuality === DetectedImageQuality.NOT_VALID
    ) {
      videoRef.current!.play();
      toast.update("detectingPhoto", {
        isLoading: false,
        render: "Document detected but quality is not valid. Please try again",
        type: "info",
        autoClose: 5000,
      });
      return;
    }
    videoRef.current!.play();
    toast.update("detectingPhoto", {
      isLoading: false,
      render: "Document not detected",
      type: "error",
      autoClose: 5000,
    });
  };

  //   Component Lifecycle
  useEffect(() => {
    if (!videoRef.current || detectingMode === DetectingMode.FILE) return;

    navigator.mediaDevices
      .getUserMedia({
        ...mediaStreamConstraints,
      })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
      })
      .catch((error) => {
        toast.error(`Error accessing camera: ${error.message}`);
      });
  }, [videoRef, detectingMode]);

  useEffect(() => {
    return () => {
      captureInterval.current && clearInterval(captureInterval.current);
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((error) => {
          toast.error(`Error stopping camera: ${error.message}`);
        });
    };
  }, []);

  useEffect(() => {
    if (detectingMode === DetectingMode.FILE) {
      inputRef.current!.click();
    }
  }, [detectingMode]);

  return (
    <section className={styles.camera}>
      <article className={styles.camera__selector}>
        <Button
          text={<TbUpload />}
          onClick={() => setDetectingMode(DetectingMode.FILE)}
          iconButton
        />
        {isCameraAvailable && (
          <>
            <Button
              text={<TbCamera />}
              onClick={() => setDetectingMode(DetectingMode.PHOTO)}
              iconButton
            />
            <Button
              text={<TbVideo />}
              onClick={() => setDetectingMode(DetectingMode.VIDEO)}
              iconButton
            />
          </>
        )}
      </article>
      {detectingMode &&
        (detectingMode === DetectingMode.VIDEO ||
          detectingMode === DetectingMode.PHOTO) && (
          <>
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className={styles.canvas}
              style={{ display: "none" }}
            ></canvas>
            <video
              style={{
                display:
                  (activeStep === 1 && !frontDocument) ||
                  (activeStep === 2 && !backDocument)
                    ? "block"
                    : "none",
              }}
              className={styles.camera__video}
              crossOrigin="anonymous"
              ref={videoRef}
              autoPlay
              muted
            ></video>
          </>
        )}
      {activeStep === 1 && frontDocument && (
        <img
          src={`data:image/png;base64,${frontDocument}`}
          alt="Front document"
          width="100%"
          height="auto"
        />
      )}
      {activeStep === 2 && backDocument && (
        <img
          src={`data:image/png;base64,${backDocument}`}
          alt="Back document"
          width="100%"
          height="auto"
        />
      )}
      <article className={styles.camera__actions}>
        {detectingMode &&
          detectingMode !== DetectingMode.FILE &&
          !videoRef.current?.paused && (
            <Button
              text={<TbCapture />}
              onClick={() => {
                detectingMode === DetectingMode.VIDEO
                  ? handleCaptureVideo()
                  : handleCaptutePhoto();
              }}
              disabled={!detectingMode}
              iconButton
            />
          )}
        {(detectingMode !== DetectingMode.FILE && videoRef.current?.paused) ||
          (((detectingMode === DetectingMode.FILE &&
            activeStep === 1 &&
            frontDocument) ||
            (detectingMode === DetectingMode.FILE &&
              activeStep === 2 &&
              backDocument)) && (
            <Button
              text={<TbRefresh />}
              onClick={() => {
                activeStep === 1
                  ? setFrontDocument(null)
                  : setBackDocument(null);
                videoRef.current!.play();
              }}
              iconButton
            />
          ))}
      </article>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleCaptureFile(e)}
      />
    </section>
  );
};

export default Camera;
