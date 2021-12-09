import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pageNotFoundPic from '../../../media/page-not-found.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        fontFamily: theme.myTheme.sriftas,
        fontSize: 'clamp(1rem, 1vw + .7rem, 4rem)',
        textAlign: 'center',
        padding: '2rem',
        color: theme.myTheme.sriftoSpalva,
    },
    link: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        padding: '0',
        // textDecoration: 'none',
        textAlign: 'center',
        '&:hover': {
            color: theme.myTheme.antra,
        },
    },
    image: {
        width: 'clamp(6rem, 10vw + 2rem, 32rem)',
        height: 'clamp(6rem, 10vw + 2rem, 32rem)',
        objectFit: 'fill'
    },
}));

const PageNotFound = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box>
                <img src={pageNotFoundPic} alt="Puspalis nerastas ikona" className={classes.image}/>
                <h1 className={classes.header}>Puslapis nerastas!</h1>
                <Link to="/" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Gryžti į pagrindinį puslapį.</Link>
            </Box>
        </Box>
    )
}

export default PageNotFound
