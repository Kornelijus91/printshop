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

const Grazinimas = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Grąžinimas | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/grazinimas' className={classes.breadcrumbLinkDisabled}>Gražinimas</Link>
                </Breadcrumbs>
                <h1>Grąžinimas</h1>
                <p><b>Kokybiškos prekės yra nekeičiamos ir negrąžinamos ir Pirkėjo sumokėti pinigai už juos negrąžinami.</b></p>
                <p><b>Brokuotos arba nepilnos komplektacijos prekės</b></p>
                <p>1. Pirkėjas, norintis pateikti skundą dėl brokuotos ar nepilnos komplektacijos prekės, tai padaryti gali elektroniniu paštu info@treklama.lt.</p>
                <p>2. Teikdamas skundą pirkėjas turi nurodyti tokią informaciją:</p>
                <p>2.1. Prekės užsakymo numerį;</p>
                <p>2.2. Pateikti/įvardyti Prekės broko požymius ar trūkstamas dalis;</p>
                <p>2.3. Pateikti kitus įrodymus (pavyzdžiui, Prekės nuotrauką, brokuotos vietos nuotrauką (jei tai mechaninis pažeidimas ir įmanoma nufotografuoti), Prekės pakuotės nuotrauką, kita.</p>
                <p>3. Teikdamas skundą pirkėjas turi nurodyti, kaip pageidauja, kad būtų išspręsta pretenzija:</p>
                <p>3.1. Brokuotą prekę prašoma pakeista kokybiška preke;</p>
                <p>3.2. Ne pilnos komplektacijos prekę prašoma papildyti trūkstamomis komplektuojančiomis dalimis;</p>
                <p>3.3. Prašoma Prekei pritaikyti nuolaidą, t. y. atitinkamai sumažinti Prekės kainą;</p>
                <p>3.4. Prašoma grąžinti sumokėtus pinigus.</p>
                <p>4. Išnagrinėjus pretenziją, atsakymas pateikiamas per 5 (penkias) dienas. Pinigų grąžinimo atveju, Pardavėjas Pirkėjui grąžina pinigus už Prekę. </p>
                <p><b>Pažeista siunta</b></p>
                <p>1. Į namus pristatytos siuntos kokybę tikrinkite dalyvaujant kurjeriui. Jei pastebėjote, kad ji turi pažeidimų:</p>
                <p>1.1. apie tai pasakykite prekes atvežusiam kurjeriui;</p>
                <p>1.2. siuntos pristatymo dokumente pažymėkite, kad pakuotė turi pažeidimų ir kartu su kurjeriu užpildykite Pakuotės pažeidimų (patikrinimo) aktą;</p>
                <p>1.3. patikrinkite pakuočių viduje esančias prekes ir, jei jos pažeistos, pažeidimus užfiksuokite nuotraukose. Nuotraukos bus reikalingos prekių grąžinimo procedūrai;</p>
                <p>1.4. jei pakuotė nepažeista, dalyvaujant kurjeriui prekių tikrinti nereikia. Jei priimate siuntą ir pasirašote dokumentus, laikoma, kad siunta pristatyta tvarkingai.</p>
            </Box>
        </Box>
    )
}

export default Grazinimas
