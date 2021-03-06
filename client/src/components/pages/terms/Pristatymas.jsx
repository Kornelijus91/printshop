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
}));

const Pristatymas = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Pristatymas | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/pristatymas' className={classes.breadcrumbLinkDisabled}>Pristatymas</Link>
                </Breadcrumbs>
                <h1>Preki?? pristatymas ?? namus</h1>
                <p>Preki?? pristatymu ?? namus r??pinasi m??s?? partneriai kurjeri?? tarnyb?? Venipak i??skyrus Kur??i?? Nerij??, kur prek??s pristatomos per Omniv?? pa??tomatus.</p>
                <p>Jei pasirinkote preki?? pristatym?? ?? namus, jos bus pristatytos per termin??, nurodyt?? prie pasirinktos prek??s.</p>
                <p>Kurjeriai prekes pristato pagal i?? anksto numatyt?? mar??rut??, tod??l galimyb??s pasirinkti tiksl?? pristatymo laik?? n??ra.</p>
                <p>Did??iuosiuose miestuose (Vilniuje, Kaune, Klaip??doje, Alytuje, Marijampol??je, ??iauliuose, Panev????yje, Taurag??je, Tel??iuose, Utenoje bei j?? rajonuose) prek??s pristatomos darbo dienomis??<b>8???22 val.</b>, kitur Lietuvoje??<b>8???18 val.</b></p>
                <h1>Preki?? pristatymas ?? siunt?? ta??kus ir pa??tomatus</h1>
                <p>Jei pasirinkote preki?? pristatym?? ?? LP Express, Omniva, DPD, Venipak pa??tomatus, jos bus pristatytos per termin??, nurodyt?? prie pasirinktos prek??s.</p>
                <h1>Preki?? pristatymas autobusu</h1>
                <p>Jei pasirinkote preki?? autobusu, jos bus pristatytos ?? siuntos autobusais terminalus per termin??, nurodyt?? prie pasirinktos prek??s.</p>
                <p><b>Svarbu.</b> ??sitikinkite ar J??s?? mieste yra veikiantis siuntos autobusais terminalas. Jei jo n??ra prekes teks atsiimti konkre??iu laiku tiesiogiai i?? autobuso vairuotojo.</p>
            </Box>
        </Box>
    )
}

export default Pristatymas
