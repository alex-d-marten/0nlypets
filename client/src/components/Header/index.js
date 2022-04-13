import Nav from "../Nav";

function Header({ currentPage, setCurrentPage }){
    return(
        <header className="top-header">
            <div className="flex-container">
                <a href="/" className="header-a custom-a"><h1 className="head-1">0nlyPets</h1></a>
                <Nav
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ></Nav>
            </div>
        </header>
    );
}

export default Header;