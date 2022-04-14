import Nav from "../Nav";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Header({ currentPage, setCurrentPage }){
    return(
        <header className="top-header bg-info bg-opacity-25">
            <div className="flex-container">
            {Auth.loggedIn() ? (
            <Link
                to={`/`}
                className="custom-a">
                    <h1 className="head-1">OnlyPets</h1>
            </Link>
            ):(
                <Link
                    to={`/Signup`}
                    className="custom-a">
                    <h1 className="head-1">OnlyPets</h1>
                </Link>)
                
            }
           
                <Nav
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ></Nav>
            </div>
        </header>
    );
}

export default Header;

 
