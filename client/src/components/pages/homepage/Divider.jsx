
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
        height: '5em',
        background: `linear-gradient(178deg, #A8DADC 50%, #E63946 51%)`,
        [theme.breakpoints.up('xxl')]: {
            background: `linear-gradient(178.5deg, #A8DADC 50%, #E63946 52%)`,
        },
        [theme.breakpoints.up('xxxl')]: {
            background: `linear-gradient(179deg, #A8DADC 50%, #E63946 53%)`,
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
