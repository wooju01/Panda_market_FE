"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

// Context 생성
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // 토큰을 로컬스토리지에서 불러오는 로직
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedNickname = localStorage.getItem("nickname");

    if (storedAccessToken && storedRefreshToken && storedNickname) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setNickname(storedNickname); 
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); 

  // 로그인 함수
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "로그인 실패");
      }
  
      const { accessToken: newAccessToken, user: { nickname: newNickname } } = data;
  
      // 응답에서 값을 확인하고 상태 업데이트
      if (newAccessToken && newNickname) {
        localStorage.setItem("accessToken", newAccessToken);
        // localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("nickname", newNickname);
        setAccessToken(newAccessToken);
        // setRefreshToken(newRefreshToken);
        setNickname(newNickname);
        setIsAuthenticated(true);
        router.push("/"); 
      } else {
        throw new Error("토큰이나 닉네임이 없습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      throw new Error("로그인 오류: " + error.message);
    }
  };

  // 새 액세스 토큰을 발급받는 함수 (리프레시 토큰 관련 부분 주석 처리)
  const refreshAccessToken = async () => {
    try {
      // 리프레시 토큰을 사용하는 부분 주석 처리.
      /*
      const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "새로운 토큰 발급 실패");
      }

      const newAccessToken = data.accessToken;
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken); 
        setAccessToken(newAccessToken);
        return newAccessToken;
      } else {
        throw new Error("새로운 액세스 토큰을 받을 수 없습니다.");
      }
      */
      console.log("리프레시 토큰 기능은 아직 구현되지 않았습니다.");
    } catch (error) {
      console.error("refreshToken 오류:", error);
      throw new Error("refreshToken 요청 오류: " + error.message);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    setAccessToken(null);
    setRefreshToken(null);
    setNickname(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        nickname,
        isAuthenticated,
        login,
        refreshAccessToken, 
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};