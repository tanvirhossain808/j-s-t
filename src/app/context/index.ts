import { createContext } from 'react';
import { PostData } from '../provider/ContextProvider';

interface StoreContextValue {
    postsData: PostData[];
    setPostsData: React.Dispatch<React.SetStateAction<PostData[]>>;
}
type User = {
    info: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string
    }
    title: string,
    body: string,
    pic: string,
    id: number
};
interface PostsType {
    postData: User[];
};

// Provide a default value for the context
const defaultContextValue: StoreContextValue = {
    postsData: [],
    setPostsData: () => { }, // Provide a no-op default function
};

export const StoreContext = createContext<StoreContextValue>(defaultContextValue);