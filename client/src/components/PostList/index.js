import React from "react";
import { useParams } from "react-router-dom";
// if we want to link things, we will need link so lets leave this in here for now
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

const PostList = ({ title }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_POSTS, {
    variables: { username: userParam },
  }); 
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data.posts.length) {
    return <h3>No Posts Yet</h3>;
  }
 
  return (
    <div>
      <h3>{title}</h3>
      {data.posts &&
        data.posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <Link to={`/profile/${post.username}`} className="text-dark">
              {post.username}
            </Link>
            <p className="card-header">{post.petName}</p>
            <img src={post.image} />
            <p className="">{post.caption}</p>
            <div className="card-body">{post.createdAt}</div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
