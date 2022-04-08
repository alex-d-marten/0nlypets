import React from "react";
// if we want to link things, we will need link so lets leave this in here for now
import { Link } from "react-router-dom";

const PostList = ({ posts, title}) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">{post.petName}</p>
            <img src="{post.image}" alt="This is a cute picture" />
            <p className="">{post.caption}</p>
            <div className="card-body">{post.createdAt}</div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
