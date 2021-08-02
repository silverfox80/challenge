import MenuBar from '../../components/menu-bar';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { useState } from 'react';

const CustomerShow = ({ customer }) => {
    
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Customers', href: '/customer/', icon:'file-person-fill' }
    ];
    
    const [active, setActive] = useState(customer.active);
    const [firstname, setFirstname] = useState(customer.firstname);
    const [lastname, setLastname] = useState(customer.lastname);
    const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
    const [email, setEmail] = useState(customer.email);
    const [street, setStreet] = useState(customer.street);
    const [postcode, setPostcode] = useState(customer.postcode);
    const [city, setCity] = useState(customer.city);
    const [country, setCountry] = useState(customer.country);

    const activateHandler = async ()=> {
        setActive(true);
        await doRequest();
    };

    const deActivateHandler = async ()=> {
        setActive(false);
        await doRequest();
    };

    const deleteHandler = useRequest({
        url: `/api/customers/${customer.id}`,
        method: 'delete',
        onSuccess: () => Router.push('/')
    });

    const {doRequest,errors} = useRequest({
        url: `/api/customers/${customer.id}`,
        method: 'put',
        body: {
            firstname, 
            lastname, 
            phoneNumber, 
            email, 
            street, 
            postcode, 
            city, 
            country,
            active
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <div className="d-flex mx-5">
            <form onSubmit={onSubmit}>
                <MenuBar items={links}/>
                <h1>Client Details</h1>
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
                <div className="form-group">
                    <label>Active</label>
                    <input readOnly value={active} className="form-control" />
                </div>
                { errors }      
                <button className="btn btn-primary m-2">Update Client</button>                
                <button onClick={deleteHandler.doRequest} className="btn btn-danger m-2">Delete Client</button>
                <button onClick={activateHandler} className={"btn btn-success m-2 "}>Activate</button>
                <button onClick={deActivateHandler} className={"btn btn-warning m-2 "}>Deactivate</button>
            </form>
            
        </div>
    );
};

CustomerShow.getInitialProps = async (context, client) => {
  const { customerId } = context.query;
  const { data } = await client.get(`/api/customers/${customerId}`);

  return { customer: data };
};

export default CustomerShow;