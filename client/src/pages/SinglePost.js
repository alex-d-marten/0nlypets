import React from "react";
import { useParams } from "react-router-dom";

//import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
//I hate to say it but I have no idea where the props for this are coming from
const SinglePost = () => {
  const { id: postId } = useParams();
  console.log(postId);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId },
  });

  const post = data?.post || {};
  console.log(data, "lalaalal");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {post.petName}
          </span>
        </p>
        <div className="card-body">
          <p>{post.image} </p>
          <p> {post.caption} </p>
          <p>{post.createdAt}</p>
        </div>

        <div>
          <CommentForm comments={post.comments} />
        </div>

        <div>
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
