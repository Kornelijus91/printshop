import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs } from '@material-ui/core';
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
                <title>Mok??jimo b??dai | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/klubas' className={classes.breadcrumbLinkDisabled}>Mok??jimo b??dai</Link>
                </Breadcrumbs>
                <h1>Mok??jimo b??dai</h1>

                <h2>Mok??kite grynaisiais pinigais atsi??mimo metu!</h2>
                <p>J??s?? patogumui si??lome atsiskaityti u?? prekes grynaisiais pinigais. Pasirink?? ???? mok??jimo b??d??, atsiskaityti gal??site kurjeriui preki?? pristatymo metu.</p>
                <p>D??mesio! Preki?? pristatymo ?? namus metu tur??kite tiksli?? gryn??j?? pinig?? sum??, nurodyt?? J??s?? u??sakyme.</p>

                <h2>Mok??kite mok??jimo kortele!</h2>
                <p>J??s?? patogumui si??lome atsiskaityti u?? prekes mok??jimo kortele.</p>
                <p><b>SVARBU!</b> Atsiskaitymai kortele vykdomi tik jei J??s?? kortel?? i??dav??s bankas dalyvauja saugi?? atsiskaitym?? internetu programose (MasterCard SecureCode arba Verified by Visa). Suvedus kortel??s duomenis J??s galite b??ti nukreiptas ?? J??s?? kortel?? i??davusio banko puslap?? saugos kodo suvedimui, kuris reikalingas J??s?? tapatyb??s patvirtinimui.  Jei mok??jimas nebus patvirtintas, pra??ome kreiptis ?? J??s?? kortel?? i??davus?? bank?? arba pasirinkti kit?? mok??jimo b??d??.</p>
                
                <h2>Mok??kite per elektronin?? bankininkyst??!</h2>
                <p>Atsiskaityti galima naudojantis elektronine bankininkyste arba per Paysera mok??jim?? sistem??.</p>
                <p><b>Kaip apmok??ti u??sakym?? naudojantis elektronine bankininkyste?</b></p>
                <p>1. U??pildykite u??sakym?? ir u??sakymo ??ingsnyje ???Mok??jimo b??das??? pasirinkite savo bank??.</p>
                <p>2. treklama.lt nukreips Jus ?? banko puslap?? ir perduos elektronin??s bankininkyst??s sistemai duomenis apie sum??, kuri?? reikia apmok??ti.</p>
                <p>3. Elektronin??s bankininkyst??s puslapyje prisijunkite ??prastu b??du ir sistema jau bus Jums suformavusi mok??jim?? u?? i??sirinktas prekes. Beliks tik patvirtinti mok??jim??.</p>
                <p>4. Patvirtinus mok??jim??, elektronin??s bankininkyst??s puslapis u??sidarys, o J??s v??l sugr????ite ?? treklama.lt. Prisijungimo prie elektronin??s bankininkyst??s duomenys naudojami tik prisijungimui prie banko puslapio, o gr????tant ?? internetin?? parduotuv?? treklama.lt neperduodami.</p>
            </Box>
        </Box>
    )
}

export default Apmokejimas
