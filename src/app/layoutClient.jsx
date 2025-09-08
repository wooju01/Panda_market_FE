"use client";

import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function layoutClient({ children }) {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/signup"];
  const isHidden = hiddenPaths.some(path => pathname.startsWith(path));

  return (
    <>
      {!isHidden && <Header />}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-[70px]">{children}</main>
        {!isHidden && <Footer />}
      </div>
    </>
  );
}
