"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCommentList from "./ProductCommentList";
import { IoReturnDownBack } from "react-icons/io5";
import Pagination from "../common/Pagination";
import { BASE_URL } from "@/lib/constants";

const COMMENTS_PER_PAGE = 5;

interface ProductCommentSectionProps {
  productId: string;
  comments?: any[];
  refetchComments?: () => void;
}

const ProductCommentSection = ({ productId }: ProductCommentSectionProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const start = (currentPage - 1) * COMMENTS_PER_PAGE;
  const end = start + COMMENTS_PER_PAGE;
  const currentComments = comments.slice(start, end);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/products/${productId}/comments?limit=100`
      );
      const data = await res.json();
      setComments(data.list || []);
    } catch (err) {
      setError("댓글을 불러오는 중 오류가 발생했습니다.");
      console.error("댓글 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    if (!newComment.trim()) {
      setError("댓글을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/products/${productId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (!res.ok) {
        throw new Error("댓글 등록 실패");
      }

      setNewComment("");
      fetchComments(); 
    } catch (err) {
      setError("댓글 등록 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>

      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-6 w-full">
        <textarea
          className="w-full bg-[#F3F4F6] border-none rounded-lg pl-6 pr-6 pt-4 pb-4 resize-none"
          rows="3"
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-blue-600"
          >
            등록
          </button>
        </div>
      </form>

      {/* 로딩 상태 */}
      {loading && <p className="text-gray-500">댓글을 불러오는 중...</p>}

      {/* 댓글 리스트 */}
      <ProductCommentList
        comments={currentComments}
        productId={productId}
        fetchComments={fetchComments}
      />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="w-full flex justify-center m-6">
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-500 text-white rounded-full px-6 py-2 text-[18px] flex items-center justify-center gap-1 w-[240px]"
        >
          목록으로 돌아가기
          <IoReturnDownBack className="w-[24px] h-[24px] font-bold" />
        </button>
      </div>
    </section>
  );
};

export default ProductCommentSection;
