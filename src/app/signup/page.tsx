"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/constants";


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [chkPassword, setChkPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showChkPassword, setShowChkPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [chkPasswordError, setChkPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const isDisabled = !email || !nickname || !password || !chkPassword;
  const router = useRouter();

  const handleSignup = async () => {
    if (!email.includes("@")) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }
    if (password !== chkPassword) {
      setChkPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nickname,
          password,
          passwordConfirmation: chkPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "회원가입 실패");
      }

      setAlertMessage("회원가입이 완료되었습니다.");
      setShowModal(true);
    } catch (e) {
      console.error("회원가입 실패:", e);
      const message = e instanceof Error ? e.message : "회원가입에 실패했습니다.";
      setAlertMessage(message);
      setShowModal(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-10">
      <Link href="/">
        <Image src="/logo_1.png" alt="logo" width={396} height={132} />
      </Link>

      <div className="w-full max-w-160 flex flex-col gap-6 mt-10">
        <div>
          <label className="font-bold">이메일</label>
          <input
            type="email"
            className={`w-full h-12 px-3 mt-1 rounded-xl bg-gray-100 outline-none border-2 ${
              emailError
                ? "border-red-500"
                : "border-transparent focus:border-blue-500"
            }`}
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div>
          <label className="font-bold">닉네임</label>
          <input
            className="w-full h-12 px-3 mt-1 rounded-xl bg-gray-100 outline-none border-2 border-transparent focus:border-blue-500"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div>
          <label className="font-bold">비밀번호</label>
          <div
            className={`flex items-center h-12 px-3 mt-1 rounded-xl bg-gray-100 border-2 ${
              passwordError
                ? "border-red-500"
                : "border-transparent focus-within:border-blue-500"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="flex-grow bg-transparent outline-none"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              <Image src="/eye_button.png" alt="eye" width={24} height={24} />
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div>
          <label className="font-bold">비밀번호 확인</label>
          <div
            className={`flex items-center h-12 px-3 mt-1 rounded-xl bg-gray-100 border-2 ${
              chkPasswordError
                ? "border-red-500"
                : "border-transparent focus-within:border-blue-500"
            }`}
          >
            <input
              type={showChkPassword ? "text" : "password"}
              className="flex-grow bg-transparent outline-none"
              placeholder="비밀번호를 다시 입력해주세요."
              value={chkPassword}
              onChange={(e) => {
                setChkPassword(e.target.value);
                setChkPasswordError("");
              }}
            />
            <button type="button" onClick={() => setShowChkPassword(!showChkPassword)}>
              <Image src="/eye_button.png" alt="eye" width={24} height={24} />
            </button>
          </div>
          {chkPasswordError && (
            <p className="text-red-500 text-sm mt-1">{chkPasswordError}</p>
          )}
        </div>

        <button
          onClick={handleSignup}
          disabled={isDisabled}
          className={`w-full h-14 rounded-full text-white text-lg ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          회원가입
        </button>

        <div className="w-full h-[74px] bg-[#E6F2FF] rounded-lg flex items-center justify-center gap-4">
          <div className="w-[594px] flex justify-between">
            <p className="font-semibold">간편 로그인하기</p>
            <div className="flex gap-2">
              <Link href="https://www.google.com/">
                <Image src="/Component 2.png" alt="구글 로그인" width={32} height={32} />
              </Link>
              <Link href="https://www.kakaocorp.com/page">
                <Image src="/Component 3.png" alt="카카오 로그인" width={32} height={32} />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-sm mt-6">
          이미 회원이신가요?{" "}
          <Link href="/login" className="text-blue-500 font-semibold">
            로그인
          </Link>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="w-[540px] h-[250px] bg-white p-6 rounded-lg relative flex flex-col items-center justify-center">
            <p className="text-base font-medium">{alertMessage}</p>
            <button
              onClick={() => {
                setShowModal(false);
                if (alertMessage === "회원가입이 완료되었습니다.") {
                  router.push("/login");
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
