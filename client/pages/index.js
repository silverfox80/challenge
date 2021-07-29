import CustomerMenu from '../components/customer-menu';
import React from 'react';


const HomePage = (props) => {
    //console.log(props.currentUser);
    if (!props.currentUser) {
        return (<h2><span className="m-2">Please Register or Log-in</span></h2>);
    }
    
    const links = [
        { label: 'Customers', href: '/customer/', icon:'file-person-fill' },
        { label: 'Users', href: '/user/', icon:'person-square' }
    ];

    return (
        <div>
            <CustomerMenu items={links}/>
        </div>
    );

}

export default HomePage; 