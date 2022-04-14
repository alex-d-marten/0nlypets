import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-start text-dark">Comments</span>
        <span className="text-end"></span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map((comment) => (
            <div>
              <h8 className="pill mb-3" key={comment._id}>
                <Link
                  to={`/profile/${comment.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {comment.username}
                </Link>
                <span> {comment.createdAt}</span>
              </h8>
              <p className="pl-3 display-7">{comment.commentText}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
