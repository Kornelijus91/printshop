import { FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.balta,
        transition:'color .2s ease', 
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            cursor: 'pointer'
        },
    },
    badge: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        fontSize: 'clamp(0.67rem, 0.54vw, 1.34rem)',
        backgroundColor: theme.myTheme.sZalia.main,
        // transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -.7rem)`,
        boxShadow: `0 0 0 clamp(2px, 0.1vw, 4px) ${theme.myTheme.juoda}`,
        padding: theme.myTheme.sizeXS,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        // [theme.breakpoints.up('xxl')]: {
        //     transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -.98rem)`,
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     transform: (valuex) => `translate(${(valuex).toFixed(2).length + 0.5}ch, -1.4rem)`,
        // },
    },
}));

const Cart = ({ priceSum, _cart }) => {

    const classes = useStyles(priceSum.sum === priceSum.dscSum ? priceSum.sum : priceSum.dscSum);
    const history = useHistory();

    return (
        <Badge 
            badgeContent={_cart.length} 
            invisible={_cart.length <= 0 || priceSum.sum <= 0 || priceSum.dscSum <= 0} 
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
