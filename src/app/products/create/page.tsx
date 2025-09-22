"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

export default function CreateProduct() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tags.trim()) {
        setTagList([...tagList, tags.trim()]);
        setTags("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...tagList];
    newTags.splice(index, 1);
    setTagList(newTags);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("tags", JSON.stringify(tagList));
    formData.append("favoriteCount", favoriteCount.toString());
  if (image) formData.append("image", image);

  try {
    const token = localStorage.getItem("accessToken"); 
    if (!token) throw new Error("로그인되지 않았습니다.");

    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("상품 등록 실패");
    router.push("/products");
  } catch (err) {
    const message = err instanceof Error ? err.message : '상품 등록 중 오류가 발생했습니다.';
    setError(message);
  }
};


  return (
    <div className="max-w-[900px] mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">상품 등록하기</h2>
        <button
          onClick={handleSubmit}
          className="bg-[#3692FF] text-white px-5 py-2 rounded-md text-sm"
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이미지 등록 */}
        <div>
          <label className="block font-semibold mb-2">상품 이미지</label>
          <div className="flex gap-4">
            {!preview && (
              <label className="w-[160px] h-[160px] border border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                <input type="file" className="hidden" onChange={handleImageChange} />
                <span className="text-gray-500 text-sm">+ 이미지 등록</span>
              </label>
            )}
            {preview && (
              <div className="relative w-[160px] h-[160px] rounded overflow-hidden border">
                <img src={preview} alt="미리보기" className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow"
                  onClick={handleRemoveImage}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <p className="text-red-500 text-sm mt-1">*이미지 등록은 최대 3개까지 가능합니다.</p>
        </div>

        {/* 상품명 */}
        <div>
          <label className="block font-semibold mb-2">상품명</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
            placeholder="상품명을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* 상품 설명 */}
        <div>
          <label className="block font-semibold mb-2">상품 소개</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
            placeholder="상품 소개를 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>

        {/* 가격 */}
        <div>
          <label className="block font-semibold mb-2">판매가격</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
            placeholder="가격을 입력하세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* 태그 */}
        <div>
          <label className="block font-semibold mb-2">태그</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
            placeholder="콤마(,) 또는 Enter로 구분"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {tagList.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-gray-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
