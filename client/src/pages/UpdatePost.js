import React from "react";
import { useParams } from "react-router-dom";


import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import { REMOVE_POST } from '../utils/mutations';
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";


//I hate to say it but I have no idea where the props for this are coming from
const UpdatePost = (props) => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};


  const [removePost, { error }] = useMutation(REMOVE_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(postId)
    await removePost({
      variables: { postId },
    });
    window.location.href = '/profile'
  };



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
          <button className="btn btn-color" ontype="submit" onSubmit={handleFormSubmit}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

        <div><CommentForm comments={post.comments} /></div>

        <div><CommentList postId={post._id} /></div>

      </div>
    </div>
  );
};

export default UpdatePost;
