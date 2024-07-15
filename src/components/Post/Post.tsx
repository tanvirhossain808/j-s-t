"use client"
import { StoreContext } from "@/app/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { TfiComments } from "react-icons/tfi";

type LayoutProps = {
    src: string,
    title: string,
    fullName: string,
    userName: string,
    body: string,
    id: number
}


const Post = ({ src, title, fullName, userName, body, id }: LayoutProps) => {
    const { setPostsData, postsData } = useContext(StoreContext)
    useEffect(() => {
        // setPostsData([...postsData,{}])
    }, [postsData])
    return (
        <div className="mt-4 pl-2 pr-4 pb-10 bg-gray-500 py-4 rounded-lg hover:bg-gray-600 transition-colors relative duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-4">
                <Link href={`/profile/${id}`} className="cursor-default">
                    <div className="relative group">
                        <Image
                            className="rounded-full w-14 h-auto md:w-24 hover:brightness-50 cursor-pointer"
                            src={src}
                            alt="profile picture"
                            height={100}
                            width={100}
                            onClick={() => console.log("click")}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center z-10 cursor-pointer">
                            <p className="text-white">{userName}</p>
                        </div>
                    </div>
                </Link>
                <div className="flex flex-col gap-y-1 mt-2">
                    <p className="uppercase">Name:{fullName}</p>
                    <p>{userName}</p>
                </div>
            </div>
            <h2 className="mt-4 text-2xl">{title}</h2>
            <p className="mt-3 text-justify text-base">{body}</p>
            <div className=" absolute top-full -translate-y-full mb-2 flex items-center justify-between w-[90%]">
                <TfiComments className="w-7 h-7 mb-[5px]" />
                <FcLikePlaceholder className="w-7 h-7 mb-[5px]" style={{ fill: "red" }} />
            </div>
        </div >
    );
};

export default Post;