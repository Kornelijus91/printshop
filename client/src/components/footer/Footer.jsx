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
    },
    section: {
        // width: '15rem',
        margin: '0',
        padding: '0 0 0 .8rem',
        minWidth: '12rem',
        [theme.breakpoints.down('sm')]: {
            minWidth: '9rem'
        },
    },
    text: {
        margin: '1.5rem 0 2rem 0',
        padding: '0',
        fontWeight: 'bold',
    },
    sectionOutter: {
        margin: '0',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "flex-start",
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: "flex-start",
            margin: '0 1rem 0 0',
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "flex-start",
            margin: '0 1rem 0 0',
        },
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
    },
    // link2:{
    //     color: theme.myTheme.trecia,
    //     fontFamily: theme.myTheme.sriftas,
    //     padding: '0 0 0 1rem',
    //     textDecoration: 'none',
        
    //     textAlign: 'center',
    //     '&:hover': {
    //         color: theme.myTheme.ketvirta,
    //     },
    // },
    linkBox: {
        marginBottom: '1rem',
        padding: '0',
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
    },
    etsy: {
        height: '1.8rem',
        margin: '-.3rem 0 .2rem -.1rem',
        fill: theme.myTheme.trecia,
        '&:hover': {
            fill: theme.myTheme.ketvirta,
        },
    },
    linkedIn: {
        height: '1.6rem',
        margin: '-1.5rem 0 0 .1rem',
        fill: theme.myTheme.trecia,
        '&:hover': {
            fill: theme.myTheme.ketvirta,
        },
    },
    
}));

const Footer = ({setModalOpen, setmodalView}) => {

    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        setmodalView(e.target.getAttribute("langas"));
        setModalOpen(true);
    };

    return (
        <Box maxWidth='xl' classes={{root: classes.root}}>
            <Grid container display='flex' justifyContent='center' alignItems="flex-start" >
                <Grid item xl={2} xs={5} md={3} sm={5} lg={2}>
                    <Box classes={{root: classes.sectionOutter}}>
                        <Box display='flex' justifyContent='center'>
                            <Box classes={{root: classes.section}}>
                                <h3 className={classes.text}>Informacija</h3>
                                <Box className={classes.linkBox}>
                                    <Link to="/contact" className={classes.link}>Kontaktai</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link} >Pirkimo taisyklės</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link} >Grąžinimo taisyklės</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link}>Pristatymo sąlygos</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/privacypolicy" className={classes.link} >Privatumo politika</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/termsofservice" className={classes.link} >Taisyklės</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xl={2} xs={5} md={3} sm={5} lg={2}>
                    <Box classes={{root: classes.sectionOutter}}>
                        <Box display='flex' justifyContent='center'>
                            <Box classes={{root: classes.section}}>
                                <h3 className={classes.text}>Paskyra</h3>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link} langas='Prisijungti' onClick={(e) => {handleClick(e)}}>Prisijungti</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link} langas='Registruotis' onClick={(e) => {handleClick(e)}}>Registruotis</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link}>Krepšelis</Link>
                                </Box>
                                <Box className={classes.linkBox}>
                                    <Link to="/" className={classes.link}>Apmokėjimas</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xl={2} xs={5} md={3} sm={5} lg={2}>
                    <Box classes={{root: classes.sectionOutter}}>
                        <Box display='flex' justifyContent='center'>
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
                        </Box>
                    </Box>
                </Grid>
                <Grid item xl={2} xs={5} md={3} sm={5} lg={2}>
                    <Box classes={{root: classes.sectionOutter}}>
                        <Box display='flex' justifyContent='center'>
                            <Box classes={{root: classes.section}}>
                                <h3 className={classes.text}>Įmonės rekvizitai</h3>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer
