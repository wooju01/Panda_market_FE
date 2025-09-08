"use client";

import Image from "next/image";
import Dropdown from "@/components/common/Dropdown";
import profileImg from "../../../public/profile.png";
import empty from "../../../public/empty.png";
import { useState } from "react";

export default function CommentList({ comments, setComments }) {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 flex flex-col items-center mt-12">
        <Image
          src={empty}
          alt="댓글 없음"
          width={140}
          height={140}
          className="object-cover rounded"
        />
        <p>아직 댓글이 없어요,</p>
        <p>지금 댓글을 달아보세요!</p>
      </div>
    );
  }

  const handleSaveEdit = async (cmt) => {
    try {
      const res = await fetch(
        `http://localhost:5050/articles/${cmt.articleId}/comments/${cmt.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (res.ok) {
        const updated = comments.map((item) =>
          item.id === cmt.id ? { ...item, content: editedContent } : item
        );
        setComments(updated);
        setEditCommentId(null);
        setEditedContent("");
        alert("댓글이 수정되었습니다.");
      } else {
        alert("댓글 수정 실패");
      }
    } catch (err) {
      console.error("댓글 수정 중 오류:", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <ul className="mt-12 space-y-4 w-full">
      {comments.map((cmt) => (
        <li
          key={cmt.id}
          className="flex flex-col w-full justify-between items-start bg-gray-50 border-b border-secondary-300 rounded-lg p-3 h-auto"
        >
          <div className="flex justify-between w-full gap-3 ">
            <div className="text-sm text-gray-700 w-full">
              {editCommentId === cmt.id ? (
                <div className="flex gap-2 items-center justify-between">
                  <input
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="border px-2 py-1 rounded w-[300px] text-sm"
                  />
                  <div className="flex  gap-2">
                    {" "}
                    <button
                      onClick={() => handleSaveEdit(cmt)}
                      className="text-sm text-white bg-blue-500 px-3 py-1 rounded"
                    >
                      등록
                    </button>
                    <button
                      onClick={() => {
                        setEditCommentId(null);
                        setEditedContent("");
                      }}
                      className="text-sm text-gray-400 border border-secondary-600 px-3 py-1"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                cmt.content
              )}
            </div>

            <Dropdown
              onEdit={() => {
                setEditCommentId(cmt.id);
                setEditedContent(cmt.content);
              }}
              onDelete={async () => {
                const confirmDelete = confirm("댓글을 삭제하시겠습니까?");
                if (!confirmDelete) return;

                try {
                  const res = await fetch(
                    `http://localhost:5050/articles/${cmt.articleId}/comments/${cmt.id}`,
                    {
                      method: "DELETE",
                    }
                  );

                  if (res.ok) {
                    alert("댓글이 삭제되었습니다.");
                    setComments((prev) =>
                      prev.filter((item) => item.id !== cmt.id)
                    );
                  } else {
                    alert("댓글 삭제 실패");
                  }
                } catch (err) {
                  console.error("삭제 중 오류:", err);
                }
              }}
            />
          </div>

          <div className="flex items-center text-xs mt-1 gap-[8px]">
            <Image
              src={profileImg}
              alt="댓글 작성자"
              width={32}
              height={32}
              className="object-cover rounded"
            />
            <div className="flex flex-col gap-[4px] items-start">
              <span>익명</span>
              <span className="text-secondary-400">
                {cmt.date || "방금 전"}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
