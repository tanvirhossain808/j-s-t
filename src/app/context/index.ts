import { createContext } from 'react';


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
// interface PostsType {
//     postData: User[];
// };
interface StoreContextValue {
    postsData: User[];
    setPostsData: React.Dispatch<React.SetStateAction<User[]>>;
}
// Provide a default value for the context
const defaultContextValue: StoreContextValue = {
    postsData: [{
        info: {
            title: "",
            first: "",
            last: ""
        },
        title: "",
        body: "",
        pic: "",
        id: 0,
        userId: 0,
        isLike: false
    }],
    setPostsData: () => { }, // Provide a no-op default function
};

export const StoreContext = createContext<StoreContextValue>(defaultContextValue);