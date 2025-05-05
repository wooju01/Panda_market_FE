"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Top Section */}
      <section className="w-full bg-[#CFE5FF] py-12 flex justify-center">
        <div className="flex  md:flex-row items-center max-w-6xl gap-10">
          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-semibold leading-relaxed">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </p>
            <Link href="/item">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                구경하러 가기
              </button>
            </Link>
          </div>
          <Image src="/home_top.png" alt="home top" width={400} height={300} />
        </div>
      </section>

      {/* Hot Item Section */}
      <section className="w-full py-12 bg-white flex justify-center">
        <div className="flex flex-col md:flex-row items-center max-w-6xl gap-10">
          <Image src="/home_01.png" alt="hot item" width={300} height={200} />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-blue-500 font-medium">Hot item</p>
            <p className="text-xl font-bold leading-relaxed">
              인기 상품을
              <br />
              확인해 보세요
            </p>
            <p className="text-gray-600">
              가장 HOT한 중고거래 물품을 <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 bg-gray-50 flex justify-center">
        <div className="flex flex-col md:flex-row items-center max-w-6xl gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-blue-500 font-medium">Search</p>
            <p className="text-xl font-bold leading-relaxed">
              구매를 원하는
              <br />
              상품을 검색하세요
            </p>
            <p className="text-gray-600">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <Image
            src="/home_02.png"
            alt="search item"
            width={300}
            height={200}
          />
        </div>
      </section>

      {/* Register Section */}
      <section className="w-full py-12 bg-white flex justify-center">
        <div className="flex flex-col md:flex-row items-center max-w-6xl gap-10">
          <Image
            src="/home_03.png"
            alt="register item"
            width={300}
            height={200}
          />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-blue-500 font-medium">Register</p>
            <p className="text-xl font-bold leading-relaxed">
              판매를 원하는
              <br />
              상품을 등록하세요
            </p>
            <p className="text-gray-600">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-[#CFE5FF] flex justify-center">
        <div className="flex flex-col md:flex-row items-center max-w-6xl gap-10">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <p className="text-xl font-bold leading-relaxed">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>
          </div>
          <Image
            src="/home_bottom.png"
            alt="footer panda image"
            width={300}
            height={200}
          />
        </div>
      </section>
    </main>
  );
}
