/** Columns ordering component */

const OrderColumn = ({ colname, handler, currentValue }) => {
    
    let isActiveClass = '';
    let orderObj = ['lastname',1];
    
    if (currentValue){
        orderObj = currentValue;
        isActiveClass = currentValue[0]===colname?'btn-info':'';
    }
    
    return (
        <button className={`btn btn-sm btn-outline-secondary ms-5 ${isActiveClass}`} onClick={e => handler(colname)}>
            <i className={`bi bi-sort-${((orderObj[0]==colname && orderObj[1]==1)?'down':'up')}`}></i>
        </button>         
    );
};

export default OrderColumn;