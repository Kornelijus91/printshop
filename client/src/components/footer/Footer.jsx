import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ReactComponent as LinkedInLogo } from '../../media/social/LinkedInLogoNoColor.svg';
import { ReactComponent as EtsyLogo } from '../../media/social/Etsy_logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '20rem',
        margin: '0',
        padding: '0',
        backgroundColor: theme.myTheme.sriftoSpalva,
        fontSize: '.9rem',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: "flex-start",
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    body:{
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            padding: '0 1em'
        }, 
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        }, 
    },
    section: {
        // width: '15rem',
        margin: '0',
        padding: '.5rem 1rem',
        // minWidth: '12rem',
        [theme.breakpoints.up('lg')]: {
            padding: '0',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0',
        },
    },
    text: {
        margin: '1.5rem 0 2rem 0',
        padding: '0',
        fontWeight: 'bold',
    },
    link: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        padding: '0',
        textDecoration: 'none',
        fontSize: '.9rem',
        textAlign: 'center',
        '&:hover': {
            color: theme.myTheme.ketvirta,
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    linkBox: {
        marginBottom: '1rem',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
        },
    },
    facebook: {
        color: theme.myTheme.trecia,
        fontFamily: "'Titillium Web', sans-serif",
        padding: '0',
        margin: '-1.5rem 0 -1rem 0',
        textDecoration: 'none',
        fontSize: '1.6rem',
        textAlign: 'center',
        '&:hover': {
            color: theme.myTheme.ketvirta,
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.4rem',
            margin: '-1.5rem 0 -1.5rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem',
            margin: '-1.5rem 0 -2rem 0',
        },
    },
    etsy: {
        height: '1.8rem',
        margin: '-.3rem 0 .2rem -.1rem',
        fill: theme.myTheme.trecia,
        '&:hover': {
            fill: theme.myTheme.ketvirta,
        },
        [theme.breakpoints.up('xxl')]: {
            height: '2.7rem',
            margin: '-.3rem 0 .2rem -.15rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '3.6rem',
            margin: '-.3rem 0 .2rem -.2rem',
        },
    },
    linkedIn: {
        height: '1.6rem',
        margin: '-1.5rem 0 0 .1rem',
        fill: theme.myTheme.trecia,
        '&:hover': {
            fill: theme.myTheme.ketvirta,
        },
        [theme.breakpoints.up('xxl')]: {
            height: '2.4rem',
            margin: '-1.5rem 0 0 .15rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '3.2rem',
            margin: '-1.5rem 0 0 .2rem',
        },
    },
    
}));

const Footer = ({setModalOpen, setmodalView, loggedIn}) => {

    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        setmodalView(e.target.getAttribute("langas"));
        setModalOpen(true);
    };

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.body}}>
                <Grid container>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <h3 className={classes.text}>Informacija</h3>
                            <Box className={classes.linkBox}>
                                <Link to="/contact" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Kontaktai</Link>
                            </Box>
                            <Box className={classes.linkBox}>
                                <Link to="/pirkimotaisykles" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Pirkimo taisyklės</Link>
                            </Box>
                            <Box className={classes.linkBox}>
                                <Link to="/grazinimas" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Grąžinimo taisyklės</Link>
                            </Box>
                            <Box className={classes.linkBox}>
                                <Link to="/pristatymas" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Pristatymas</Link>
                            </Box>
                            <Box className={classes.linkBox}>
                                <Link to="/privatumopolitika" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Privatumo politika</Link>
                            </Box>
                            {/* <Box className={classes.linkBox}>
                                <Link to="/termsofservice" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Taisyklės</Link>
                            </Box> */}
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <h3 className={classes.text}>Paskyra</h3>
                            {loggedIn ?
                                <>
                                    <Box className={classes.linkBox}>
                                        <Link to="/profile" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Profilis</Link>
                                    </Box>
                                    <Box className={classes.linkBox}>
                                        <Link to="/addresses" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Adresai</Link>
                                    </Box>
                                    <Box className={classes.linkBox}>
                                        <Link to="/orders" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Užsakymai</Link>
                                    </Box>
                                </>
                            :
                                <>
                                    <Box className={classes.linkBox}>
                                        <Link to="/" className={classes.link} langas='Prisijungti' onClick={(e) => {handleClick(e)}}>Prisijungti</Link>
                                    </Box>
                                    <Box className={classes.linkBox}>
                                        <Link to="/" className={classes.link} langas='Registruotis' onClick={(e) => {handleClick(e)}}>Registruotis</Link>
                                    </Box>
                                </>
                            }
                            <Box className={classes.linkBox}>
                                <Link to="/cart" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Krepšelis</Link>
                            </Box>
                            <Box className={classes.linkBox}>
                                <Link to="/" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Apmokėjimas</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <h3 className={classes.text} style={{marginBottom: '1.5rem'}}>Sekite mus</h3>
                            <Box className={classes.linkBox}>
                                <a href="/" className={classes.facebook} target="_blank">facebook</a>
                            </Box>
                            <Box className={classes.linkBox}>
                                <a href="/" className={classes.link} target="_blank"><EtsyLogo className={classes.etsy}/></a>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <a href="/" className={classes.link} target="_blank"><LinkedInLogo className={classes.linkedIn}/></a>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <h3 className={classes.text}>Įmonės rekvizitai</h3>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Footer
