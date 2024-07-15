"use client"
import { StoreContext } from "@/app/context";
import Image from "next/image";
import { useContext } from "react";

const UserProfile = ({ params }: { params: { id: string } }) => {
    const { postsData } = useContext(StoreContext)
    // console.log(typeof params.id);
    const userDetails = postsData.find((user) => parseInt(params.id) === user.id)
    const { pic, info } = postsData.find((user) => parseInt(params.id) === user.id)
    const { first, last } = info
    console.log(userDetails, "hey");
    return (
        <div>
            <Image src={pic} width={300} height={300} alt="random user profile picture" />
            <h2>{first + " " + last}</h2>
            <h4>{first}</h4>
        </div>
    );
};

export default UserProfile;