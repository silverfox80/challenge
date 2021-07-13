import Link from 'next/link';
import { useState } from 'react';

export default ({ currentUser }) => {
    const links = [
        { label: 'Add a new client', href: '/customer/create', icon:'person-plus' }
    ]
    .map(({ label, href, icon }) => {
        return (
        <li key={href} className="nav-item">
            <Link href={href}>
                <a className="nav-link"><i className={"bi bi-"+icon}></i> {label}</a>
            </Link>            
        </li>
        );
    });
    const [querySearch, setQuerySearch] = useState('');
    
    const filterHandler = () => {        
        alert('Filter out the client table '+querySearch);        
    }

    return (
        <div className="d-flex">
            <ul className="nav d-flex align-items-center">{links}</ul>
            
            <div className="d-flex align-items-right">
                <input
                    value={querySearch}
                    onChange= {e => setQuerySearch(e.target.value)} 
                    className="form-control" />
                <button onClick={filterHandler} className="btn btn-primary btn-sm mx-2">Filter List</button>
            </div>
        </div>         
    );
};