import { ReactNode, useState } from 'react';
import { StoreContext } from '../context';

interface ContextProps {
  children: ReactNode;
}

type User = {
  info: {
    title: string,
    first: string,
    last: string,
  },
  title: string,
  body: string,
  pic: string,
  id: number,
  userId: number,
  isLike: boolean
};
// interface PostsType {
//   postData: User[];
// };

export default function StoreProvider({ children }: ContextProps) {
  const [postsData, setPostsData] = useState<User[]>([{
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
  }]);

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
