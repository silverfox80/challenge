import CustomerMenu from '../../components/customer-menu';
import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewCustomer = () => {
        
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Customers', href: '/customer/', icon:'file-person-fill' }
    ];
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/customers',
        method: 'post',
        body: {
            firstname, 
            lastname, 
            phoneNumber, 
            email, 
            street, 
            postcode, 
            city, 
            country
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>New Customer</h1>
                <CustomerMenu items={links}/>
                <div className="form-group">
                    <label>First Name (*)</label>
                    <input
                    value={firstname}
                    onChange= {e => setFirstname(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Last Name (*)</label>
                    <input
                    value={lastname}
                    onChange= {e => setLastname(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Telephone Number</label>
                    <input
                    value={phoneNumber}
                    onChange= {e => setPhoneNumber(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email (*)</label>
                    <input
                    value={email}
                    onChange= {e => setEmail(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Street (*)</label>
                    <input
                    value={street}
                    onChange= {e => setStreet(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Postcode (*)</label>
                    <input 
                    value={postcode}
                    onChange= {e => setPostcode(e.target.value)} 
                    type="number" className="form-control" />
                </div>
                <div className="form-group">
                    <label>City (*)</label>
                    <input
                    value={city}
                    onChange= {e => setCity(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Country (*)</label>
                    <input
                    value={country}
                    onChange= {e => setCountry(e.target.value)} 
                    className="form-control" />
                </div>
                { errors }      
                <button className="btn btn-primary mt-2">Submit Customer</button>
            </form>
      </div>
    );
};

export default NewCustomer;