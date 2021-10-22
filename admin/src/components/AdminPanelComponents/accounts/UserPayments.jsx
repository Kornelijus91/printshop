// import { useState } from 'react'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        backgroundColor: theme.myTheme.ketvirta,
        padding: '1rem',
        // color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '7px',
        margin: '1rem 0 0 0',
    },
}));

const UserPayments = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <p>DAR NEPADARIAU</p>
        </Box>
    )
}

export default UserPayments
