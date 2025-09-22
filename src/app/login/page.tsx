"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("알림 메시지");

  const { login } = useAuth();
  const router = useRouter();

  const isDisabled = !email || !password;

  const handleLogin = async () => {
    try {
      await login(email, password);
      setAlertMessage("로그인 성공!");
      setShowModal(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
      setAlertMessage(message);
      setShowModal(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-5">
      <Link href="/">
        <div className="mb-5">
          <Image src="/logo_1.png" alt="logo" width={396} height={132} />
        </div>
      </Link>

      <div className="w-full max-w-160 flex flex-col gap-6">
        {/* 이메일 입력 */}
        <div>
          <label className="font-bold">이메일</label>
          <input
            type="email"
            className={`w-full h-14 px-3 mt-1 rounded-xl bg-gray-100 text-base outline-none focus:border-2 ${
              emailError ? "border-2 border-red-500" : "focus:border-blue-500"
            }`}
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label className="font-bold">비밀번호</label>
          <div
            className={`flex items-center h-14 px-3 mt-1 rounded-xl border-2 ${
              passwordError
                ? "border-red-500"
                : "border-gray-100 focus-within:border-blue-500"
            } bg-gray-100`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="flex-grow bg-transparent outline-none text-base"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src="/eye_button.png"
                alt="toggle password"
                width={24}
                height={24}
              />
            </button>
          </div>

          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={isDisabled}
          className={`w-full h-14 rounded-full text-white text-lg ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <div className="text-center text-sm mt-6 flex justify-center pb-10">
          <p>판다마켓이 처음이신가요?</p>
          <Link href="/signup">
            <span className="text-blue-500 font-semibold ml-1">회원가입</span>
          </Link>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 shadow-2xl">
          <div className="w-[540px] h-[250px] bg-white p-6 rounded-lg relative flex flex-col items-center justify-center">
            <p className="text-base font-medium">{alertMessage}</p>
            <button
              onClick={() => {
                setShowModal(false);
                if (alertMessage === "로그인 성공!") {
                  router.push("/items");
                }
              }}
              className="absolute bottom-5 right-5 w-[120px] h-[50px] bg-blue-500 rounded-lg text-white text-base"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
