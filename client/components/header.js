import Link from 'next/link';
import faker from 'faker';

const Header = ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
         currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
    .filter(linkConfig => linkConfig)  //this will filter out any entering that are false
    .map(({ label, href }) => {
        return (
        <li key={href} className="nav-item">
            <Link href={href}>
                <a className="nav-link">{label}</a>
            </Link>
        </li>
        );
    });
    
    const loggedUser = !currentUser ? '' : (currentUser.hasOwnProperty('name') ? `Welcome ${currentUser.name}`: "");

    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center">
                <h2>Challenge Portal</h2>
            </div>
            <nav className="navbar navbar-light">        
                <span className="border-0"><b>{loggedUser}</b></span>                      
                <div className="d-flex justify-content-end">
                    <ul className="nav d-flex align-items-center">{links}</ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;