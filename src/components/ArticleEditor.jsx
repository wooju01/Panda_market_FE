"use client";

import { useState, useEffect } from "react";

function ArticleEditor({ mode = "create", initialData, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    await onSubmit({ title, content });
  };

  return (
    <section className="px-4 md:px-[200px] py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {mode === "edit" ? "게시글 수정" : "게시글 쓰기"}
        </h2>
        <button
          onClick={handleSubmit}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm w-[74px] h-[42px] text-[16px]"
        >
          {mode === "edit" ? "수정" : "등록"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block font-bold mb-2 text-[18px]">*제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 px-4 bg-gray-100 rounded-lg focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-bold mb-2 text-[18px]">*내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-60 p-4 bg-gray-100 rounded-lg resize-none focus:outline-none"
        />
      </div>
    </section>
  );
}

export default ArticleEditor;
