import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import List from './List'
import OrderDetail from './OrderDetail'
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: 'pink',
        width: '99.5%',
        marginTop: '1em',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '2em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '4em',
        },
    },
}));


const Orders = ({ newChatrooms, newOrders, setOrdersPage, orders, ordersPage, ordersView, setOrdersView, order, setOrder, setSnackbar, getOrders, user, orderFilter }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Užsakymai | {ProjectName}</title>  
            </Helmet>
            {ordersView ? 
                <OrderDetail order={order} user={user} getOrders={getOrders} ordersPage={ordersPage} setOrder={setOrder} setSnackbar={setSnackbar} orderFilter={orderFilter}/>
            :
                <List user={user} orders={orders} setOrdersPage={setOrdersPage} ordersPage={ordersPage} setOrdersView={setOrdersView} setOrder={setOrder} setSnackbar={setSnackbar} getOrders={getOrders} orderFilter={orderFilter}/>
            }
        </Box>
    )
}

export default Orders
