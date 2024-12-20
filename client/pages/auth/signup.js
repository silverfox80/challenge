import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignUp = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            firstname,
            lastname,
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <div className="row container">
            <form onSubmit={onSubmit}>
                <h2>Register User</h2>
                <div className="form-group col-3">
                    <label className="form-label">First Name</label>
                    <input
                    value={firstname}
                    onChange= {e => setFirstName(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group col-3">
                    <label className="form-label">Last Name</label>
                    <input
                    value={lastname}
                    onChange= {e => setLastName(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group col-3">
                    <label className="form-label">Email</label>
                    <input
                    value={email}
                    onChange= {e => setEmail(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="form-group col-2">
                    <label className="form-label">Password</label>
                    <input 
                    value={password}
                    onChange= {e => setPassword(e.target.value)} 
                    type="password" className="form-control" />
                </div>
                { errors }      
                <button className="btn btn-primary mt-2">Sign Up</button>
            </form>
      </div>
    );
};

export default SignUp;