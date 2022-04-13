import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// component import
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import { createUploadLink } from "apollo-upload-client";
//import logo from "./logo.svg";
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const uploadLink = createUploadLink({
  uri: "http://localhost:3001/graphql",
});
const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Header>
          <section className="main-section">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/post/:username/:id" component={SinglePost} />
              <Route
                exact
                path="/:username?/createpost"
                component={CreatePost}
              />
              <Route exact path="/post/:username?/:id/editmode" component={UpdatePost} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </section>
          <Footer></Footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
