"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const pageGroupSize = 5; // 한번에 보여줄 페이지 수
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-8 items-center mb-7">
      {/* 이전 그룹으로 */}
      {startPage > 1 && (
        <button
          onClick={() => handlePageChange(startPage - 1)}
          className="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 "
        >
           &lt;
        </button>
      )}

      {/* 현재 그룹의 페이지들 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-full border transition ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 그룹으로 */}
      {endPage < totalPages && (
        <button
          onClick={() => handlePageChange(endPage + 1)}
          className="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
        >
           &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
