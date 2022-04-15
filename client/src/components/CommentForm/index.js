import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const { id: postId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
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
        variables: { postId, commentText },
      });

      // clear form value
      setCommentText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // update state based on form input changes

  return (
    <div>
      <div className="mx-3">
        <p
          className={`m-0 ${
            characterCount === 400 || error ? "text-error" : ""
          }`}
        >
          Character Count: {characterCount}/400
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
      </div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Add comment..."
          value={commentText}
          className="form-input mx-3 col-12 "
          onChange={handleChange}
        ></textarea>
        <button className="btn btn-color m-3" type="submit">
          Add Comment
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
