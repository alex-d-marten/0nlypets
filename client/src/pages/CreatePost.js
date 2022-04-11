import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { ADD_POST } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

//import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";


const CreatePost = () => {

    const { username: userParam } = useParams();

     const [addPost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  console.log(userParam, "banana");
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   console.log(Auth.getProfile());
  //   return <Redirect to="/profile" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data, "cheesecake");
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