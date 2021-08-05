import Link from 'next/link';

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
                <span className="p-2"><b>{loggedUser}</b></span>  
                <h2 className="ms-auto p-2 border border-dark rounded">Challenge Portal</h2>
                <nav className="navbar navbar-light ms-auto">
                    <div className="d-flex justify-content-end">
                        <ul className="nav d-flex align-items-center">{links}</ul>
                    </div>
                </nav>
            </div>            
        </div>
    );
};

export default Header;