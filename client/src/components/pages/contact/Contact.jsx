import { Box, Breadcrumbs, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import { Link } from 'react-router-dom'; 
import { FaClock, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

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
        [theme.breakpoints.up('xl')]: {
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
        marginBottom: '1.5em',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    header: {
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '1em 0 1em 0',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem',
        },
    },
    header2: {
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva,
        margin: '1em 0',
        padding: '1em 0 1em 0',
        fontSize: '1.2rem',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.62rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    infoSection: {
        marginBottom: '1em',
        '& ul': {
            margin: 0,
            padding: '0 0 0 1.5em',
            color: theme.myTheme.sriftoSpalva,
            fontSize: '1rem',
            [theme.breakpoints.up('xxl')]: {
                fontSize: '1.35rem',
            },
            [theme.breakpoints.up('xxxl')]: {
                fontSize: '2rem',
            },
        },
    },
    infoSection2: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: theme.myTheme.sriftoSpalva,
    },
    infoP: {
        fontSize: '1.2rem',
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.62rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    icon: {
        color: theme.myTheme.sriftoSpalva,
        marginRight: '1em',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(1.35)'
        },
    },
    leftSideBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        [theme.breakpoints.up('md')]: {
            borderRight: '1px solid rgba(204, 204, 204, 0.7)',
            padding: '0 1em 0 0',
        },
    },
    rightSideBox: {
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1em',
        },
    },
    borderBottomBox: {
        width: '100%',
        borderBottom: '1px solid rgba(204, 204, 204, 0.7)',
    },
    OptionTitleHeader: {
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1rem',
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    pastaba: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '4px',
        width: '100%',
        marginBottom: '1em',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            marginBottom: '2em',
        },
    },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: '.5rem 1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.9rem',
            margin: '.75rem 1.5rem',
        },
    },
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    button: {
        width: '100%',
        marginBottom: "2em",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#cc0000',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "2.7em",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "4em",
            borderRadius: '12px',
            height: '4.5rem',
            fontSize: '1.6rem',
        },
    },
}));

const Contact = ({username}) => {

    const classes = useStyles();

    const [mail, setMail] = useState({
        email: '',
        subject: '',
        body: ''
    });

    const handleMailChange = (e, witch) => {
        setMail({
            ...mail,
            [witch]: e.target.value
        });
    }; 

    const sendMail = () => {
        var link = "mailto:info@treklama.lt"
                 + `?cc=${mail.email}`
                 + "&subject=" + encodeURIComponent(mail.subject)
                 + "&body=" + encodeURIComponent(mail.body)
        ;
        window.location.href = link;
    };

    useEffect(() => {
        setMail({
            ...mail,
            email: username
        });
        // eslint-disable-next-line
    }, [username])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Susisiekite | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.body}}> 
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/kontaktai' className={classes.breadcrumbLinkDisabled}>Kontaktai</Link>
                </Breadcrumbs>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box classes={{root: classes.leftSideBox}}>
                            <Box>
                                <Box classes={{root: classes.borderBottomBox}}>
                                    <h1 className={classes.header}>Susisiekite su mumis!</h1>
                                </Box>
                                <Box classes={{root: classes.infoSection}}>
                                    <p className={classes.infoP}>Patariame visais spaudos, foto spaudos,  išorės ir vidaus reklamos gamybos klausimais nuo konsultacijos iki galutinio gaminio.</p>
                                </Box>
                                <Box classes={{root: classes.borderBottomBox}}>
                                    <h1 className={classes.header}>Rekvizitai</h1>
                                </Box>
                                <h2 className={classes.header2}>UAB "TAURO PASLAUGOS"</h2>
                                <Box classes={{root: classes.infoSection}}>
                                    <ul>
                                        <li>Įmonės kodas: 305328121</li>
                                        <li>PVM mokėtojo kodas: LT100012761116</li>
                                        <li>Bankas: LT737300010160772071 </li>
                                        <li>Banko kodas: 73000 </li>
                                        <li>AB „Swedbank“</li>
                                    </ul>
                                </Box>
                                <Box classes={{root: classes.infoSection2}}>
                                <FaClock size={25} className={classes.icon} />
                                    <p className={classes.infoP}> I-V 8<sup>00</sup>-18<sup>00</sup></p>
                                </Box>
                                <Box classes={{root: classes.infoSection2}}>
                                    <FaPhoneAlt 
                                        size={25} 
                                        className={classes.icon} 
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => window.location.href = 'tel:+37064768839'}
                                    />
                                    <p className={classes.infoP}> +370 647 68839</p>
                                </Box>
                                <Box classes={{root: classes.infoSection2}}>
                                    <FaEnvelope 
                                        size={25} 
                                        className={classes.icon} 
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => window.location.href = "mailto:info@treklama.lt"}
                                    />
                                    <p className={classes.infoP}> info@treklama.lt</p>
                                </Box>
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box classes={{root: classes.rightSideBox}}>
                            <h2 className={classes.OptionTitleHeader}>Jūsų el. paštas</h2>
                            <TextField 
                                id="pastaba" 
                                variant="outlined" 
                                classes={{root: classes.pastaba}}
                                placeholder='El. paštas'
                                value={mail.email}
                                onChange={(e) => handleMailChange(e, 'email')}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                            />
                            <h2 className={classes.OptionTitleHeader}>Tema</h2>
                            <TextField 
                                id="pastaba" 
                                variant="outlined" 
                                classes={{root: classes.pastaba}}
                                placeholder='Tema'
                                value={mail.subject}
                                onChange={(e) => handleMailChange(e, 'subject')}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                            />
                            <h2 className={classes.OptionTitleHeader}>Pranešimas</h2>
                            <TextField 
                                id="pastaba" 
                                variant="outlined" 
                                classes={{root: classes.pastaba}}
                                multiline
                                rows={6}
                                placeholder='Pranešimas'
                                value={mail.body}
                                onChange={(e) => handleMailChange(e, 'body')}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                            />
                            <Button variant="contained" color="primary" component="span" classes={{root: classes.button}} onClick={sendMail}>
                               Siųsti
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Contact
