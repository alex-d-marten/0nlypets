import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const { id: postId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  console.log(postId);
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setCommentText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { postId,commentText },
      });

      // clear form value
      setCommentText("");
      console.log(data.postId);
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // update state based on form input changes

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 400 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/400
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Add comment..."
          value={commentText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-success col-12 col-md-3" type="submit">
          Add
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
