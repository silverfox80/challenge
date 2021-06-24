import Link from 'next/link';

export default ({ currentUser }) => {
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
    const loggedUser = currentUser ? currentUser.email: "";

    return (
    <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand p-2"><button><i className="bi bi-house-fill">{loggedUser}</i></button></a>
        </Link>        
        <div className="d-flex">
            <h2>Emma Challenge</h2>
        </div>
        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
    </nav>
    
    );
};