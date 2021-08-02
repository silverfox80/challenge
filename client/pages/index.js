import MenuBar from '../components/menu-bar';
import React from 'react';


const HomePage = (props) => {
    //console.log(props.currentUser);
    if (!props.currentUser) {
        return (<h2><span className="m-2">Please <a href="/auth/signup">Register</a> or <a href="/auth/signin">Log-in</a> to access the portal.</span></h2>);
    }
    
    const links = [
        { label: 'Customers', href: '/customer/', icon:'file-person-fill' },
        { label: 'Users', href: '/user/', icon:'person-square' }
    ];

    return (
        <div>
            <MenuBar items={links}/>
        </div>
    );

}

export default HomePage; 