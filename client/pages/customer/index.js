import MenuBar from '../../components/menu-bar';
import OrderColumn from '../../components/order-column';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

const CustomerPage = (props) => {
    
    if (!props.currentUser) {
        return (<h2><span className="m-2">Please Register or Log-in</span></h2>);
    }
    //Menu bar component customization
    const links = [
        { label: 'Home Page', href: '/', icon:'house' },
        { label: 'Add a new customer', href: '/customer/create', icon:'person-plus' },
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
    //Conditional rendering of the customers list or loading indicator
    const customerList = props.customers.map((customer) => {
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
                        <button className="btn btn-primary btn-sm mx-1">Edit</button>
                    </Link>                                                      
                </td>                
            </tr>
        );
    });
    //Loading indicator
    let content = null;
    if (isLoading)
        content = <tr><td>Loading...</td></tr>;
    else {
        //Generating customers list
        content = customerList;
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
            <h1>Customer List</h1>
            <div className="d-flex flex-row-reverse bd-highlight">
                <input
                    value={querySearch}
                    placeholder="filter lastname or city here"
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
                        <th>Telephone Number</th>
                        <th>E-Mail
                            <OrderColumn colname="email" handler={sortHandler} currentValue={querySortOrder} />
                        </th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Postcode</th>
                        <th>Country</th>
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
CustomerPage.getInitialProps = async (context, client, currentUser) => {
    if (currentUser){
        //console.log(context.query);
        const { page = 1, search = '',sortcol = 'lastname', sort = 1} = context.query;        
        const customers = await client.get(`/api/customers?page=${page}&search=${search}&sortcol=${sortcol}&sort=${sort}`);
        
        return {
            totalCount: customers.data.meta.totalCount,
            pageCount: customers.data.meta.pageCount,
            currentPage: customers.data.meta.currentPage,
            perPage: customers.data.meta.perPage,
            customers: customers.data.result,
        };
    }
    return {};
}
export default CustomerPage; 