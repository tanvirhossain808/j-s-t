import { ReactNode, useState } from 'react';
import { StoreContext } from '../context';

interface ContextProps {
  children: ReactNode;
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

export default function StoreProvider({ children }: ContextProps) {
  const [postsData, setPostsData] = useState<PostsType[]>([]);

  const contextValue = {
    postsData,
    setPostsData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}
