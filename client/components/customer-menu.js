import Link from 'next/link';

const CustomerMenu = ({ items }) => {
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
        <div className="d-flex">
            <ul className="nav d-flex align-items-center">{menuItems}</ul>
        </div>         
    );
};

export default CustomerMenu;