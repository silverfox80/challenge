import CustomerMenu from '../components/customer-menu';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'

const HomePage = (props) => {
    
    if (!props.currentUser) {
        return (<h2><span className="m-2">Please Register or Log-in</span></h2>);
    }

    const [isLoading, setLoading] = useState(false); //State for the loading indicator
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const router = useRouter();
    /*
        Customers fetching happens after page navigation, 
        so we need to switch Loading state on Router events.
    */
    useEffect(() => { 
        //After the component is mounted set router event handlers - 
        //UseEffect (that belongs to the Hooks system) allows to use lifecycle methods in a functional component
        router.events.on('routeChangeStart', startLoading); 
        router.events.on('routeChangeComplete', stopLoading);

        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
        }
    }, [])

    const paginationHandler = (page) => {
        const currentPath = router.pathname;
        let currentQuery = router.query;
        currentQuery.page = !currentQuery.page ? 1 : page.selected + 1;
        
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };
    		
    //Conditional rendering of the posts list or loading indicator
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
                        <button className="btn btn-primary btn-sm mx-1">View</button>
                    </Link>                                                         
                </td>
            </tr>
        );
    });

    const links = [
        { label: 'Add a new client', href: '/customer/create', icon:'person-plus' }
    ];

    let content = null;
    if (isLoading)
        content = <tr><td>Loading...</td></tr>;
    else {
                //Generating customers list
        content = customerList;
    }
    const [querySearch, setQuerySearch] = useState('');
    
    const filterHandler = async (value) => {  
        setQuerySearch(value);      
        
        const currentPath = router.pathname;
        const currentQuery = { page: 1, search: value};
        
        router.push({
            pathname: currentPath,
            query: currentQuery,
        }); 
    }

    return (
        <div>        
            <h1>Client List</h1>
            <CustomerMenu items={links}/>
            <div className="d-flex flex-row-reverse bd-highlight">
                <input
                    value={querySearch}
                    placeholder="filter lastname here"
                    onChange= {e => filterHandler(e.target.value)} 
                    className="p-2 bd-highlight" />                
            </div>
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
HomePage.getInitialProps = async (context, client, currentUser) => {
    if (currentUser){
        //console.log(context.query);
        const { page = 1, search = '' } = context.query;        
        const customers = await client.get(`/api/customers?page=${page}&search=${search}`);
        
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
export default HomePage; 