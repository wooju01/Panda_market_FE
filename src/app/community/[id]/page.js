"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import Image from "next/image";
import profileImg from "../../../../public/profile.png";
import { CiHeart } from "react-icons/ci";
import { IoReturnDownBack } from "react-icons/io5";
import CommentForm from "@/components/commentForm/CommentForm";
import CommentList from "@/components/commentForm/CommentList";

function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const baseURL = `http://localhost:5050/articles/${id}`;

  // 게시글 상세 fetch
  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`${baseURL}`);
      const data = await res.json();
      setArticle(data);
    };
    fetchArticle();
  }, [id]);

  // 댓글 fetch
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`${baseURL}/comments`);
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    await fetch(`${baseURL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newComment,
        writer: "익명",
      }),
    });

    setNewComment("");
    const updatedComments = await fetch(`${baseURL}/comments`).then((res) =>
      res.json()
    );
    setComments(updatedComments);
  };

  if (!article) return <p>로딩 중...</p>;

  return (
    <section className="max-w-[1920px]  mx-auto itemd px-4 md:px-[16px] py-8">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2">
          {article ? article.title : "제목 없음"}
        </h2>
        <Dropdown
          onEdit={() => router.push(`/community/${id}/edit`)}
          onDelete={async () => {
            const confirmDelete = confirm("게시글을 삭제하시겠습니까?");
            if (!confirmDelete) return;

            try {
              const res = await fetch(`http://localhost:5050/articles/${id}`, {
                method: "DELETE",
              });

              if (res.ok) {
                alert("삭제되었습니다.");
                router.push("/community");
              } else {
                alert("삭제에 실패했습니다.");
              }
            } catch (err) {
              console.error("삭제 중 오류 발생:", err);
              alert("에러가 발생했습니다.");
            }
          }}
        />
      </div>

      <div className="flex items-center text-sm text-secondary-600 mb-4 border-b border-secondary-200 h-[104px]">
        <div className="flex justify-between items-center  w-[345px]">
          <div className="flex items-center gap-[16px]">
            <Image
              src={profileImg}
              alt="Best"
              width={40}
              height={40}
              className="object-cover rounded"
            />
            <div className="flex gap-[8px]">
              {article.writer || "판다"}
              <span className="text-gray-400">
                {new Date(article.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>
          <div className="flex justify-end border-l border-secondary-200  w-[120px] ">
            <button className="flex items-center border border-secondary-200 rounded-[35px] px-[12px] py-[4px] gap-[10px]">
              <CiHeart className="w-[32px] h-[32px]" />
              {article.likes || 0}
            </button>
          </div>
        </div>
      </div>

      <p className="mb-8 text-gray-800">{article.content}</p>
      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmit={handleCommentSubmit}
      />
      <CommentList comments={comments} setComments={setComments} />

      <div className="flex justify-center mt-10 ">
        <button
          onClick={() => router.push("/community")}
          className="bg-blue-500 text-white rounded-full px-6 py-2 text-[18px] flex items-center justify-center gap-1 w-[240px]"
        >
          목록으로 돌아가기
          <IoReturnDownBack className="w-[24px] h-[24px] font-bold" />
        </button>
      </div>
    </section>
  );
}
export default ArticleDetailPage;
