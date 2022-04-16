import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST, UPLOAD_FILE } from "../../utils/mutations";
// import { linkText } from "../../imageLink/index.js";

const PostForm = () => {
  const [formState, setFormState] = useState({
    petName: "",
    image: "",
    caption: "",
  });
  const [characterCount, setCharacterCount] = useState(0);
  
  const [uploadImage] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
});
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadImage({ variables: { file } });
  };

  const [addPost, { error }] = useMutation(ADD_POST)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
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
      <h2>Show us your cute animal pictures</h2>

      
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-md-4">
          <input
            name="petName"
            placeholder="What are the names of the pet pictured in the photo?"
            value={formState.petName}
            className="form-input w-100 p-2"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
            <input name={'document'} type={'file'} onChange={handleFileChange}/>
        </div>
        <div className="col-12 col-md-5 mt-3">
        <p
          className={`m-0 mt-3 ${
            characterCount === 280 || error ? "text-danger" : ""
          }`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
          <textarea
            name="caption"
            placeholder="Caption this photo..."
            value={formState.caption}
            className="form-input w-100 p-2"
            style={{ lineHeight: "1.5" }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-3 mt-3">
          <button  className="btn btn-primary btn-block py-3" type="submit">
            Post Pic
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
