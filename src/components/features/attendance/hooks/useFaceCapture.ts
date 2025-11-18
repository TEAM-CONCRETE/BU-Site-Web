"use client";

import * as React from "react";
import type * as FaceApiModule from "face-api.js";

type FaceCaptureStatus =
  | "loading_models"
  | "initializing_camera"
  | "waiting"
  | "no_face"
  | "multiple_faces"
  | "not_centered"
  | "movement_required"
  | "capturing"
  | "captured"
  | "error";

const ANGLE_THRESHOLD = 15; // degrees
const MOVEMENT_THRESHOLD = 12; // px

interface UseFaceCaptureResult {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  status: FaceCaptureStatus;
  message: string;
  movementDetected: boolean;
  snapshot?: string | null;
  resetCapture: () => void;
}

type Point = FaceApiModule.Point;
type Faceapi = typeof FaceApiModule;

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function computeRollAngle(landmarks: FaceApiModule.FaceLandmarks68) {
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  if (!leftEye || !rightEye) return 0;
  const left = leftEye[0];
  const right = rightEye[0];
  const dy = right.y - left.y;
  const dx = right.x - left.x;
  const angleRad = Math.atan2(dy, dx);
  return (angleRad * 180) / Math.PI;
}

const DETECTION_INTERVAL_MS = 120;

export function useFaceCapture(): UseFaceCaptureResult {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const faceapiRef = React.useRef<Faceapi | null>(null);
  const detectionLoopRef = React.useRef<number | null>(null);
  const prevCenterRef = React.useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = React.useRef<string | null>(null);
  const movementRef = React.useRef(false);
  const [status, setStatus] =
    React.useState<FaceCaptureStatus>("loading_models");
  const [message, setMessage] = React.useState("모델을 불러오는 중입니다.");
  const [movementDetected, setMovementDetected] = React.useState(false);
  const [snapshot, setSnapshot] = React.useState<string | null>(null);

  const resetCapture = React.useCallback(() => {
    setSnapshot(null);
    snapshotRef.current = null;
    movementRef.current = false;
    setMovementDetected(false);
    prevCenterRef.current = null;
    setStatus("waiting");
    setMessage("카메라를 응시해 주세요.");
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;

    const loadModels = async () => {
      setStatus("loading_models");
      setMessage("AI 모델을 불러오는 중입니다.");
      const faceapi = await import("face-api.js");
      faceapiRef.current = faceapi;
      try {
        await faceapi.tf.setBackend("webgl");
      } catch (error) {
        console.warn(
          "Failed to set WebGL backend, falling back to default.",
          error
        );
      }
      await faceapi.tf.ready();
      const MODEL_URL =
        process.env.NEXT_PUBLIC_FACE_MODEL_URL?.replace(/\/$/, "") || "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      ]);

      if (cancelled) return;
      await initializeCamera();
      runDetectionLoop();
    };

    const initializeCamera = async () => {
      setStatus("initializing_camera");
      setMessage("카메라를 준비하고 있습니다.");
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStatus("waiting");
      setMessage("카메라를 응시해 주세요.");
    };

    const runDetectionLoop = () => {
      const detect = async () => {
        if (cancelled || !faceapiRef.current || !videoRef.current) return;
        if (videoRef.current.readyState < 2) {
          detectionLoopRef.current = window.setTimeout(
            detect,
            DETECTION_INTERVAL_MS
          );
          return;
        }

        try {
          if (snapshotRef.current) {
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          const faceapi = faceapiRef.current;
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 224,
              scoreThreshold: 0.5,
            })
          );

          if (detections.length === 0) {
            setStatus("no_face");
            setMessage("얼굴이 보이지 않습니다. 화면을 바라봐 주세요.");
            prevCenterRef.current = null;
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          if (detections.length > 1) {
            setStatus("multiple_faces");
            setMessage("한 명씩 촬영해주세요.");
            prevCenterRef.current = null;
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          const detailedDetection = await faceapi
            .detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: 0.5,
              })
            )
            .withFaceLandmarks(true);

          if (!detailedDetection) {
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          const { detection, landmarks } = detailedDetection;
          const angle = Math.abs(computeRollAngle(landmarks) || 0);
          if (angle > ANGLE_THRESHOLD) {
            setStatus("not_centered");
            setMessage("정면을 향해 주세요.");
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          const { box } = detection;
          const center = {
            x: box.x + box.width / 2,
            y: box.y + box.height / 2,
          };
          if (prevCenterRef.current) {
            const movement = distance(prevCenterRef.current, center);
            if (movement > MOVEMENT_THRESHOLD) {
              movementRef.current = true;
              setMovementDetected(true);
            }
          }
          prevCenterRef.current = center;

          if (!movementRef.current) {
            setStatus("movement_required");
            setMessage("화면 안에서 자연스럽게 움직여 주세요.");
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
            return;
          }

          await captureSnapshot();
        } catch (error) {
          console.error(error);
          setStatus("error");
          setMessage("얼굴을 감지하는 중 오류가 발생했습니다.");
        } finally {
          if (!snapshotRef.current) {
            detectionLoopRef.current = window.setTimeout(
              detect,
              DETECTION_INTERVAL_MS
            );
          }
        }
      };

      detectionLoopRef.current = window.setTimeout(
        detect,
        DETECTION_INTERVAL_MS
      );
    };

    const captureSnapshot = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      setStatus("capturing");
      setMessage("스냅샷을 캡처 중입니다.");

      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      snapshotRef.current = dataUrl;
      setSnapshot(dataUrl);
      setStatus("captured");
      setMessage("캡처가 완료되었습니다.");
    };

    loadModels();

    return () => {
      cancelled = true;
      if (detectionLoopRef.current) {
        window.clearTimeout(detectionLoopRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    status,
    message,
    movementDetected,
    snapshot,
    resetCapture,
  };
}
