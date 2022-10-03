import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fonas from '../../../media/background.webp'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '86.05vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        backgroundImage: `url(${fonas})`,
        backgroundSize: 'cover',
    },
    content: {
        width: '100%',
        height: '100%',
        padding: '1em 1em 3em 1em',
        [theme.breakpoints.up('xl')]: {
            width: '80%',
            padding: '1em 0 3em 0',
        },
    },
}));

const Wrapper = ({ children }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.content}}>
                {children}
            </Box>
        </Box>
    )
}

export default Wrapper