import React from "react";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { Link } from "react-router-dom";
import { REMOVE_POST } from "../utils/mutations";
import { useMutation } from '@apollo/client';
//I hate to say it but I have no idea where the props for this are coming from
const SinglePost = () => {
  const { id: postId, username: userParam } = useParams();

  console.log(postId);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });
  console.log(data);

  const post = data?.post || {};

  const [removePost, { error }] = useMutation(REMOVE_POST);

  const handleRemovePost = async (event) => {
    event.preventDefault();
    try {
      removePost({
        variables: { postId },
      });

    } catch (err) {
      console.error(err);
    }
  };


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
          <p>Owned by {post.username}</p>
          <p>{post.image} </p>
          <p> {post.caption} </p>
          <p>{post.createdAt}</p>
          {Auth.getProfile().data.username === userParam ? (
            <>
              <Link to={`/post/${post.username}/${post._id}/editmode/`}>
                <button className='btn btn-color'>Edit Post</button>
              </Link>

              <button className="btn btn-delete"
                onSubmit={handleRemovePost}
              >
                Delete Post
              </button>
            </>
          ) : (
            <Link to={`/`}>
              <button className='btn btn-color'>Home</button>
            </Link>
          )}
        </div>

        {/* <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-delete"
                onSubmit={handleRemovePost}
              >
                Delete Post
              </button>
            </>
          ) : (
            <>
            <Link to={`/post${post.username}/${post._id}`}>
              <button className='btn btn-color'>Back</button>
            </Link>
            </>
          )}

        </div> */}

        <div>
          <CommentForm comments={post.comments} />
        </div>
        {/* add delete icon next to each comment */}
        <div>
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );

}

export default SinglePost;
