/** Columns ordering component */

const OrderColumn = ({ colname, handler, stateVar }) => {
    const isActive =  stateVar[0]===colname ? 'btn-info' : '';
    return (
        <button className={"btn btn-sm btn-outline-secondary ms-5 "+isActive} onClick={e => handler(colname)}>
            <i className={"bi bi-sort-"+((stateVar[0]==colname && stateVar[1]==1)?"down":"up")}></i>
        </button>         
    );
};

export default OrderColumn;