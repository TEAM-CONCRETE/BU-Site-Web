"use client";

import { Header } from "@/components/common";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Build-Up 현장 출입 시스템"
        showAdminMenu
        onAdminMenuClick={() => console.log("관리자 메뉴 클릭")}
      />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-textprimary">
            얼굴인식 웹 애플리케이션
          </h1>
        </div>
      </div>
    </div>
  );
}
