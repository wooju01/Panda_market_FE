"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import Pagination from "@/components/common/Pagination";
import Image from "next/image";
import noimg from "../../../public/Property.png";
import { CiHeart } from "react-icons/ci";
import { BASE_URL } from "@/lib/constants";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  // API 호출 함수
  const fetchProducts = async () => {
    console.log("fetchProducts 호출됨");
    try {
      const response = await fetch(
        `${BASE_URL}/products?page=${currentPage}&order=${order}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("상품을 불러오는 데 실패했습니다.");
      }
      const data = await response.json();
      console.log("API 데이터:", data);
      if (data.list) {
        let filteredData = data.list;

        // 검색어 필터링
        if (searchTerm) {
          filteredData = filteredData.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // 정렬
        if (order === "favoriteCount") {
          filteredData = filteredData.sort(
            (a, b) => b.favoriteCount - a.favoriteCount
          );
        } else {
          filteredData = filteredData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setCurrentItems(filteredData);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 검색어가 바뀔 때마다 fetchProducts 실행
  useEffect(() => {
    fetchProducts();
  }, [currentPage, order, searchTerm]);

  // 페이지네이션 처리
  const paginate = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="flex flex-col items-center w-full max-w-[1200px] mx-auto mt-5">
      {/* 상품 헤더 */}
      <div className="w-full flex justify-between items-center px-5 py-5">
        <h2 className="text-xl font-bold">상품 목록</h2>
        <div className="flex gap-4 w-[529px]">
          <div className="flex items-center bg-gray-100 rounded-[12px] px-2 w-[242px]">
            <CiSearch />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-transparent border-none outline-none pl-2 text-base"
            />
          </div>
          <button className="bg-[#3692FF] text-white w-[133px] h-[42px] rounded-[8px] text-[16px]">
            상품 등록하기
          </button>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-[130px] h-[42px] bg-white border border-gray-300 rounded-[8px] text-sm text-gray-600 px-2 focus:outline-none"
          >
            <option value="createdAt">최신순</option>
            <option value="favoriteCount">좋아요순</option>
          </select>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-5 gap-5 w-full mt-5">
        {error && <p className="text-red-500">{error}</p>}
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="relative w-full aspect-[1/1]">
                <Image
                  src={product.images?.[0] || noimg}
                  alt={product.name}
                  fill
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold leading-6 mt-2">
                  {product.name}
                </p>
                <p className="text-base font-bold text-gray-800">
                  {product.price > 0 ? product.price.toLocaleString() : 0}원
                </p>
                <p className="flex items-center gap-1 mt-1 text-gray-600">
                  <CiHeart />
                  {product.favoriteCount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-5">상품이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(100 / 10)}
        paginate={paginate}
      />
    </main>
  );
}

export default Page;
