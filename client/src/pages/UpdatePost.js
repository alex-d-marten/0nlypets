import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_POST } from "../utils/mutations";
import {
  QUERY_POSTS,
  QUERY_POST,
  QUERY_ME,
  QUERY_USER,
} from "../utils/queries";

// import Auth from "../utils/auth";
// import { useQuery } from "@apollo/client";
// import { QUERY_POST } from "../utils/queries";

//I hate to say it but I have no idea where the props for this are coming from
// const UpdatePost = (props) => {
// const { id: postId } = useParams();

// const { loading, data } = useQuery(QUERY_POST, {
//   variables: { id: postId },
// });

// const post = data?.post || {};

// if (loading) {
//   return <div>Loading...</div>;
// }

const UpdatePost = () => {
  const [formState, setFormState] = useState({
    petName: "",
    image: "",
    caption: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [updatePost, { error }] = useMutation(UPDATE_POST, {
    update(cache, { data: { updatePost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });
        console.log(posts);

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [updatePost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      const { user } = cache.readQuery({ query: QUERY_USER });
      console.log(user);
      cache.writeQuery({
        query: QUERY_USER,
        data: { user: { ...user, posts: [...user.posts, updatePost] } },
      });
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

  // class Form extends React.Component {
  //   state = {
  //     petName: "what?",
  //     caption: "",
  //     image: "",
  //   };
  // }

  // const { petName, caption, image } = this.state;

  return (
    <div>
      {/* 
      so I need a form. 
      - which will shows my original caption and petName
      - and the image is not changable
      */}
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div>{/* Jovial needs the pic shows here */}</div>
        <div className="col-12">
          <input
            name="petName"
            placeholder=""
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
            DONE
          </button>
          <button className="btn btn-primary btn-block py-3" type="submit">
            REMOVE THIS POST
          </button>
        </div>
      </form>

      {/* 
      <form
              className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}
              >
      <input
            name="petName" 
            id="petName" 
            type="text"
            value={post.petName}
            placeholder={post.petName}
            onChange={handleChange}
          />
        <input
        name="caption" 
        id="caption"
        type="text"
        value={post.caption}
        placeholder={post.caption}
        onChange={handleChange}
      />
      </form> */}
      {/* <form class="edit-post-form">
    <div>
      <label name="post-title">{{post.post_title}}</label>
      <input
        name="post-title"
        id="post-title"
        type="text"
        value="{{post.post_title}}"
      />
    </div>
    <div>
      <label name="post-text">{{post.post_text}}</label>
      <input
        name="post-text"
        id="post-text"
        type="text"
        value="{{post.post_text}}"
      />
    </div>
    {{#each post.comments as |comment|}}
      <div> {{comment.comment_text}}</div>
      <span> {{comment.user.username}}</span>
    {{/each}}
*/}
    </div>
  );
};
// };

export default UpdatePost;
