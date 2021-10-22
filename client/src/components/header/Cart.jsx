// import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    //   marginTop: ".4rem",
      color: theme.myTheme.sriftoSpalva,
      '&:hover': {
        color: '#2d5286',
    },
    },
}));

const Cart = () => {

    const classes = useStyles();

    return (
        <FaShoppingCart size={24} className={classes.root} />
    )
}

export default Cart
