// The pet feed of existing posts will be displayed here for everyone. Only logged in users can interact with the posts (comment, like)
import React from "react";
import PostList from "../components/PostList";
import Auth from "../utils/auth";
import { Redirect } from "react-router";

//import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  
  const { loading, data } = useQuery(QUERY_POSTS);
  //this doesnt seem to be needed for the home page
  //const { data: userData } = useQuery(QUERY_ME);
  const posts = data?.posts || [];

  const loggedIn = true; //Auth.loggedIn();

  if (!Auth.loggedIn()) {
    return <Redirect to="Signup"/>
  }

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-12"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} title="Cute pictures galore" />
          )}
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default Home;
