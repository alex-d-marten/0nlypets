import Nav from "../Nav";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";


function Header({ currentPage, setCurrentPage }){
    return(
        <header className="top-header">
            <div className="flex-container">
            <Link
                to={`/${Auth.loggedIn() ? Auth.login: ""
                }/signup/`} 
                className="custom-a">
                    <h1 className="head-1">OnlyPets</h1>
            </Link>
                <Nav
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ></Nav>
            </div>
        </header>
    )
}

export default Header;

 
