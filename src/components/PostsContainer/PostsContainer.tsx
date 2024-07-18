"use client"
import React, { useContext, useEffect } from 'react';
import Post from '../Post/Post';
import { StoreContext } from '@/app/context';
type UserDetails = {
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
interface Posts {
    postData: UserDetails[];
};
const PostsContainer = ({ postData }: Posts) => {
    const { postsData, setPostsData } = useContext(StoreContext)
    useEffect(() => {
        const isPostAvailable = localStorage.getItem("posts")
        let posts;
        if (isPostAvailable) {
            posts = JSON.parse(isPostAvailable)
        }
        if (!posts) {
            localStorage.setItem("posts", JSON.stringify(postData))

            setPostsData(postData)
        }
        if (posts) {
            setPostsData(posts)
        }
    }, [])


    return (<div className="grid-cols-sm-auto px-5 grid sm:grid-cols-auto sm:px-10 gap-5  sm:gap-10 relative">
        {
            postsData?.map((post) => <Post userId={post.userId} key={post.id} isLike={post.isLike} id={post.id} src={post.pic} title={post?.title} body={post.body} fullName={post?.info?.first + " " + post?.info?.last} userName={post?.info?.first} />
            )
        }
    </div>

    );
};

export default PostsContainer;