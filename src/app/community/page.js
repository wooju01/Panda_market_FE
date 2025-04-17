"use client";

import PostList from "@/components/post/PostList";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import bestImg from "../../../public/best.png";
import { CiHeart } from "react-icons/ci";

function page() {
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const response = await fetch("http://localhost:5050/articles?limit=3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBestPosts(
          data.map((post) => ({
            ...post,
            writer: `판다${Math.floor(Math.random() * 100)}`,
            likes: Math.floor(Math.random() * 100),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch best posts:", error);
      }
    };

    fetchBestPosts();
  }, []);

  return (
    <main>
      <section className="px-4 md:px-[200px] py-8">
        <h2 className="font-bold mb-4 text-xl">베스트 게시글</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bestPosts.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`}>
              <div
                key={post.id}
                className="border rounded-lg px-4 shadow-sm flex flex-col gap-2 bg-[#F9FAFB] border-0 "
              >
                <span className=" flex justify-center items-center px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-bl-2xl rounded-br-[16px] w-[102px]">
                  <div className="relative w-4 h-4">
                    <Image
                      src={bestImg}
                      alt="Best"
                      fill
                      className="object-cover"
                    />
                  </div>
                  Best
                </span>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug flex-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-center w-18 h-18 bg-white rounded-[6px] border border-gray-200 ">
                    <div className="relative w-12 h-12 ">
                      <Image
                        src={logo}
                        alt="썸네일"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-secondary-500">
                  <div className="flex items-center gap-1">
                    {post.writer || "작성자 없음"}
                    <div className="flex items-center">
                      <CiHeart /> {post.likes ?? 0}
                    </div>
                  </div>
                  <span className=" text-secondary-400">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <PostList />
    </main>
  );
}
export default page;
