"use client";

import { StoreContext } from '@/app/context';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    userId?: number;
    id: number;
}
interface CommentType {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

const Comments: React.FC<ModalProps> = ({ isOpen, onClose, children, userId, id }) => {
    // const {}=useContext(StoreContext)
    const [commentsList, setCommentsList] = useState<CommentType[]>([
        {
            postId: 0,
            id: 0,
            name: "",
            email: '',
            body: ""
        }
    ]);
    const { comments: commentsContainer, setComments } = useContext(StoreContext);
    // console.log(comments);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const showCommentList = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            const comments = await res.json();
            const k = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((res) => res.json()).then(data => data);
            // console.log(k, "k");
            console.log(comments, "k");
            // console.log(comments);
            // if (!commentsContainer[0][0].id) {
            //     const isExitCommentsList = commentsContainer.map((data) => data.find((comment) => {
            //         if (comment.id === comments.postId) {
            //             return {
            //                 ...comment,
            //                 ...comments
            //             }
            //         }
            //     }))
            // }
            let newComments = [...commentsContainer]
            // console.log(Comments);
            // console.log(commentsContainer[0]);
            if (commentsContainer.length >= 1 && commentsContainer[0][0]?.id) {
                let isAlreadyExits = false
                newComments = commentsContainer.map((commentArray, index) => {
                    if (commentArray.some((comment) => comment.postId === comments[0].postId)) {
                        console.log("hey");
                        // console.log(comment)
                        isAlreadyExits = true
                        // newComments[index].push(...comments)
                        return [
                            ...commentArray,
                            ...comments
                        ];
                    } else {
                        return commentArray
                    }
                });
                if (!isAlreadyExits) {
                    newComments.push(comments)
                }

                // setComments(newComments);
                // newComments = []
            }
            else {
                newComments = [...commentsContainer, comments]
            }

            console.log(comments, "comments");
            // setCommentsList(comments);
            setComments(newComments)
        };
        isOpen && showCommentList();


        console.log(commentsContainer, "gk");
        return () => {
            // showCommentList()
            document.body.style.overflow = 'auto';
            setCommentsList([
                {
                    postId: 0,
                    id: 0,
                    name: "",
                    email: '',
                    body: ""
                }
            ]);
        };
    }, []);
    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'auto';
    //     }

    //     const showCommentList = async () => {
    //         try {
    //             const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    //             const comments = await res.json();

    //             let newCommentsContainer = [...commentsContainer];
    //             let postExists = false;

    //             if (newCommentsContainer.length >= 1 && newCommentsContainer[0][0]?.id) {
    //                 newCommentsContainer = newCommentsContainer.map((commentArray) => {
    //                     if (commentArray.some((comment) => comment.postId === id)) {
    //                         postExists = true;
    //                         return [
    //                             ...commentArray,
    //                             ...comments
    //                         ];
    //                     } else {
    //                         return commentArray;
    //                     }
    //                 });

    //                 if (!postExists) {
    //                     newCommentsContainer.push(comments);
    //                 }
    //             } else {
    //                 newCommentsContainer = [...commentsContainer, comments];
    //             }

    //             setComments(newCommentsContainer);
    //         } catch (error) {
    //             console.error('Error fetching comments:', error);
    //         }
    //     };

    //     if (isOpen) {
    //         showCommentList();
    //     }

    //     return () => {
    //         document.body.style.overflow = 'auto';
    //         setCommentsList([]);
    //     };
    // }, [isOpen, id]);
    console.log(commentsContainer, "commentContainer");

    if (commentsContainer.length >= 1) return <div
        className={`fixed inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${isOpen ? 'fade-in' : 'opacity-0 invisible'
            }`}
    >
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'fade-in' : 'opacity-0'
                }`}
            onClick={() => onClose(false)}
        ></div>
        <div
            className={`bg-white max-h-[80vh] w-[50%] overflow-y-auto p-4 rounded shadow-lg z-20 transform transition-transform duration-300 ${isOpen ? 'scale-up' : 'scale-95 translate-y-4'
                }`}
        >
            <>

                {/* {[...Array(20)].map((_, i) => (
                        <p key={i} className="mt-2 text-red-400">
                            This is line {i + 1} of the modal content.
                        </p>
                    ))} */}

                <div>
                    {
                        commentsContainer.length >= 1 && commentsContainer.map((comments) => comments.map((comment) => {
                            // const user = async () => {
                            //     const res = await fetch("https://randomuser.me/")
                            //     const data = await res.json()
                            //     return user

                            // }
                            // const data = user()
                            return <>
                                <div className='text-red-600 flex w-full gap-5 items-center mt-4 bg-gray-600 p-5 rounded-lg'>
                                    <Image className='w-20 h-20 rounded-full inline-block' src={"https://randomuser.me/api/portraits/men/81.jpg"} alt="comment user name" width={100} height={100} />
                                    <div className=' text-white text-base'>
                                        <h2 className='text-black text-xl'>{"Jack"}</h2>
                                        <p>
                                            {comment.body}
                                        </p>
                                    </div>

                                </div>
                            </>
                        }
                        ))
                    }
                </div>

            </>

            {/* // {children} */}
            <button onClick={() => onClose(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Close
            </button>
        </div>
    </div >
        ;
};

export default Comments;
