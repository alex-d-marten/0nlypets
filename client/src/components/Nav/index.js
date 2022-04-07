
function Nav({ currentPage, setCurrentPage }){
    return(
        <div>
            <ul className="flex-container nav-list">
                <li onClick={()=>setCurrentPage('Profile')} className={currentPage === 'Profile' && 'nav-active'}>Profile</li>
                <li onClick={()=>setCurrentPage('Add Post')} className={currentPage === 'Add Post' && 'nav-active'}>Add Post</li>
                <li onClick={()=>setCurrentPage('Login')} className={currentPage === 'Login' && 'nav-active'}>Login</li>
                <li onClick={()=>setCurrentPage('Sign Up')} className={currentPage === 'Sign Up' && 'nav-active'}>Sign Up</li>
                <li onClick={()=>setCurrentPage('Logout')} className={currentPage === 'Logout' && 'nav-active'}>Logout</li>
            </ul>
        </div>
    );
}

export default Nav;