"use client";

import Image from "next/image";
import React, { useState } from "react";
import profileImg from "../../../public/profile.png";
import { SlOptionsVertical } from "react-icons/sl"; 
import dayjs from "@/lib/dayjs";
import { BASE_URL } from "@/lib/constants";

const ProductCommentList = ({ comments, productId, fetchComments }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const toggleDropdown = (commentId) => {
    setDropdownVisible((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleEditClick = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
    setDropdownVisible(null);
  };

  const handleDeleteClick = async (commentId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    try {
      const res = await fetch(
        `${BASE_URL}/comments/${commentId}`, 
        {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!res.ok) {
        throw new Error("댓글 삭제 실패");
      }
  
      fetchComments(); 
    } catch (err) {
      alert("댓글 삭제 중 오류가 발생했습니다.");
      console.error(err);
    }
  };
  
  

  const handleEditSubmit = async (e, commentId) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch(
        `https://panda-market-api.vercel.app/comments/${commentId}`, 
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (!res.ok) {
        throw new Error("댓글 수정 실패");
      }

      setEditingCommentId(null);
      setEditedContent("");
      fetchComments(); 
    } catch (err) {
      alert("댓글 수정 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  if (comments.length === 0) {
    return <p className="text-gray-500">첫 번째 댓글을 남겨보세요!</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="flex justify-between border-b border-secondary-300 pb-3 relative"
        >
          <div className="flex flex-col gap-2 mb-1">
            {editingCommentId === comment.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className="space-y-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="3"
                  className="w-full bg-[#F3F4F6] border-none rounded-lg pl-6 pr-6 pt-4 pb-4 resize-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  저장
                </button>
              </form>
            ) : (
              <>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={profileImg}
                      alt="프로필"
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{comment.writer.nickname}</span>
                    <span className="text-gray-400 text-sm">
                      {dayjs(comment.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 드롭다운 아이콘 */}
          <SlOptionsVertical
            className="cursor-pointer absolute top-2 right-0"
            onClick={() => toggleDropdown(comment.id)}
          />

          {/* 드롭다운 메뉴 */}
          {dropdownVisible === comment.id && !editingCommentId && (
            <div className="absolute top-6 right-0 mt-2 w-40 bg-white border border-secondary-200 rounded-lg shadow-lg text-center text-secondary-500">
              <button
                onClick={() => handleEditClick(comment.id, comment.content)}
                className="block w-full px-4 py-2 hover:bg-gray-200"
              >
                수정하기
              </button>
              <button
                onClick={() => handleDeleteClick(comment.id)}
                className="block w-full px-4 py-2 hover:bg-gray-200 text-secondary-500"
              >
                삭제하기
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductCommentList;
