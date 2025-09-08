'use client';
import ArticleEditor from "@/components/ArticleEditor";
import { useRouter } from "next/navigation";

function WritePage() {
  const router = useRouter();

  const handleCreate = async ({ title, content }) => {
    const response = await fetch("http://localhost:5050/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("등록 성공!");
      router.push("/"); // 목록으로 이동
    } else {
      alert("등록 실패");
    }
  };

  return <ArticleEditor mode="create" onSubmit={handleCreate} />;
}

export default WritePage;