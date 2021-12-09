
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
        height: '5em',
        background: `linear-gradient(-178deg, #E63946 50%, #457B9D 51%)`,
        [theme.breakpoints.up('xxl')]: {
            background: `linear-gradient(-178.5deg, #E63946 50%, #457B9D 52%)`,
        },
        [theme.breakpoints.up('xxxl')]: {
            background: `linear-gradient(-179deg, #E63946 50%, #457B9D 53%)`,
        },
    },
}));

const Divider2 = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.body}} />
    )
}

export default Divider2
