"use client";

import { Header } from "@/components/common";
import { CameraPreview, HomeActionButtons } from "@/components/features/home";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="Build-Up 현장 출입 시스템" showAdminMenu={false} />
      <main className="flex-1 p-6 sm:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_384px]">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-900">
                <CameraPreview className="absolute inset-0" />
              </div>
            </div>

            <div className="flex flex-col">
              <HomeActionButtons />
            </div>
          </div>
        </div>
      </main>

      <footer
        className={cn(
          "border-t bg-white/80 dark:bg-gray-900/80 px-6 py-5",
          "sm:px-8"
        )}
        style={{
          borderColor: "var(--border-color)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-textsecondary">
            영상은 출퇴근 인증에만 사용되며 암호화 전송됩니다
          </p>
        </div>
      </footer>
    </div>
  );
}
