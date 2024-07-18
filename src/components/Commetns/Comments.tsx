"use client";

import { StoreContext } from '@/app/context';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    userId?: number;
    id: number;
    name: string
}
interface CommentType {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;

}

const Comments: React.FC<ModalProps> = ({ isOpen, onClose, children, userId, id, name }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [commentsList, setCommentsList] = useState<CommentType>(
        {
            postId: 0,
            id: 0,
            name: "",
            email: '',
            body: ""
        }
    );
    const { comments: commentsContainer, setComments } = useContext(StoreContext);
    const handleSubmitComment = async () => {
        await setIsLoading(true);
        try {
            let updatedComments = [...commentsContainer];
            updatedComments.find((comments, i) => {
                return comments.find(async (comment, j) => {
                    if (comment.postId === id) {
                        if (Array.isArray(updatedComments[i])) {
                            await updatedComments[i].push(commentsList);
                            return true;
                        }
                    }
                });
            });

            await setComments(updatedComments)
            await setIsLoading(false)
            toast("Comment posted successfully!"
                , {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });


        } catch (error) {
            // console.error("Error submitting comment:", error);
            toast("Unable to submit the comment!"
                , {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
        } finally {
            await setTimeout(() => setIsLoading(false), 3000)
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const showCommentList = async () => {
            try {
                const { data: comments } = await axios.post("api/postComments", { id })
                let newComments = [...commentsContainer]
                /* 
                start todo-:need to more higher work 
                */
                if (commentsContainer.length >= 1 && commentsContainer[0][0]?.id) {
                    let isAlreadyExits = false
                    newComments = commentsContainer.map((commentArray, index) => {
                        if (commentArray.some((comment) => comment.postId === comments[0].postId) && !isAlreadyExits) {
                            isAlreadyExits = true
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
                }
                else {
                    newComments = [...commentsContainer, comments]
                }
                /* 
                end:todo need to more higher work end
                */
                setComments([comments])
            }
            catch (error) {
                console.log(error)
            }
        };
        isOpen && showCommentList();


        // console.log(commentsContainer, "gk");
        return () => {
            // showCommentList()
            document.body.style.overflow = 'auto';
            setCommentsList(
                {
                    postId: 0,
                    id: 0,
                    name: "",
                    email: '',
                    body: ""
                }
            );
        };
    }, []);

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
            className={` bg-gray-400 w-[50%] rounded relative shadow-lg z-20 transform transition-transform duration-300 ${isOpen ? 'scale-up' : 'scale-95 translate-y-4'
                }`}
        >
            <div className='bg-gray-900 fixed py-8 top-0 right-0 h-10 w-full flex items-center justify-center'>
                <p className='text-white flex-1 text-xl text-center'>{`${name}'s post`}</p>
                <div className='flex-1 pr-4'>
                    <button onClick={() => onClose(false)} className="block px-4 py-2 bg-red-500 duration-500 hover:bg-red-400 ml-auto text-white rounded">
                        Close
                    </button>
                </div>
            </div>
            <div className={`max-h-[80vh] w-full overflow-y-auto`} >
                <>
                    <div className='px-10 mt-20'>
                        {
                            commentsContainer.length >= 1 && commentsContainer.map((comments) => comments.map((comment, index) => {
                                return (<div key={index} className='text-red-600 flex w-full gap-5 items-center mt-4 bg-gray-600 p-5 rounded-lg'>
                                    <Image className='w-20 h-20 rounded-full inline-block' src={"https://randomuser.me/api/portraits/men/81.jpg"} alt="comment user name" width={100} height={100} />
                                    <div className=' text-white text-base'>
                                        <h2 className='text-black text-xl'>{"Jack"}</h2>
                                        <p>
                                            {comment.body}
                                        </p>
                                    </div>
                                </div>)
                            }
                            ))
                        }
                    </div>
                </>
            </div>
            <div className='bg-gray-800 h-12 flex items-center relative'>
                <input type="text" className='placeholder-white text-inherit w-full outline-none px-10 text-white bg-gray-400 h-full rounded-2xl' placeholder='Type your your comment' value={commentsList.body} onChange={(e) => setCommentsList({ ...commentsList, body: e.target.value, id: Date.now() })} />
                {
                    isLoading ? <button type="button" className="relative bg-black text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className={`overflow-hidden animate-spin h-5 w-5 ${"disabled" ? 'text-white' : 'text-gray-500'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle className="opacity-100 stroke-current" cx="12" cy="12" r="10" strokeWidth="4" fill="none" strokeLinecap="round" stroke="red" />
                            <line x1="12" y1="2" x2="2" y2="6" stroke="red" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        Comment...
                    </button> : <button className='block bg-black hover:bg-slate-700 duration-100 text-white absolute right-0 top-0 h-full rounded-xl px-4 -translate-x-2' onClick={handleSubmitComment}>
                        Comment
                    </button>
                }
            </div>
        </div>
    </div >
        ;
};

export default Comments;
