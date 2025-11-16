import Image from "next/image";

export function LoginHeader() {
  return (
    <>
      <div className="mb-6 flex justify-center">
        <Image
          src="/assets/service_logo.svg"
          alt="Build-Up 로고"
          width={120}
          height={120}
          priority
        />
      </div>

      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold leading-[36px] text-primary sm:text-[30px]">
          현장 출입 시스템 로그인
        </h1>
        <p className="text-sm leading-[23px] text-textsecondary">
          Build-Up 현장 관리자 계정으로 로그인하세요!
        </p>
      </div>
    </>
  );
}
