"use client";

import clsx from "clsx";
import type { VerifyAttendanceResponse } from "@/lib/api/attendance";

interface FaceResultModalProps {
  isVisible: boolean;
  isVerifying: boolean;
  statusDescription: string;
  verificationResult?: VerifyAttendanceResponse | null;
  formattedTimestamp?: string | null;
  isRejectedOrError: boolean;
  failureMessage?: string | null;
  attendanceTypeLabel?: string;
  isLateCopy?: string;
  isOnTimeCopy?: string;
}

export function FaceResultModal({
  isVisible,
  isVerifying,
  statusDescription,
  verificationResult,
  formattedTimestamp,
  isRejectedOrError,
  failureMessage = "얼굴 검증에 실패했습니다. 잠시 후 자동으로 재촬영을 시작합니다.",
  attendanceTypeLabel,
  isLateCopy = "⚠️ 지각이 감지되었습니다.",
  isOnTimeCopy = "정상 출근으로 기록되었습니다.",
}: FaceResultModalProps) {
  if (!isVisible) {
    return null;
  }

  const showResultDetails =
    Boolean(verificationResult) && !isRejectedOrError && !isVerifying;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pb-12 pt-10 sm:px-10">
      <div className="pointer-events-auto w-full max-w-3xl rounded-3xl border border-white/20 bg-black/80 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-md">
        {isVerifying && (
          <div className="mt-2 flex items-center justify-center gap-3 text-base text-white/80">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>서버에서 얼굴을 확인하는 중입니다. 잠시만 기다려주세요.</span>
          </div>
        )}
        {statusDescription && !isVerifying && (
          <p className="mt-2 text-base text-white/80">{statusDescription}</p>
        )}

        <div className="mt-6 rounded-3xl border border-white/15 bg-white/5 p-6 text-left text-sm text-white/80 sm:text-base">
          {showResultDetails && verificationResult && (
            <>
              <p className="text-2xl font-semibold text-white">
                {verificationResult.employeeName}
                <span className="ml-2 text-base text-white/70">
                  ({verificationResult.employeeId})
                </span>
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <ResultItem label="출퇴근 유형">
                  {attendanceTypeLabel ?? verificationResult.attendanceType}
                </ResultItem>
                <ResultItem label="기록 시각">
                  {formattedTimestamp ?? "-"}
                </ResultItem>
              </div>
              {typeof verificationResult.isLate === "boolean" && (
                <p
                  className={clsx(
                    "mt-5 rounded-2xl px-4 py-3 text-base font-semibold",
                    verificationResult.isLate
                      ? "bg-red-500/15 text-red-100"
                      : "bg-green-500/15 text-green-100"
                  )}
                >
                  {verificationResult.isLate ? isLateCopy : isOnTimeCopy}
                </p>
              )}
              <p className="mt-4 text-sm text-green-200">
                잠시 후 다음 근로자 인증 화면으로 이동합니다.
              </p>
            </>
          )}

          {isRejectedOrError && !isVerifying && (
            <p className="text-base text-yellow-200">{failureMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
      <p className="mt-1 text-base font-semibold text-white">{children}</p>
    </div>
  );
}
