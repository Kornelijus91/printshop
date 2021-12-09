import { Box, Breadcrumbs, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        backgroundColor: theme.myTheme.trecia,
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
    },
    body: {
        fontFamily: theme.myTheme.sriftas,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60%',
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
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    header: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '1rem 0 1rem 0',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 1rem 0',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem',
        },
    },
    infoSection: {
        marginBottom: '1em' 
    },
    infoP: {
        fontSize: '1.2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.62rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
}));

const Contact = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Susisiekite | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.body}}> 
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/contact' className={classes.breadcrumbLinkDisabled}>Kontaktai</Link>
                </Breadcrumbs>
                <h1 className={classes.header}>Susisiekite</h1>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box classes={{root: classes.infoSection}}>
                            <p className={classes.infoP}>Darbo laikas: <b>I-V 9<sup>00</sup>-20<sup>00</sup></b></p>
                        </Box>
                        <Box classes={{root: classes.infoSection}}>
                            <p className={classes.infoP}>Telefono Nr.: <b>+370 647 68839</b></p>
                        </Box>
                        <Box classes={{root: classes.infoSection}}>
                            <p className={classes.infoP}>Elektroninis paštas: <b>info@treklama.lt</b></p>
                        </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Contact
