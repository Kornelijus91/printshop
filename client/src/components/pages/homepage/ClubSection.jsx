import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import klubas from '../../../media/klubaswebp.webp';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.tZalia.main,
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6em 2em 3em 2em',
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '12em 2em 6em 2em',
        },
    },
    image: {
        fontSize: theme.myTheme.sizeM,
        height: '6em',
        objectFit: 'contain',
        [theme.breakpoints.up('sm')]: {
            height: '8em',
        },
        [theme.breakpoints.up('md')]: {
            height: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            height: '12em',
        },
    }
}));

const ClubSection = () => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <Box 
            classes={{root: classes.root}} 
            onClick={() => {
                history.push('/klubas');
                window.scrollTo({top: 0, left: 0});
            }}
    >
            <img src={klubas} alt="Tavo Rekalama Klubas" className={classes.image}/>
        </Box>
    )
}

export default ClubSection
