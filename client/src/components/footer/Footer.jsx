import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ReactComponent as LinkedInLogo } from '../../media/social/LinkedInLogoNoColor.svg';
import { ReactComponent as EtsyLogo } from '../../media/social/Etsy_logo.svg';
import TreklamaLogoWhite from '../../media/logo.webp'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        fontSize: theme.myTheme.sizeM,
        minHeight: '20em',
        margin: '0',
        padding: '0',
        backgroundColor: theme.myTheme.juoda,
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: "flex-start",
    },
    body:{
        width: '100%',
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('md')]: {
            padding: '0 5em'
        }, 
        [theme.breakpoints.up('lg')]: {
            padding: '0 1em'
        }, 
        [theme.breakpoints.up('xl')]: {
            width: '80%',
        }, 
    },
    section: {
        margin: '0',
        padding: '2em 1em',
    },
    text: {
        fontSize: theme.myTheme.sizeMM,
        margin: '1.5em 0',
        padding: '0',
        fontWeight: 'bold',
    },
    link: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        padding: '0',
        textDecoration: 'none',
        fontSize: theme.myTheme.sizeM,
        textAlign: 'center',
        transition:'color .2s ease', 
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            transition:'color .2s ease', 
        },
    },
    textt: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        padding: 0,
        margin: 0,
        fontSize: theme.myTheme.sizeM,
        textAlign: 'left',
    },
    linkBox: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        padding: '0',
    },
    facebook: {
        fontSize: theme.myTheme.sizeXXL,
        color: theme.myTheme.balta,
        fontFamily: "'Titillium Web', sans-serif",
        padding: '0',
        textDecoration: 'none',
        textAlign: 'center',
        transition:'color .2s ease', 
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            transition:'color .2s ease', 
        },
    },
    etsy: {
        fontSize: theme.myTheme.sizeM,
        height: '1.8em',
        margin: '-.3em 0 .2em -.1em',
        fill: theme.myTheme.balta,
        transition:'fill .2s ease', 
        '&:hover': {
            fill: theme.myTheme.sZalia.main,
            transition:'fill .2s ease', 
        },
    },
    linkedIn: {
        fontSize: theme.myTheme.sizeM,
        height: '1.6em',
        margin: '-1.5em 0 0 .1em',
        fill: theme.myTheme.balta,
        transition:'fill .2s ease', 
        '&:hover': {
            fill: theme.myTheme.sZalia.main,
            transition:'fill .2s ease', 
        },
    },
    imageBox: {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: "flex-start",
        width: '100%',
        objectFit: 'contain',

    },
    imagePlaceHolder: {
        maxHeight: '2em',
        maxWidth: '10em',
        margin: '1.5em 0 2em 0',
        [theme.breakpoints.up('md')]: {
            maxWidth: '20em',
        },
    },
    footerBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 1em',
        [theme.breakpoints.up('lg')]: {
            padding: 0,
        },
        '& p': {
            margin: '.5em 0',
            padding: 0
        },
        '& a': {
            margin: '.5em 0',
            padding: 0,
            color: theme.myTheme.balta,
        }
    },
    footerhr: {
        height: '.1em',
        width: '100%',
        backgroundColor: theme.myTheme.sZalia.main,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
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
                                <Link to="/mokejimobudai" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Mokėjimo būdai</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <h3 className={classes.text}>Sekite mus</h3>
                            <Box className={classes.linkBox}>
                                <a href="https://www.facebook.com/TauroReklama" className={classes.facebook} target="_blank" rel="noreferrer">facebook</a>
                            </Box>
                            <Box className={classes.linkBox}>
                                <a href="https://www.etsy.com/shop/25page" className={classes.link} target="_blank" rel="noreferrer"><EtsyLogo className={classes.etsy}/></a>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <a href="https://www.linkedin.com/company/tavoreklama" className={classes.link} target="_blank" rel="noreferrer"><LinkedInLogo className={classes.linkedIn}/></a>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.section}}>
                            <Box classes={{root: classes.imageBox}}>
                                <img className={classes.imagePlaceHolder} src={TreklamaLogoWhite} alt="" />
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>UAB “TAURO PASLAUGOS”</p>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>Įmonės kodas: 305328121</p>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>PVM mokėtojo kodas: LT100012761116</p>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>Bankas: LT737300010160772071</p>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>Banko kodas: 73000</p>
                            </Box>
                            <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>AB „Swedbank“</p>
                            </Box>
                            {/* <Box className={classes.linkBox} display='flex' justifyContent='flex-start'>
                                <p className={classes.textt}>Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r.</p>
                            </Box> */}
                        </Box>
                    </Grid>
                </Grid>
                {/* <hr className={classes.footerhr}/> */}
                <div className={classes.footerhr}/>
                <Box classes={{root: classes.footerBottom}}>
                    <p>{new Date().getFullYear()} &copy; treklama.lt</p>
                    <p>IT partneris - <a href='https://www.linkedin.com/in/kornelijus-šaulys-732418212' target="_blank" rel="noreferrer" >Kornelijus Šaulys</a></p>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
