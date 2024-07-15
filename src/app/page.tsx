/* eslint-disable @next/next/no-async-client-component */
import PostsContainer from "@/components/PostsContainer/PostsContainer";
import axios from "axios";
export default async function Home() {
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
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  type User = {
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string
    }
    // Add other fields as needed
  };
  interface RandomUserApiResponse {
    results: User[];
    info: {
      seed: string;
      results: number;
      page: number;
    };
  };
  const getPosts = async () => {

    try {
      const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const dynamicAvatar = async () => {
    try {
      const res = await axios.get<RandomUserApiResponse>('https://randomuser.me/api?results=100')
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const [postRes, avatarRes] = await Promise.allSettled([getPosts(), dynamicAvatar()])
  let postData;
  let avatarData;
  if (postRes.status === "fulfilled") {
    postData = postRes.value
  }
  if (avatarRes.status === "fulfilled") {
    avatarData = avatarRes?.value?.results.map((result) => {
      return {
        info: result.name,
        pic: result.picture.large
      }
    })
  }
  if (avatarData?.[0].info) {
    postData = postData?.map((data, index) => {
      return {
        ...data,
        ...avatarData[index]
      }
    })
  }
  // console.log(postData);

  return (
    <>
      <PostsContainer postData={[...(postData || [])]} />
      {/* <div className="px-10 grid grid-cols-auto gap-10 ">
        {
          postData?.map((post) => <Post key={post.id} src={post.pic} title={post?.title} body={post.body} fullName={post?.info?.first + " " + post?.info?.last} userName={post?.info?.first} />
          )
        }
      </div> */}
    </>
  );
}
