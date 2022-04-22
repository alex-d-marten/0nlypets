import React from "react";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { Link } from "react-router-dom";
import { REMOVE_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
//I hate to say it but I have no idea where the props for this are coming from
const SinglePost = () => {
  const { id: postId, username: userParam } = useParams();

  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });

  const post = data?.post || {};
  const [removePost, { error }] = useMutation(REMOVE_POST);

  const handleRemovePost = async (event) => {
    try {
      removePost({
        variables: { postId: postId },
      });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <h2 className="card-header single-header">
          <span style={{ fontWeight: 700 }} className="text-dark">
            {post.petName}
          </span>
        </h2>
        <div className="card-body">

          <div className="w-100 d-flex justify-content-center">
            <img src={`${post.image}`} className="w-50 single-img" alt="cute pic here" />
          </div>
      
          <p className="larger-font">{post.caption}</p>
          <p>{post.createdAt}</p>
          {Auth.getProfile().data.username === userParam ? (
            <>
              <Link to={`/post/${post.username}/${post._id}/editmode/`}>
                <button className="btn btn-color mx-1">Edit Post</button>
              </Link>

              <button
                className="btn btn-color mx-1 btn-delete"
                onClick={handleRemovePost}
              >
                Delete Post
              </button>
            </>
          ) : (
            <Link to={`/`}>Home</Link>
          )}
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
