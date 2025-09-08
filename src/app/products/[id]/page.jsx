"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import noImg from "../../../../public/default.png";
import Image from "next/image";
import ProductCommentSection from "@/components/productComponents /ProductCommentSection";
import { BASE_URL } from "@/lib/constants";

// 상품 상세 정보 조회
const fetchProduct = async (productId, token) => {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
  if (!res.ok) throw new Error("상품 정보 불러오기 실패");
  return res.json();
};

function Page(props) {
  const { id: productId } = use(props.params);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId, token),
    enabled: !!productId,
  });

  // 좋아요 상태 초기화
  useEffect(() => {
    if (product?.isFavorite !== undefined) {
      setIsFavorite(product.isFavorite);
    }
  }, [product]);

  const handleLike = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsLiking(true);

    try {
      const method = isFavorite ? "DELETE" : "POST";

      const res = await fetch(`${BASE_URL}/favorites`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: Number(productId) }),
      });

      // 좋아요 상태 반영
      setIsFavorite(!isFavorite);
      refetch();
    } catch (err) {
      alert("좋아요 중 오류 발생");
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  if (isLoading) return <p>로딩 중.</p>;
  if (isError) return <p>에러 발생</p>;

  const {
    images = [noImg.src],
    name,
    price,
    description,
    tags = [],
    id,
    ownerNickname,
    createdAt,
    favoritesCount = 0,
    comments = [],
  } = product || {};

  return (
    <main>
      <div className="max-w-[1200px] mx-auto pt-6 pb-10 border-b border-b-secondary-200">
        <div className="flex gap-10">
      
    <div className="relative w-400px h-[400px] aspect-[1/1] rounded-xl object-cover border">
                <Image
                  src={
                    product.image
                      ? `http://localhost:5050${product.image}`
                      : noimg
                  }
                  alt={product.name}
                  fill
                  objectFit="cover"
                  className="rounded-xl object-cover border"
                />
              </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <p className="text-3xl font-bold text-gray-800 mb-4">
                {price.toLocaleString()} 원
              </p>

              <div className="mb-4">
                <h2 className="font-semibold mb-1">상품 소개</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              <div className="flex gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <span>{ownerNickname}</span>
                <span>. {new Date(createdAt).toLocaleDateString()}</span>
              </div>

              <div
                className="flex justify-end items-center gap-1 w-[111px] border-l border-l-secondary-200 cursor-pointer"
                onClick={handleLike}
              >
                <div className="border rounded-[35px] border-secondary-200 flex justify-center items-center w-[87px] h-10">
                  {isFavorite ? (
                    <IoHeart className="w-8 h-8 text-red-500" />
                  ) : (
                    <CiHeart className="w-8 h-8" />
                  )}
                  <span className="size-4">{favoritesCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-10 max-w-[1200px] mx-auto px-4">
        <ProductCommentSection
          productId={productId}
          comments={comments}
          refetchComments={refetch}
        />
      </div>
    </main>
  );
}

export default Page;
