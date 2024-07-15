"use client"
import React, { useContext } from 'react';
import Post from '../Post/Post';
import { StoreContext } from '@/app/context';
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
};
interface Posts {
    postData: UserDetails[];
};
const PostsContainer = ({ postData }: Posts) => {
    console.log(postData);
    const { postsData, setPostsData } = useContext(StoreContext)
    setPostsData(postData)
    console.log(postsData, "hey");
    return (
        <div className="px-10 grid grid-cols-auto gap-10 ">
            {
                postsData?.map((post) => <Post key={post.id} id={post.id} src={post.pic} title={post?.title} body={post.body} fullName={post?.info?.first + " " + post?.info?.last} userName={post?.info?.first} />
                )
            }
        </div>
    );
};

export default PostsContainer;