import MenuBar from '../../components/menu-bar';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { useState } from 'react';

const UserShow = ({ user }) => {
    
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Users', href: '/user/', icon:'person-square' }
    ];
    
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    
    const {doRequest,errors} = useRequest({
        url: `/api/users/${user.id}`,
        method: 'put',
        body: {
            firstname, 
            lastname, 
            email            
        },
        onSuccess: () => Router.push('/user/')
    });

    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <div className="d-flex mx-5">
            <form onSubmit={onSubmit}>
                <MenuBar items={links}/>
                <h1>User Details</h1>
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
                { errors }      
                <button className="btn btn-primary m-2">Update User</button>
            </form>
            
        </div>
    );
};

UserShow.getInitialProps = async (context, client) => {
  const { userId } = context.query;
  const { data } = await client.get(`/api/users/${userId}`);

  return { user: data };
};

export default UserShow;