"use client"
import React, { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post';
import { StoreContext } from '@/app/context';
import { json } from 'stream/consumers';
import Comments from '../Commetns/Comments';
type UserDetails = {
    info: {
        title: string;
        first: string;
        last: string;
    };
    // email: string;
    // picture: {
    //     large: string
    // }
    title: string,
    body: string,
    pic: string,
    id: number,
    userId: number,
    isLike: boolean
};
interface Posts {
    postData: UserDetails[];
};
const PostsContainer = ({ postData }: Posts) => {
    const [showComments, setShowComments] = useState(false)
    const [mouse, setMouse] = useState(0)
    // console.log(postData);
    const { postsData, setPostsData } = useContext(StoreContext)
    // useEffect(() => {
    //     localStorage.getItem("posts") && localStorage.removeItem("posts")
    //     localStorage.setItem("posts", JSON.stringify(postsData))
    // })
    if (typeof window !== "undefined") {
        // localStorage.getItem("posts") && localStorage.removeItem("posts")

        // console.log(data);
        // setPostsData(data)
        // if (localStorage.getItem("posts")) {
        // const data = (localStorage.getItem("posts"))
        // }

    }
    useEffect(() => {
        const isPostAvailable = localStorage.getItem("posts")
        let posts;
        if (isPostAvailable) {
            posts = JSON.parse(isPostAvailable)
        }
        // const hey: UserDetails[] = JSON.parse(isPostAvailable)
        // console.log(hey);
        if (!posts) {
            // console.log('hey')
            localStorage.setItem("posts", JSON.stringify(postData))

            setPostsData(postData)
            // console.log(hey);
        }
        if (posts) {



            setPostsData(posts)
        }
        console.log("hey");
        // postsData[0].pic?setPostsData()
        // if (postsData[0].pic) {
        //     setPostsData(postsData)
        //     console.log("by")
        // }
        // console.log(postsData[0]);
        // if (!postsData[0].pic) {
        //     setPostsData(postData)
        // }
        // console.log(postData);
    }, [])

    // console.log(postsData)
    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            // setMouse(e)
            // console.log(e);

        })
    }, [])
    // { setTimeout(() => setShowComments(true), 2000) }
    // console.log(postsData);
    // console.log(postsData, "hey");
    console.log(showComments);
    return (
        <>
            {/* <div></div> */}
            {/* <Comments isOpen={showComments} onClose={setShowComments}/> */}
            <div className="px-10 grid grid-cols-auto gap-10 relative]">
                {
                    postsData?.map((post) => <Post userId={post.userId} key={post.id} isLike={post.isLike} id={post.id} src={post.pic} title={post?.title} body={post.body} fullName={post?.info?.first + " " + post?.info?.last} userName={post?.info?.first} />
                    )
                }
            </div>
        </>
    );
};

export default PostsContainer;