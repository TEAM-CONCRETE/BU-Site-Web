"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";
import { useAttendanceSessionStore } from "@/stores/attendanceSessionStore";
import { useFaceCapture } from "@/components/features/attendance/hooks/useFaceCapture";
import { useMutation } from "@tanstack/react-query";
import {
  verifyAttendanceApi,
  type VerifyAttendanceResponse,
} from "@/lib/api/attendance";
import { dataUrlToBlob } from "@/utils/dataUrl";
import { ApiError } from "@/lib/api/errors";
import { FaceResultModal } from "@/components/features/attendance/FaceResultModal";
import { FaceStatusBar } from "@/components/features/attendance/FaceStatusBar";

interface VerificationVariables {
  snapshotDataUrl: string;
  phoneNumber: string;
}

type VerificationState =
  | "idle"
  | "verifying"
  | "verified"
  | "rejected"
  | "error";

const attendanceDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
});

const SUCCESS_REDIRECT_DELAY_MS = 4500;
const RETRY_CAPTURE_DELAY_MS = 3200;

const ATTENDANCE_TYPE_LABEL: Record<
  VerifyAttendanceResponse["attendanceType"],
  string
> = {
  CHECK_IN: "출근",
  CHECK_OUT: "퇴근",
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return attendanceDateFormatter.format(date);
}

