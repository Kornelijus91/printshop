import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    text: {
        fontFamily: theme.myTheme.sriftas,
    }
}));

const Orders = () => {

    const classes = useStyles();

    return (
        <Container maxWidth='xl' classes={{root: classes.root}}>
            <h1 className={classes.text}>Orders PAGE</h1>
        </Container>
    )
}

export default Orders
