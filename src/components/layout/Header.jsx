import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";  
import logo from "../../../public/logo.png";
import profileImg from "../../../public/profile.png";

function Header() {
  const { isAuthenticated, nickname, login, logout } = useAuth(); 
  const router = useRouter();

  

  return (
    <header className="fixed border-b border-gray-300 top-0 left-0 w-full bg-white z-[1000]">
      <div className="w-full max-w-[1920px] h-[70px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-[16px]">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-4">
            <Image
              src={logo}
              alt="logo"
              className="w-auto h-10 hidden md:block"
            />
            <p className="text-[24px] text-[#3692FF] ml-1 font-bold whitespace-nowrap">
              판다마켓
            </p>
          </Link>

          <nav className="flex gap-6 font-medium text-gray-700 ml-6">
            <Link href="/community" className="hover:text-blue-500 transition">
              자유게시판
            </Link>
            <Link href="/products" className="hover:text-blue-500 transition">
              중고마켓
            </Link>
          </nav>
        </div>

        {/* 로그인 상태에 따라 버튼을 변경 */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="w-[40px] h-[40px] rounded-full overflow-hidden"
            >
              <Image
                src={profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </Link>

            {/* 닉네임 프로필 이미지 */}
            <span className="text-sm font-medium text-gray-700">{nickname}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={logout}  // 로그아웃 함수 호출
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-[128px] h-[48px] bg-[#3692ff] hover:bg-[#1967d6] text-white text-[16px] leading-[26px] font-semibold rounded-lg text-center py-[12px] px-[23px]"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
