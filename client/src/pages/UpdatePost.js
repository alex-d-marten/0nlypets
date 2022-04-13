import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_POST, REMOVE_POST } from "../utils/mutations";
import { QUERY_POST, QUERY_POSTS, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";

const UpdatePostForm = () => {
  const { id: postId, username: userParam } = useParams();
  console.log(postId, "id");
  // console.log(userParam);
  const [formState, setFormState] = useState({
    petName: "",
    caption: "",
  });
  const [characterCount, setCharacterCount] = useState(0);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });
  console.log(data, "post");

  const post = data?.post || {};

  const [updatePost, { error }] = useMutation(UPDATE_POST, {
    update(cache, { data: { post } }) {
      try {
        console.log("im a console");
        cache.writeQuery({
          query: UPDATE_POST,
          data: { posts: [updatePost, ...data] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [removePost, { error2 }] = useMutation(REMOVE_POST);
  const handleDeletePost = async (postId) => {
    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await removePost({
        variables: { postId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // try {
    await updatePost({
      variables: { ...formState },
    });
    // set location to home on submit
    window.location.href = "/";
    setFormState({
      petName: "",
      caption: "",
    });
    // } catch (err) {
    //   console.error(err);
    // }
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

  return (
    <div>
      <h3>Updtae</h3>

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
            UPDATE
          </button>
          <button
            className="btn btn-primary btn-block py-3"
            onClick={() => handleDeletePost(post._id)}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostForm;
