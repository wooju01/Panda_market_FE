import Image from "next/image";
import Link from "next/link";
import noImg from "../../../public/default.png";
import profileImg from "../../../public/profile.png";
import { CiHeart } from "react-icons/ci";

interface PostItemProps {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  likes: number;
  image?: string;
}

function PostItem({ id, title, writer, createdAt, likes, image }: PostItemProps) {
  return (
    <li className="flex justify-between items-center py-4 border-b shadow-sm border-gray-100 bg-gray-50 ">
      <div className="flex flex-col justify-between h-[80px]">
        <Link href={`/community/${id}`}>
          <p className="font-semibold text-gray-800 hover:underline">{title}</p>
        </Link>
        <div className="flex gap-2">
          <Image
            src={profileImg}
            alt="Best"
            width={16}
            height={16}
            className="object-cover rounded"
          />

          <p className="text-sm text-secondary-600">{writer}</p>
          <p className="text-sm text-gray-400">
            {new Date(createdAt).toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 min-w-[120px]">
        <div className="flex items-center justify-center w-18 h-18 bg-white rounded-[6px] border border-gray-200">
          <div className="relative w-12 h-12 ">
            <Image
              src={image || noImg}
              alt="썸네일"
              className="rounded object-cover0 "
            />
          </div>
        </div>
        <span className="flex items-center text-sm text-gray-500">
          <CiHeart /> {likes}
        </span>
      </div>
    </li>
  );
}
export default PostItem;
