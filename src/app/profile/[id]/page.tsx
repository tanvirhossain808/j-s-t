"use client"
import { StoreContext } from "@/app/context";
import Image from "next/image";
import { useContext } from "react";
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
    userId: number,
    isLike: boolean
};

const UserProfile = ({ params }: { params: { id: string } }) => {
    const { postsData } = useContext(StoreContext)
    // console.log(typeof params.id);
    let userDetails = postsData.find((user) => parseInt(params.id) === user.id)
    if (typeof window !== "undefined") {
        if (!userDetails) {
            const storedPostsData = localStorage.getItem("posts");
            if (storedPostsData) {
                const parsedPostsData: User[] = JSON.parse(storedPostsData);
                userDetails = parsedPostsData.find((user) => parseInt(params.id) === user.id);
            }
        }
    }
    console.log(userDetails, "hey");

    if (!userDetails) return <div>User not found</div>
    const { pic, info } = userDetails

    // console.log(params.info);
    const { first, last } = info
    return (
        <div>
            <Image src={pic} width={300} height={300} alt="random user profile picture" />
            <h2>{first + " " + last}</h2>
            <h4>{first}</h4>
        </div>
    );
};

export default UserProfile;