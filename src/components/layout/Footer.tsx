import React from "react";
import Link from "next/link";
import Image from "next/image";
import facebook from "../../../public/ic_facebook.png";
import twitter from "../../../public/ic_twitter.png";
import youtube from "../../../public/Group.png";
import instagram from "../../../public/Vector.png";

function Footer() {
  return (
    <footer className="h-[160px] bg-gray-900 px-[px] ">
      <div
        className="w-full max-w-[1920px] mx-auto
      grid grid-cols-2 grid-rows-2 gap-4
      md:flex md:justify-between md:items-center">
        
        <p className="text-gray-400 md:col-span-1 md:order-none order-3">@codeit - 2024</p>

        <div className="flex justify-between w-[159px] md:order-none order-1">
          <Link className="text-gray-200" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-gray-200" href="/faq">
            FAQ
          </Link>
        </div>

        <div className="flex gap-2 items-center md:order-none order-2">
          <Link
            href="https://www.facebook.com/?locale=ko_KR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={facebook} alt="Facebook" width={24} height={24} />
          </Link>
          <Link
            href="https://x.com/?lang=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={twitter} alt="Twitter" width={24} height={24} />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={youtube} alt="YouTube" width={24} height={24} />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={instagram} alt="Instagram" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
