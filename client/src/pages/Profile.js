// This is the user's profile page where they can update their profile and upload pictures of their pets and view a single post if they click on one
import React from "react";
import { Redirect, useParams } from "react-router-dom";

import PostList from "../components/PostList";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
// import { ADD_POST } from "../utils/mutations";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  //   const [addPost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-12">
          <PostList title={`${userParam}'s pet posts...`} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
