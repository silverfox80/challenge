import CustomerMenu from '../components/customer-menu';
import Link from 'next/link';
import React, { useState } from 'react';

const HomePage = ({currentUser, customers}) => {
    
    const customerList = customers.map((customer) => {
        return (
            <tr key={customer.id}>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.email}</td>
                <td>{customer.street}</td>
                <td>{customer.city}</td>
                <td>{customer.postcode}</td>
                <td>{customer.country}</td>
                <td>
                    <Link href="/customer/[customerId]" as={`/customer/${customer.id}`}>
                        <button className="btn btn-primary btn-sm mx-1">View</button>
                    </Link>                                                         
                </td>
            </tr>
        );
    });
    
    return currentUser ? (
    <div>        
        <h1>Client List</h1>
        <CustomerMenu />
        <table className="table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Telephone Number</th>
                <th>E-Mail</th>
                <th>Street</th>
                <th>City</th>
                <th>Postcode</th>
                <th>Country</th>
                <th></th>
            </tr>
        </thead>
        <tbody>{customerList}</tbody>
        </table>
    </div>
    ): (<h2><span className="m-2">Please Register or Log-in</span></h2>);

}
// getInitialProps is specific from nextjs, it will call this function while is attempting to render the page
// anything we return from it (object), will be passed to the component as a prop
HomePage.getInitialProps = async (context, client, currentUser) => {
    
    if (currentUser){
        const { data } = await client.get('/api/customers'); 
        return { customers: data };
    } 

    return { customers: [] };
}
export default HomePage; 