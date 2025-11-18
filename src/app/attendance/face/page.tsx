"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";
import { useFaceCapture } from "@/components/features/attendance/hooks/useFaceCapture";
import { Button } from "@/components/ui";
import clsx from "clsx";
import Image from "next/image";

export default function FaceRecognitionPage() {
  const router = useRouter();
  const isProgramLocked = useAttendanceLockStore(
    (state) => state.isProgramLocked
  );
  const hasHydrated = useAttendanceLockStore((state) => state.hasHydrated);
  const openAdminModal = useAttendanceLockStore(
    (state) => state.openAdminModal
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

  React.useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isProgramLocked) {
      router.replace("/");
    }
  }, [hasHydrated, isProgramLocked, router]);

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

        <main className="flex flex-1 flex-col justify-end">
          <div className="w-full px-6 pb-10 sm:px-10">
            <div className="rounded-2xl border border-white/30 bg-transparent p-6">
              <p className="text-lg font-semibold">{message}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "정면 인식",
                    active: status !== "no_face" && status !== "multiple_faces",
                  },
                  {
                    label: "움직임 감지",
                    active: movementDetected,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={clsx(
                      "rounded-xl border px-4 py-3 text-sm",
                      item.active
                        ? "border-green-400 text-green-300"
                        : "border-white/30 text-white/70"
                    )}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {snapshot && (
                <div className="mt-6 rounded-2xl border border-white/30 p-4">
                  <p className="mb-3 text-sm text-gray-200">
                    스냅샷이 캡처되었습니다. 업로드 로직은 추후 연동됩니다.
                  </p>
                  <Image
                    src={snapshot}
                    alt="Captured snapshot"
                    width={640}
                    height={480}
                    className="h-48 w-full rounded-lg object-cover"
                    unoptimized
                    priority={false}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" onClick={resetCapture}>
                      다시 촬영
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
