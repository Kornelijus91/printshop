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
                <title>Gr????inimas | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/grazinimas' className={classes.breadcrumbLinkDisabled}>Gra??inimas</Link>
                </Breadcrumbs>
                <h1>Gr????inimas</h1>
                <p><b>Kokybi??kos prek??s yra nekei??iamos ir negr????inamos ir Pirk??jo sumok??ti pinigai u?? juos negr????inami.</b></p>
                <p><b>Brokuotos arba nepilnos komplektacijos prek??s</b></p>
                <p>1.??Pirk??jas, norintis pateikti skund?? d??l brokuotos ar nepilnos komplektacijos prek??s, tai padaryti gali elektroniniu pa??tu??info@treklama.lt.</p>
                <p>2.??Teikdamas skund?? pirk??jas turi nurodyti toki?? informacij??:</p>
                <p>2.1. Prek??s u??sakymo numer??;</p>
                <p>2.2.??Pateikti/??vardyti Prek??s broko po??ymius ar tr??kstamas dalis;</p>
                <p>2.3.??Pateikti kitus ??rodymus (pavyzd??iui, Prek??s nuotrauk??, brokuotos vietos nuotrauk?? (jei tai mechaninis pa??eidimas ir ??manoma nufotografuoti), Prek??s pakuot??s nuotrauk??, kita.</p>
                <p>3.??Teikdamas skund?? pirk??jas turi nurodyti, kaip pageidauja, kad b??t?? i??spr??sta pretenzija:</p>
                <p>3.1.??Brokuot?? prek?? pra??oma pakeista kokybi??ka preke;</p>
                <p>3.2.??Ne pilnos komplektacijos prek?? pra??oma papildyti tr??kstamomis komplektuojan??iomis dalimis;</p>
                <p>3.3.??Pra??oma Prekei pritaikyti nuolaid??, t. y. atitinkamai suma??inti Prek??s kain??;</p>
                <p>3.4.??Pra??oma gr????inti sumok??tus pinigus.</p>
                <p>4. I??nagrin??jus pretenzij??, atsakymas pateikiamas per 5 (penkias) dienas. Pinig?? gr????inimo atveju, Pardav??jas Pirk??jui gr????ina pinigus u?? Prek??. </p>
                <p><b>Pa??eista siunta</b></p>
                <p>1.???? namus pristatytos siuntos kokyb?? tikrinkite dalyvaujant kurjeriui. Jei pasteb??jote, kad ji turi pa??eidim??:</p>
                <p>1.1. apie tai pasakykite prekes atve??usiam kurjeriui;</p>
                <p>1.2.??siuntos pristatymo dokumente pa??ym??kite, kad pakuot?? turi pa??eidim?? ir kartu su kurjeriu u??pildykite Pakuot??s pa??eidim?? (patikrinimo) akt??;</p>
                <p>1.3.??patikrinkite pakuo??i?? viduje esan??ias prekes ir, jei jos pa??eistos, pa??eidimus u??fiksuokite nuotraukose. Nuotraukos bus reikalingos preki?? gr????inimo proced??rai;</p>
                <p>1.4.??jei pakuot?? nepa??eista, dalyvaujant kurjeriui preki?? tikrinti nereikia. Jei priimate siunt?? ir pasira??ote dokumentus, laikoma, kad siunta pristatyta tvarkingai.</p>
            </Box>
        </Box>
    )
}

export default Grazinimas