export default function FaceRecognitionPage() {
  const router = useRouter();
  const isProgramLocked = useAttendanceLockStore(
    (state) => state.isProgramLocked
  );
  const hasHydrated = useAttendanceLockStore((state) => state.hasHydrated);
  const openAdminModal = useAttendanceLockStore(
    (state) => state.openAdminModal
  );
  const sessionHasHydrated = useAttendanceSessionStore(
    (state) => state.hasHydrated
  );
  const phoneNumber = useAttendanceSessionStore((state) => state.phoneNumber);
  const clearSessionPhoneNumber = useAttendanceSessionStore(
    (state) => state.clearPhoneNumber
  );
  const {
    videoRef,
    canvasRef,
    status,
    message,
    movementDetected,
    snapshot,
    resetCapture,
  } = useFaceCapture();
  const lastSnapshotRef = React.useRef<string | null>(null);
  const successRedirectTimeoutRef = React.useRef<number | null>(null);
  const retryTimeoutRef = React.useRef<number | null>(null);
  const {
    mutate,
    reset: resetVerification,
    data: verificationResult,
    isPending: isVerifying,
    isError: isVerificationError,
    error: verificationError,
  } = useMutation<VerifyAttendanceResponse, Error, VerificationVariables>({
    mutationFn: async ({
      snapshotDataUrl,
      phoneNumber: payloadPhoneNumber,
    }) => {
      const blob = await dataUrlToBlob(snapshotDataUrl);
      return verifyAttendanceApi({
        phoneNumber: payloadPhoneNumber,
        faceImage: blob,
      });
    },
  });

  React.useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isProgramLocked) {
      router.replace("/");
    }
  }, [hasHydrated, isProgramLocked, router]);

  React.useEffect(() => {
    if (!sessionHasHydrated) {
      return;
    }

    if (!phoneNumber) {
      router.replace("/attendance/phone");
    }
  }, [phoneNumber, router, sessionHasHydrated]);

  React.useEffect(() => {
    if (!snapshot || !phoneNumber) {
      return;
    }

    if (lastSnapshotRef.current === snapshot) {
      return;
    }

    lastSnapshotRef.current = snapshot;
    mutate({ snapshotDataUrl: snapshot, phoneNumber });
  }, [mutate, phoneNumber, snapshot]);

  const verificationState = React.useMemo<VerificationState>(() => {
    if (!snapshot) {
      return "idle";
    }
    if (isVerifying) {
      return "verifying";
    }
    if (isVerificationError) {
      return "error";
    }
    if (verificationResult) {
      return verificationResult.verified ? "verified" : "rejected";
    }
    return "idle";
  }, [isVerifying, isVerificationError, snapshot, verificationResult]);

  const statusDescription = React.useMemo(() => {
    if (!snapshot) {
      return "";
    }

    switch (verificationState) {
      case "verifying":
        return "서버에서 얼굴을 확인하는 중입니다. 잠시만 기다려주세요.";
      case "verified":
        return (
          verificationResult?.message ??
          "출퇴근 기록이 정상적으로 등록되었습니다."
        );
      case "rejected":
        return (
          verificationResult?.message ??
          "등록된 얼굴과 일치하지 않습니다. 다시 시도해주세요."
        );
      case "error":
        return (
          (verificationError instanceof ApiError
            ? verificationError.message
            : null) ?? "출퇴근 검증 중 문제가 발생했습니다. 다시 시도해주세요."
        );
      default:
        return "스냅샷이 캡처되었습니다.";
    }
  }, [snapshot, verificationError, verificationResult, verificationState]);
  const formattedTimestamp = React.useMemo(() => {
    if (!verificationResult?.timestamp) {
      return null;
    }
    return formatTimestamp(verificationResult.timestamp);
  }, [verificationResult]);
  const isRejectedOrError =
    verificationState === "rejected" || verificationState === "error";
  const attendanceTypeLabel = verificationResult
    ? ATTENDANCE_TYPE_LABEL[verificationResult.attendanceType]
    : undefined;
  const statusIndicators = React.useMemo(
    () => [
      {
        label: "정면 인식",
        active: status !== "no_face" && status !== "multiple_faces",
      },
      {
        label: "움직임 감지",
        active: movementDetected,
      },
    ],
    [movementDetected, status]
  );
  const isCheckOut =
    verificationResult?.attendanceType === "CHECK_OUT" && !isRejectedOrError;
  const onTimeCopy = isCheckOut ? "퇴근 완료! 안녕히 가십시오" : "출근 완료!";

  const handleRetake = React.useCallback(() => {
    lastSnapshotRef.current = null;
    resetVerification();
    resetCapture();
  }, [resetCapture, resetVerification]);

  const handleNextEmployee = React.useCallback(() => {
    clearSessionPhoneNumber();
    lastSnapshotRef.current = null;
    resetVerification();
    resetCapture();
    router.replace("/attendance/phone");
  }, [clearSessionPhoneNumber, resetCapture, resetVerification, router]);

  React.useEffect(() => {
    if (successRedirectTimeoutRef.current) {
      window.clearTimeout(successRedirectTimeoutRef.current);
      successRedirectTimeoutRef.current = null;
    }

    if (verificationState === "verified") {
      successRedirectTimeoutRef.current = window.setTimeout(() => {
        handleNextEmployee();
      }, SUCCESS_REDIRECT_DELAY_MS);
    }

    return () => {
      if (successRedirectTimeoutRef.current) {
        window.clearTimeout(successRedirectTimeoutRef.current);
        successRedirectTimeoutRef.current = null;
      }
    };
  }, [handleNextEmployee, verificationState]);

  React.useEffect(() => {
    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    if (verificationState === "rejected" || verificationState === "error") {
      retryTimeoutRef.current = window.setTimeout(() => {
        handleRetake();
      }, RETRY_CAPTURE_DELAY_MS);
    }

    return () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [handleRetake, verificationState]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
        playsInline
        muted
        autoPlay
      />
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/90" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div className="flex h-[460px] w-full max-w-[320px] items-center justify-center">
          <div className="h-[420px] w-[320px] rounded-[50%] border-4 border-primary/70" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          title="얼굴인식 진행 중"
          showAdminMenu
          onAdminMenuClick={openAdminModal}
          className="bg-transparent border-none"
        />
        {phoneNumber && (
          <div className="px-6 pt-2 text-sm text-white/70 sm:px-10">
            인증 중인 전화번호:{" "}
            <span className="font-semibold">{phoneNumber}</span>
          </div>
        )}

        <FaceResultModal
          isVisible={Boolean(snapshot)}
          isVerifying={verificationState === "verifying"}
          statusDescription={statusDescription}
          verificationResult={verificationResult}
          formattedTimestamp={formattedTimestamp}
          isRejectedOrError={isRejectedOrError}
          attendanceTypeLabel={attendanceTypeLabel}
          isOnTimeCopy={onTimeCopy}
        />
      </div>

      <FaceStatusBar message={message} statusIndicators={statusIndicators} />
    </div>
  );
}
