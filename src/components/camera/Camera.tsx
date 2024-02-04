import { useEffect, useRef, useState } from "react";

import styles from "./Camera.module.scss";

import { toast } from "react-toastify";
import {
  TbUpload,
  TbCamera,
  TbVideo,
  TbCapture,
  TbRefresh,
} from "react-icons/tb";

import {
  mediaStreamConstraints,
  handleDetectCameraDocument,
  handleDetectFileDocument,
  DetectingMode,
} from "../../services/media.service";
import {
  DetectedImageQuality,
  DocumentSide,
} from "../../services/mobbscan.service";

import { useDetectedFilesStore } from "../../store/detectedFiles.store";
import { useStepperStore } from "../../store/stepper.store";

import Button from "../button/Button";

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

  //   Component Lifecycle
  useEffect(() => {
    if (
      !videoRef.current ||
      !detectingMode ||
      detectingMode === DetectingMode.FILE ||
      !isCameraAvailable
    ) {
      return;
    }

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
  }, [videoRef, detectingMode, isCameraAvailable]);

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

  return (
    <section className={styles.camera} data-testid="camera">
      <article
        className={styles.camera__selector}
        data-testid="camera-selector"
      >
        <Button
          testId="camera-selector-file"
          text={<TbUpload />}
          onClick={() => {
            setDetectingMode(DetectingMode.FILE);
            inputRef.current!.click();
          }}
          iconButton
          selected={detectingMode === DetectingMode.FILE}
          disabled={
            (activeStep === 1 && frontDocument) ||
            (activeStep === 2 && backDocument) ||
            !isCameraAvailable
              ? true
              : false
          }
        />
        <Button
          testId="camera-selector-photo"
          text={<TbCamera />}
          onClick={() => setDetectingMode(DetectingMode.PHOTO)}
          iconButton
          selected={detectingMode === DetectingMode.PHOTO}
          disabled={
            (activeStep === 1 && frontDocument) ||
            (activeStep === 2 && backDocument) ||
            !isCameraAvailable
              ? true
              : false
          }
        />
        <Button
          testId="camera-selector-video"
          text={<TbVideo />}
          onClick={() => setDetectingMode(DetectingMode.VIDEO)}
          iconButton
          selected={detectingMode === DetectingMode.VIDEO}
          disabled={
            (activeStep === 1 && frontDocument) ||
            (activeStep === 2 && backDocument)
              ? true
              : false
          }
        />
      </article>
      {detectingMode && detectingMode !== DetectingMode.FILE && (
        <>
          <canvas
            data-testid="camera-capture-canvas"
            ref={canvasRef}
            width={1280}
            height={720}
            className={styles.canvas}
            style={{ display: "none" }}
          ></canvas>
          <video
            data-testid="camera-video"
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
          data-testid="detected-front-document"
          src={`data:image/png;base64,${frontDocument}`}
          alt="Front document"
          width="100%"
          height="auto"
        />
      )}
      {activeStep === 2 && backDocument && (
        <img
          data-testid="detected-back-document"
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
              testId="camera-capture"
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
        {((activeStep === 1 && frontDocument) ||
          (activeStep === 2 && backDocument)) && (
          <Button
            testId="camera-refresh"
            text={<TbRefresh />}
            onClick={() => {
              activeStep === 1 ? setFrontDocument(null) : setBackDocument(null);
              videoRef.current && videoRef.current!.play();
            }}
            iconButton
          />
        )}
      </article>
      <input
        data-testid="camera-input"
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
