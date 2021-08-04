import MenuBar from '../../components/menu-bar';
import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import faker from 'faker';

const NewUser = () => {
        
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Users', href: '/user/', icon:'person-square' }
    ];
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vpassword, setVpassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/create',
        method: 'post',
        body: {
            firstname, 
            lastname, 
            email,
            password          
        },
        onSuccess: () => Router.push('/user/')
    });

    const onSubmit = async event => {
        event.preventDefault();
        if (password !== vpassword) {
            alert("Passwords don't match");
            return;
        }
        await doRequest();
    };

    const createFake = (e) => {
        e.preventDefault();
        setFirstname ( faker.name.firstName );
        setLastname( faker.name.lastName );
        setEmail( faker.internet.email() );    
        setPassword( '1234' );  
        setVpassword( '1234' );  
    };

    return (
        <div className="d-flex mx-5">
            <form onSubmit={onSubmit}>
                <MenuBar items={links}/>
                <h1>New Customer</h1>                
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
                    <label>Email (*)</label>
                    <input
                    value={email}
                    onChange= {e => setEmail(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password (*)</label>
                    <input
                    type="password"
                    value={password}
                    onChange= {e => setPassword(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Verify Password (*)</label>
                    <input
                    type="password"
                    value={vpassword}
                    onChange= {e => setVpassword(e.target.value)} 
                    className="form-control" />
                </div>
                
                { errors }      
                <button className="btn btn-primary m-2">Submit User</button> 
                <button onClick={e => createFake(e)} className="btn btn-info m-2">Create a FAKE</button>               
            </form>            
      </div>
    );
};

export default NewUser;