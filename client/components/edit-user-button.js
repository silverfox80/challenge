import Link from 'next/link';

const EditUserButton = ({ uid }) => {
    
    return (
        <Link href="/user/[userId]" as={`/user/${uid}`}>
            <button className="btn btn-primary btn-sm mx-1">Edit</button>
        </Link>        
    );
};

export default EditUserButton;