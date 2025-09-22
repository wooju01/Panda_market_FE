// app/edit/[id]/page.jsx
"use client";

import ArticleEditor from "@/components/ArticleEditor";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const baseURL = `http://localhost:5050/articles/${id}`;
  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`${baseURL}`);
      const data = await res.json();
      setInitialData(data);
    };
    fetchArticle();
  }, [id]);
  
  const handleEdit = async ({ title, content }) => {
    const response = await fetch(`${baseURL}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    console.log("수정 요청 URL:", baseURL);
    console.log("보낼 데이터:", { title, content });
  
    if (response.ok) {
      alert("수정 완료!");
      router.push("/");
    } else {
      alert("수정 실패");
    }
  };

  return (
    <ArticleEditor
      mode="edit"
      initialData={initialData}
      onSubmit={handleEdit}
    />
  );
}

export default EditPage;
