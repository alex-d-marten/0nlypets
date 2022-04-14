import React from "react";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { Link } from "react-router-dom";
//I hate to say it but I have no idea where the props for this are coming from
const SinglePost = () => {
  const { id: postId, username: userParam } = useParams();

  console.log(postId);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });
  console.log(data);

  const post = data?.post || {};
  console.log(post);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(Auth.getProfile().data);

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-dark">
            {post.petName}
          </span>
        </p>
        <div className="card-body">
          <p>{post.image} </p>
          <p> {post.caption} </p>
          <p>{post.createdAt}</p>
          <div>
            <CommentForm comments={post.comments} />
          </div>

          <div>
            <CommentList comments={post.comments} />
          </div>
          {Auth.getProfile().data.username === userParam ? (
            <Link to={`/post/${post.username}/${post._id}/editmode/`}>
              EDIT IT!!
            </Link>
          ) : (
            <Link to={`/post/${post._id}/`}>View</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
