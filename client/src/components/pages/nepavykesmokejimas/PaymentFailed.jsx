import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pageNotFoundPic from '../../../media/error.png';

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
        fontSize: 'clamp(0.88rem, 0.80rem + 0.40vw, 1.76rem)',
        textAlign: 'center',
        padding: '2rem',
        color: theme.myTheme.sriftoSpalva,
    },
    body: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
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

const PaymentFailed = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.body}}>
                <img src={pageNotFoundPic} alt="Puspalis nerastas ikona" className={classes.image}/>
                <h1>Apmokėjimo klaida! Užsakymą apmokėti vis dar galite prisijungę ir nuėję į savo <Link to="/" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>užsakymų</Link> puslapį.</h1>
            </Box>
        </Box>
    )
}

export default PaymentFailed
