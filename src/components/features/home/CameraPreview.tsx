"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

interface CameraPreviewProps {
  className?: string;
}

export function CameraPreview({ className }: CameraPreviewProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const startCamera = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);

        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
              console.error("Video play error:", err);
            });
          }
        };
      } else {
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "카메라에 접근할 수 없습니다. 권한을 확인해주세요.";
      setError(errorMessage);
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = React.useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startCamera();
    }, 100);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-2xl overflow-hidden",
        "bg-gray-900 flex items-center justify-center",
        className
      )}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "w-full h-full object-cover",
          !isStreaming && "hidden",
          "-scale-x-100" // 좌우 반전
        )}
      />

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center bg-gray-900 z-20">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-2">카메라 오류</p>
            <p className="text-xs text-gray-400">{error}</p>
          </div>
        </div>
      )}

      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 z-20">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">카메라 연결 중...</p>
        </div>
      )}

      {!isStreaming && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center bg-gray-900 z-20">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-400">카메라 미리보기</p>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        {!isStreaming ? (
          <button
            onClick={startCamera}
            disabled={isLoading}
            className={cn(
              "px-6 py-3 rounded-full",
              "bg-primary text-white",
              "font-medium text-sm",
              "hover:bg-primary-dark",
              "transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg"
            )}
          >
            {isLoading ? "연결 중..." : "카메라 시작"}
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className={cn(
              "px-6 py-3 rounded-full",
              "bg-gray-700 text-white",
              "font-medium text-sm",
              "hover:bg-gray-600",
              "transition-colors",
              "shadow-lg"
            )}
          >
            중지
          </button>
        )}
      </div>
    </div>
  );
}
