import MenuBar from '../../components/menu-bar';
import OrderColumn from '../../components/order-column';
import DeleteUserButton from '../../components/delete-user-button';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

const UserPage = (props) => {
    
    if (!props.currentUser) {
        return (<h2><span className="m-2">Please Register or Log-in</span></h2>);
    }
    //Menu bar component customization
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Add a new user', href: '/user/create', icon:'person-plus' }
    ];
    //
    const [isLoading, setLoading] = useState(false); //State for the loading indicator
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const router = useRouter();
    /*
        Customers fetching happens after page navigation, 
        so we need to switch Loading state on Router events.
    */
    useEffect(() => {   //similar to componentDidMount and componentDidUpdate
        //After the component is mounted set router event handlers - 
        //UseEffect (that belongs to the Hooks system) allows to use lifecycle methods in a functional component
        router.events.on('routeChangeStart', startLoading); 
        router.events.on('routeChangeComplete', stopLoading);

        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
        }
    }, []);
    //Conditional rendering of the user list or loading indicator
    const userList = props.users.map((user) => {
        let btn_delete = <i className="bi bi-person-circle"> logged user</i>;
        if (user.id !== props.currentUser.id) {
            btn_delete = <DeleteUserButton uid={user.id} />;
        }
        return (
            <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>  
                <td>                   
                    {btn_delete}                                                     
                </td>           
            </tr>
        );
    });
    //Loading indicator
    let content = null;
    if (isLoading)
        content = <tr><td>Loading...</td></tr>;
    else {
        //Generating user list
        content = userList;
    }
    //Pagination handler
    const paginationHandler = (page) => {
        const currentPath = router.pathname;
        let currentQuery = router.query;
        currentQuery.page = !currentQuery.page ? 1 : page.selected + 1;
        
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };
    //Search handler
    const [querySearch, setQuerySearch] = useState('');   
    const filterHandler = async (value) => {  
        setQuerySearch(value);
    }
    //Sort handler
    const [querySortOrder, setQuerySortOrder] = useState(['lastname',1]);
    const sortHandler = async (colname) => {  
                
        let val = 1;
        if (colname==querySortOrder[0]) {
            val = querySortOrder[1] == 1? -1 : 1; //toggle the order
        }
        setQuerySortOrder([colname,val]);        
    }
    //
    useEffect(() => {
        const currentPath = router.pathname;
        const currentQuery = { page: 1, search: querySearch, sortcol:querySortOrder[0] ,sort: querySortOrder[1] };
        
        router.push({
            pathname: currentPath,
            query: currentQuery,
        }); 
    }, [querySortOrder,querySearch]);  //Apply the new query string when the state is updated
    //
    return (
        <div>
            <MenuBar items={links}/>
            <h1>User List</h1>
            <div className="d-flex flex-row-reverse bd-highlight">
                <input
                    value={querySearch}
                    placeholder="filter here"
                    onChange= {e => filterHandler(e.target.value)} 
                    className="p-2 bd-highlight" />                
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name
                            <OrderColumn colname="firstname" handler={sortHandler} currentValue={querySortOrder} />
                        </th>
                        <th>Last Name
                            <OrderColumn colname="lastname" handler={sortHandler} currentValue={querySortOrder} />
                        </th>
                        <th>E-Mail
                            <OrderColumn colname="email" handler={sortHandler} currentValue={querySortOrder} />
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{content}</tbody>
            </table>       

            <ReactPaginate
                previousLabel={'previous'}
                previousClassName={'fw-bold mx-1 align-middle'}
                nextLabel={'next'}
                nextClassName={'fw-bold mx-1 align-middle'}
                breakLabel={'...'}
                breakClassName={'mx-1'}
                pageClassName={'list-group-item'}
                activeClassName={'active'}
                containerClassName={'list-group list-group-horizontal'}

                initialPage={props.currentPage -1}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={paginationHandler}
            />
        </div>
    );

}
// getInitialProps is specific from nextjs, it will call this function while is attempting to render the page
// anything we return from it (object), will be passed to the component as a prop
UserPage.getInitialProps = async (context, client, currentUser) => {
    if (currentUser){
        //console.log(context.query);
        const { page = 1, search = '',sortcol = 'lastname', sort = 1} = context.query;        
        const users = await client.get(`/api/users?page=${page}&search=${search}&sort=${sort}`);
        
        return {
            totalCount: users.data.meta.totalCount,
            pageCount: users.data.meta.pageCount,
            currentPage: users.data.meta.currentPage,
            perPage: users.data.meta.perPage,
            users: users.data.result,
        };
    }
    return {};
}
export default UserPage; 