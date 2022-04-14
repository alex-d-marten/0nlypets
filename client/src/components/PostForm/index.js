import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
//import { REMOVE_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";
import UploadImage from "../UploadImage";


const PostForm = () => {
  const [formState, setFormState] = useState({
    petName: "",
    image: "",
    caption: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    // update(cache, { data: { addPost } }) {
    //   try {
    //     const { posts } = cache.readQuery({ query: QUERY_POSTS });
    //     console.log(posts)

    //     cache.writeQuery({
    //       query: QUERY_POSTS,
    //       data: { posts: [addPost, ...posts] },
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   console.log(me)
    //   cache.writeQuery({
    //       query: QUERY_ME,
    //       data: { me: { ...me, posts: [...me.posts, addPost] } },
    //   });
    // },
  });
  //   I don't think this is the correct way to do a remove post because it doesnt take the id, I think we should make a remove post function to
  //   const [removePost, { error }] = useMutation(REMOVE_POST, {
  //     update(cache, { data: { removePost } }) {
  //       try {
  //         const { posts } = cache.readQuery({ query: QUERY_POST });

  //         cache.writeQuery({
  //           query: QUERY_POST,
  //           data: { posts: [removePost, ...posts] },
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     },
  //   });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
console.log(formState)
   // try {
      await addPost({
        variables: { ...formState },
      });
      // set location to home on submit
       window.location.href="/"
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
      <h3>Show us your cute animal pictures</h3>

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

        <UploadImage></UploadImage>
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
          <button  className="btn btn-primary btn-block py-3" type="submit">
            Post Pic
          </button>
        </div>
        {/* {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )} */}
      </form>
    </div>
  );
};

export default PostForm;
