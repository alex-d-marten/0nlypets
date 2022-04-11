import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";

//import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";


const CreatePost = () => {

    const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   console.log(Auth.getProfile());
  //   return <Redirect to="/profile" />;
  // }

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
            <div className="mb-3">{ userParam && <PostForm />}
        </div>
        </div>
        );
      }

export default CreatePost;