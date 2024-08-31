import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import {useQuery} from "@tanstack/react-query"
import { useEffect } from "react";

const Posts = ({ feedType,username,userId }) => {
  
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/allposts";
      case "following":
        return "/api/posts/followingposts";
      case "posts":
        return `/api/posts/user/${username}`;
      case "likes":
        return `/api/posts/likes/${userId}`;
      default:
        return "/api/posts/allposts";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();
  const {data:posts,isError,isLoading,refetch,isRefetching} = useQuery({
    queryKey: ["posts",POST_ENDPOINT],
    queryFn:async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {});
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to get posts");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });
  
  useEffect(() => {
    refetch();
  }, [feedType,username,refetch]);

  return (
    <>
      {isLoading  && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="my-4 text-center">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
