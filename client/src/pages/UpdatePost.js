import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_POST, REMOVE_POST } from "../utils/mutations";
import { QUERY_POST, QUERY_POSTS, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";

const UpdatePostForm = () => {
  const { id: postId, username: userParam } = useParams();
  const [formState, setFormState] = useState({
    petName: "",
    caption: "",
  });

  const [characterCount, setCharacterCount] = useState(0);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });

  const post = data?.post || {};
  const petName = post.petname;
  const caption = post.petname;
  const [updatePost, { error }] = useMutation(
    UPDATE_POST,
    {
      variables: {
        postId: postId,
        petName: petName,
        caption: caption,
      },
    },
    {
      update(cache, { data: { updatePost } }) {
        try {
          const { posts } = cache.readQuery({
            query: QUERY_POSTS,
            variables: { username: userParam },
          });

          cache.writeQuery({
            query: QUERY_POSTS,
            variables: { username: userParam },
            data: { posts: [updatePost, ...posts] },
          });
        } catch (e) {
          console.error(e);
        }
        const { user } = cache.readQuery({
          query: QUERY_USER,
          variables: { username: userParam },
        });

        cache.writeQuery({
          query: QUERY_USER,
          data: { user: { ...user, posts: [...user.posts, updatePost] } },
        });
      },
    }
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await updatePost({
      variables: { ...formState },
    });
    window.location.href = "/";
    setFormState({
      petName: "",
      caption: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "caption" && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== "caption") {
      setFormState({ ...formState, [name]: value });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Update</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? "text-danger" : ""
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <input
            name="petName"
            placeholder={post.petName}
            value={formState.petName}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea
            name="caption"
            placeholder={post.caption}
            value={formState.caption}
            className="form-input w-100"
            style={{ lineHeight: "1.5" }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostForm;
