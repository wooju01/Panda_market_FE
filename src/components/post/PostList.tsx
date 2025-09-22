"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // 추가
import PostItem from "./PostItem";
import Link from "next/link";
import Pagination from "../common/Pagination";
import { CiSearch } from "react-icons/ci";

interface Post {
  id: number;
  title: string;
  createdAt: string;
  writer: string;
  likes: number;
  image?: string;
}

function PostList() {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");
  const postsPerPage = 5;

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5050/articles");
        const data = await response.json();
        const enrichedPosts = data.map((post: any) => ({
          ...post,
          writer: `판다${Math.floor(Math.random() * 100)}`,
          likes: Math.floor(Math.random() * 9999),
        }));
        setPosts(enrichedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // 검색 + 정렬 적용
  useEffect(() => {
    let filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption === "likes") {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredPosts(filtered);
  }, [search, posts, sortOption]);

  // 페이지 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = filteredPosts.slice(start, end);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // 정렬 옵션 변경 시 1페이지로 이동
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    handlePageChange(1);
  };

  return (
    <section className="px-4 md:px-[200px] ">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-xl">게시글</p>
        <Link href={"/write"}>
          <button className="bg-[#3692FF] text-white w-[88px] h-[42px] rounded-[8px] text-[16px]">
            글쓰기
          </button>
        </Link>
      </div>

      <div className="flex justify-between mb-4 relative">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="border px-4 py-2 rounded-[12px] w-full bg-gray-200 border-0 focus:outline-none pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch className="absolute top-2.5 w-[24px] h-[24px] left-3" />
        <select
          className="ml-4 border px-2 py-1 rounded-[12px] text-sm border-gray-200 w-[130px] h-[42px]"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="latest">최신순</option>
          <option value="likes">좋아요순</option>
        </select>
      </div>

      <ul className="space-y-4">
        {currentPosts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default PostList;
