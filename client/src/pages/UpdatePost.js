import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../utils/mutations";
import { QUERY_POST, QUERY_POSTS, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
const UpdatePostForm = () => {
  const { id: postId, username: userParam } = useParams();
  console.log(postId, "id")
  console.log(userParam)
  const [formState, setFormState] = useState({
    petName: "",

    caption: "",
  });
  const [characterCount, setCharacterCount] = useState(0);
  const { loading, data } = useQuery(postId ? QUERY_POST : "", {
    variables: { _id: postId, username: userParam },
  });
  console.log(data, "post");
  const [updatePost, { error }] = useMutation(UPDATE_POST, {
    update(cache, { data: { updatePost } }) {
      try {
        cache.writeQuery({
          query: QUERY_POST,
          data: { posts: [updatePost, ...data] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

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
      image: "",
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
            placeholder="What are the names of the pet pictured in the photo?"
            value={formState.petName}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea
            name="caption"
            placeholder="Caption this photo..."
            value={formState.caption}
            className="form-input w-100"
            style={{ lineHeight: "1.5" }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Post Pic
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostForm;
