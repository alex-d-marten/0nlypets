import React, { useState } from "react";
import "./App.css";
// component import
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
//import logo from "./logo.svg";
const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // keeps track of which link in the Nav has been clicked
  // and is currently active.
  const [currentPage, setCurrentPage] = useState("Home");
  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    if (currentPage === "Signup") {
      return <Signup />;
    }
    if (currentPage === "Login") {
      return <Login />;
    }
    return Home;
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></Header>
        <section className="main-section">{renderPage()}</section>
        <Footer></Footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
