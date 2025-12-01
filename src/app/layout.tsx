import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NavigationLock } from "@/components/features/attendance/NavigationLock";
import { AdminPasswordModal } from "@/components/features/admin/AdminPasswordModal";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BU 출퇴근 시스템",
  description: "Build Up 관리자용 출퇴근 관리 시스템",
  manifest: "/manifest.webmanifest",
  themeColor: "#2563EB",
  icons: {
    icon: [
      { url: "/assets/icons/192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icons/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/assets/icons/180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>
            <NavigationLock />
            {children}
            <AdminPasswordModal />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
