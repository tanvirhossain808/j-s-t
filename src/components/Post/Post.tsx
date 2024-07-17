"use client"
import { StoreContext } from "@/app/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { TfiComments } from "react-icons/tfi";
import Comments from "../Commetns/Comments";

type LayoutProps = {
    src: string,
    title: string,
    fullName: string,
    userName: string,
    body: string,
    id: number,
    isLike?: boolean,
    userId: number,
    // showComments: React.Dispatch<React.SetStateAction<boolean>>;
    // showCommentsBox: boolean

}
type User = {
    info: {
        title: string;
        first: string;
        last: string;
    };
    title: string,
    body: string,
    pic: string,
    id: number,
    userId?: number,
    isLike: boolean,
};

const Post = ({ src, title, fullName, userName, body, id, isLike = false, userId }: LayoutProps) => {
    const [showComments, setShowComments] = useState(false)

    const [showLike, setShowLike] = useState(false || isLike)
    // const [showCommentsBox, setShowCommentsBox] = useState(false)
    const { setPostsData, postsData } = useContext(StoreContext)
    useEffect(() => {
        // setPostsData([...postsData,{}])
    }, [postsData])
    const handleShowLike = () => {
        // Toggle the showLike state
        setShowLike(!showLike);

        if (!postsData || !Array.isArray(postsData)) {
            console.error('postsData is not defined or not an array');
            return;
        }

        // Use the previous state of showLike to determine the new value
        // let updatedPost
        // if (postsData) updatedPost = postsData.reduce((pre, currentPost) => {
        //     if (currentPost.id === id) {
        //         // if (currentPost.info) {
        //         console.log(currentPost.info);
        //         // }
        //         currentPost.isLike = !showLike
        //         const b: User[] = [...pre, currentPost]
        //         return b

        //         // Update the isLike property for the matching post
        //         // accumulator.push({
        //         //     ...currentPost,
        //         //     // isLike: !showLike,
        //         // });
        //     } else {
        //         // return [...pre, currentPost]
        //     }
        //     return pre;
        // }, []);
        const updatedPost = postsData.map((post) => {
            if (post.id === id) {
                return {
                    ...post, isLike: !showLike
                }
            }
            return post
        })
        // console.log(Array.isArray(updatedPost));
        // console.log(updatedPost.length);

        // Update the postsData state and localStorage
        if (updatedPost.length) setPostsData(updatedPost);

        localStorage.setItem('posts', JSON.stringify(updatedPost));
        console.log(updatedPost);
    };

    return (
        <>
            {showComments && <Comments isOpen={showComments} onClose={setShowComments} userId={userId} id={id} />
            }
            {/* {showCommentsBox && <Comments setShowCommentsBox={setShowCommentsBox} />} */}
            <div className={`mt-4 pl-2 pr-4 pb-10 bg-gray-500 py-4 rounded-lg hover:bg-gray-600 transition-colors relative duration-300 shadow-md hover:shadow-lg`}>
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
                    <TfiComments className="w-7 h-7 mb-[5px] cursor-pointer" onClick={() => setShowComments(true)} />
                    <FcLikePlaceholder className={`w-7 h-7 mb-[5px] cursor-pointer ${showLike || isLike ? "like" : "unlike"}`} style={{ fill: "red" }} onClick={handleShowLike} />
                </div>
            </div >
        </>
    );
};

export default Post;