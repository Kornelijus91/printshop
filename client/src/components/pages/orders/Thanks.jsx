import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import signboard from '../../../media/signboard.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

const Thanks = ({ pasirinktasPristatymoBudas }) => {
    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <img src={signboard} alt="Aciu paveikslelis" className={classes.image}/>
            {pasirinktasPristatymoBudas === 'cash' ? 
                <h3>Ačiū, kad naudojatės mūsų paslaugomis! Jūsų užsakymą pradėsime ruošti netrukus.</h3>
            :
                <h3>Ačiū, kad naudojatės mūsų paslaugomis! Jūsų užsakymą pradėsime ruošti iš karto kai gausime apmokėjimą.</h3>
            }
            <Link to="/" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Gryžti į pagrindinį puslapį.</Link>
        </Box>
    )
}

export default Thanks
