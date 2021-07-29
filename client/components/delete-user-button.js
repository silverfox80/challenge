import useRequest from '../hooks/use-request';
import { useRouter } from 'next/router';

const DeleteUserButton = ({ uid }) => {

    const router = useRouter();
    const deleteHandler = (uid) => useRequest({
        url: `/api/users/${uid}`,
        method: 'delete',
        onSuccess: () => router.push('/user')
    });
    
    return (
        <button onClick={deleteHandler(uid).doRequest} className="btn btn-danger btn-sm">Delete</button>         
    );
};

export default DeleteUserButton;