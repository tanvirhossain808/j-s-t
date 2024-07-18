"use client"
import { StoreContext } from "@/app/context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
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
    const [userDetails, setUserDetails] = useState<User | null>(null)
    console.log(params.id);
    const { postsData } = useContext(StoreContext)

    console.log(userDetails, "hey");
    useEffect(() => {
        let userDetails = postsData.find((user) => parseInt(params.id) === user.id)
        if (!userDetails) {
            const storedPostsData = localStorage.getItem("posts");
            if (storedPostsData) {
                const parsedPostsData: User[] = JSON.parse(storedPostsData);
                userDetails = parsedPostsData.find((user) => parseInt(params.id) === user.id);
                // if (userDetails) setUserDetails(userDetails)
            }
        }
        if (userDetails) setUserDetails(userDetails)
    }, [params.id, postsData])

    if (!userDetails) return <div>User not found</div>
    const { pic, info } = userDetails
    const { first, last } = info
    return <div className="h-screen">
        <div className="flex flex-col items-center w-full h-full justify-center">
            <Image className="rounded-full" src={pic} width={300} height={300} alt="random user profile picture" />
            <h2>{first + " " + last}</h2>
            <h4>{first}</h4>
        </div>
    </div>
        ;
};

export default UserProfile;