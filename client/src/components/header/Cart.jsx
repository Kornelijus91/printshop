import { FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '24px',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '32.4px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '48px',
        },
        color: theme.myTheme.sriftoSpalva,
        '&:hover': {
            color: '#2d5286',
            cursor: 'pointer'
        },
    },
    badge: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.67rem',
        backgroundColor: '#26a69a',
        transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -1rem)`,
        boxShadow: `0 0 0 2px ${theme.myTheme.pirma}`,
        [theme.breakpoints.up('xl')]: {
            transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -.7rem)`,
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '.9rem',
            // transform: 'translate(3rem, -1.1rem)',
            transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -1.1rem)`,
            boxShadow: `0 0 0 3px ${theme.myTheme.pirma}`,
            padding: '.9em .6em',
            borderRadius: '5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.34rem',
            transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -1.5rem)`,
            boxShadow: `0 0 0 4px ${theme.myTheme.pirma}`,
        },
    },
}));

const Cart = ({ priceSum }) => {

    const classes = useStyles(priceSum.sum === priceSum.dscSum ? priceSum.sum : priceSum.dscSum);
    const history = useHistory();

    return (
        <Badge 
            badgeContent={priceSum.sum === priceSum.dscSum ? `${(priceSum.sum).toFixed(2)}€` : `${(priceSum.dscSum).toFixed(2)}€`} 
            invisible={priceSum.sum <= 0 || priceSum.dscSum <= 0} 
            classes={{badge: classes.badge}}
            anchorOrigin={{ 
                vertical: 'top', 
                horizontal: 'right'
            }}
        >
            <FaShoppingCart className={classes.root} onClick={() => history.push('/cart')}/>
        </Badge>
    )
}

export default Cart
