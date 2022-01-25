import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs, Grid } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000'
    },
    body: {
        width: '94%',
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        paddingBottom: '2rem',
        overflowWrap: 'break-word',
        "& p": {
            margin: '0 0 .5rem 0',
            padding: 0,
            fontSize: '1rem',
        },
        "& h1": {
            margin: '1rem 0 1rem 0',
            padding: 0,
            fontSize: '1.7rem',
        },
        "& h2": {
            margin: '1rem 0 1rem 0',
            padding: 0,
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
        [theme.breakpoints.up('xxl')]: {
            "& p": {
                margin: '0 0 .7rem 0',
                padding: 0,
                fontSize: '1.5rem',
            },
            "& h1": {
                margin: '1.5rem 0 1.5rem 0',
                padding: 0,
                fontSize: '2.55rem',
            },
            "& h2": {
                margin: '1rem 0 1rem 0',
                padding: 0,
                fontSize: '1.88rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            "& p": {
                margin: '0 0 1rem 0',
                padding: 0,
                fontSize: '2rem',
            },
            "& h1": {
                margin: '2rem 0 2rem 0',
                padding: 0,
                fontSize: '3.4rem',
            },
            "& h2": {
                margin: '1rem 0 1rem 0',
                padding: 0,
                fontSize: '2.4rem',
            },
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breakcrumbs: {
        margin: '.5rem 0 0 0',
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
            fontSize: '1.8rem',
        },
    },
    option: {
        objectFit: 'contain',
        padding: '2%',
        // margin: '.5% 2.5%',
    },
}));

const Apmokejimas = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Mokėjimo būdai | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/klubas' className={classes.breadcrumbLinkDisabled}>Mokėjimo būdai</Link>
                </Breadcrumbs>
                <h1>Mokėjimo būdai</h1>

                <h2>Mokėkite grynaisiais pinigais atsiėmimo metu!</h2>
                <p>Jūsų patogumui siūlome atsiskaityti už prekes grynaisiais pinigais. Pasirinkę šį mokėjimo būdą, atsiskaityti galėsite kurjeriui prekių pristatymo metu.</p>
                <p>Dėmesio! Prekių pristatymo į namus metu turėkite tikslią grynųjų pinigų sumą, nurodytą Jūsų užsakyme.</p>

                <h2>Mokėkite mokėjimo kortele!</h2>
                <p>Jūsų patogumui siūlome atsiskaityti už prekes mokėjimo kortele.</p>
                <p><b>SVARBU!</b> Atsiskaitymai kortele vykdomi tik jei Jūsų kortelę išdavęs bankas dalyvauja saugių atsiskaitymų internetu programose (MasterCard SecureCode arba Verified by Visa). Suvedus kortelės duomenis Jūs galite būti nukreiptas į Jūsų kortelę išdavusio banko puslapį saugos kodo suvedimui, kuris reikalingas Jūsų tapatybės patvirtinimui.  Jei mokėjimas nebus patvirtintas, prašome kreiptis į Jūsų kortelę išdavusį banką arba pasirinkti kitą mokėjimo būdą.</p>
                
                <h2>Mokėkite per elektroninę bankininkystę!</h2>
                <p>Atsiskaityti galima naudojantis elektronine bankininkyste arba per Paysera mokėjimų sistemą.</p>
                <p><b>Kaip apmokėti užsakymą naudojantis elektronine bankininkyste?</b></p>
                <p>1. Užpildykite užsakymą ir užsakymo žingsnyje „Mokėjimo būdas“ pasirinkite savo banką.</p>
                <p>2. treklama.lt nukreips Jus į banko puslapį ir perduos elektroninės bankininkystės sistemai duomenis apie sumą, kurią reikia apmokėti.</p>
                <p>3. Elektroninės bankininkystės puslapyje prisijunkite įprastu būdu ir sistema jau bus Jums suformavusi mokėjimą už išsirinktas prekes. Beliks tik patvirtinti mokėjimą.</p>
                <p>4. Patvirtinus mokėjimą, elektroninės bankininkystės puslapis užsidarys, o Jūs vėl sugrįšite į treklama.lt. Prisijungimo prie elektroninės bankininkystės duomenys naudojami tik prisijungimui prie banko puslapio, o grįžtant į internetinę parduotuvę treklama.lt neperduodami.</p>
            </Box>
        </Box>
    )
}

export default Apmokejimas
