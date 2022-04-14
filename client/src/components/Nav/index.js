import { Link } from "react-router-dom";
import Auth from "../../utils/auth";


function Nav({ currentPage, setCurrentPage }) {

  const logout = event => {
    event.preventDefault();
    Auth.logout(); 
  };

  return (
    <div>
      <ul className="flex-container nav-list">
        {Auth.loggedIn() ? (

          <>
            <Link to={`/`} className="text-dark" style={{ textDecoration: 'none' }}>
              <li
                onClick={() => setCurrentPage("Home")}
                className={currentPage === "Home" ? "nav-active" : ""}
              >
                Home
              </li>
            </Link>
            <Link
              to={`/${Auth.loggedIn() ? Auth.getProfile().data.username : ""
                }/createpost/`}
              className="text-dark" style={{ textDecoration: 'none' }}
            >
              <li
                onClick={() => setCurrentPage("CreatePost")}
                className={currentPage === "CreatePost" ? "nav-active" : ""}
              >
                Create Post
              </li>
            </Link>
            <Link
              to={`/profile/${Auth.loggedIn() ? Auth.getProfile().data.username : ""
                }`}
              className="text-dark" style={{ textDecoration: 'none' }}
            >
              <li
                onClick={() => setCurrentPage("Profile")}
                className={currentPage === "Profile" ? "nav-active" : ""}
              >
                Profile
              </li>
            </Link>
            
        <Link to={`/Signup`} className="text-dark" style={{ textDecoration: 'none' }}>
          <li
            onClick={logout}
            
          >
            Logout
          </li>
        </Link>
      
          </>
        ) : (
            
          <>
            {/* <li onClick={()=>setCurrentPage('Add Post')} className={currentPage === 'Add Post' && 'nav-active'}>Add Post</li> */}
            <Link to={`/login`} className="text-dark" style={{ textDecoration: 'none' }}>
              <li
                onClick={() => setCurrentPage("Login")}
                className={currentPage === "Login" ? "nav-active" : ""}
              >
                Login
              </li>
            </Link>
            <Link to={`/signup`} className="text-dark" style={{ textDecoration: 'none' }}>
              <li
                onClick={() => setCurrentPage("Signup")}
                className={currentPage === "Signup" ? "nav-active" : ""}
              >
                Sign Up
              </li>
            </Link>
          </>
        )}
        </ul>
    </div>
  );
}

export default Nav;
