import React from "react";
import { useParams } from "react-router-dom";
// if we want to link things, we will need link so lets leave this in here for now
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import CommentList from "../CommentList";

const PostList = ({ title }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_POSTS, {
    variables: { username: userParam },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data?.posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      <div className="row row-cols-1 row-cols-md-3">
        {data.posts &&
          data.posts.map((post) => (
            <div className="col">
              <div className="card-group">
                <div key={post._id} className="card border-primary mb-3 p-3">
                  <Link to={`/profile/${post.username}`} className="text-dark">
                    {post.username}
                  </Link>
                  {/* Jovial wants to add EDIT button here!!!!!! */}
                  <Link to={`/post/${post._id}/editmode/`}>EDIT IT!!</Link>
                  <p className="card-header">{post.petName}</p>
                  <img
                    src={post.image}
                    class="card-img-top"
                    alt="cute pic here"
                  />
                  <p className="">{post.caption}</p>
                  <div className="card-body">{post.createdAt}</div>
                  <div>
                    <CommentList comments={post.comments} />
                  </div>
                  <Link
                    className="btn btn-primary btn-info"
                    to={`/post/${post._id}`}
                  >
                    Comment on this good boy.
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
