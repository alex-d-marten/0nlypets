import React from "react";
import { useParams } from "react-router-dom";
// if we want to link things, we will need link so lets leave this in here for now
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
//import CommentList from "../CommentList";

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
            <div className="col p-1">
              <div className="card-group rounded">
                <div key={post._id} className="card border  m-3 p-1 border-5">
                  <p className="card-header">{post.petName}</p>
                  <Link
                    to={`/profile/${post.username}`}
                    className="mx-3 text-dark"
                  >
                    posted by: {post.username}
                  </Link>

                  <Link
                    className="btn"
                    to={`/post/${post.username}/${post._id}`}
                  >
                    <img
                      src={`${post.image}`}
                      class="card-img-top"
                      alt="cute pic here"
                    />
                  </Link>
                  <p className="mx-3">{post.caption}</p>
                  {/* <div className="card-body">{post.createdAt}</div> */}
                  {/* <div>
                      <CommentList comments={post.comments} />
                    </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
