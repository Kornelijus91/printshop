
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
        height: '5rem',
        background: `linear-gradient(178deg, #E63946 50%, #F1FAEE 51%)`,
        [theme.breakpoints.up('xxl')]: {
            // background: `linear-gradient(178deg, #E63946 50%, #F1FAEE 51%)`,
            height: '6.675rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            // background: `linear-gradient(178deg, #E63946 50%, #F1FAEE 51%)`,
            height: '10rem',
        },
    },
}));

const Divider = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.body}} />
    )
}

export default Divider
