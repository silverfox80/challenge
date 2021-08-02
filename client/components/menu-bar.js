import Link from 'next/link';

const MenuBar = ({ items }) => {
    const menuItems = items.map(({ label, href, icon }) => {
        return (
        <li key={href} className="nav-item">
            <Link href={href}>
                <a className="nav-link"><i className={"bi bi-"+icon}></i> {label}</a>
            </Link>            
        </li>
        );
    });
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">{menuItems}</ul>
                </div>
            </div>                        
        </nav>         
    );
};

export default MenuBar;