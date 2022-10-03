import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pageNotFoundPic from '../../../media/page-not-found.png';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        // minHeight: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'center',
        padding: '2em',
        color: theme.myTheme.juoda,
    },
    link: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        padding: '0',
        // textDecoration: 'none',
        textAlign: 'center',
        '&:hover': {
            color: '#457B9D',
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
