import { Box, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import { FaClock, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    body: {
        fontFamily: theme.myTheme.sriftas,
        width: '100%',
        [theme.breakpoints.up('xl')]: {
            width: '80%',
        },
    },
    header: {
        fontSize: theme.myTheme.sizeXL,
        textAlign: 'left',
        color: theme.myTheme.juoda,
        margin: '0',
        padding: '1em 0 1em 0',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 0',
        },
    },
    header2: {
        fontSize: theme.myTheme.sizeMM,
        textAlign: 'left',
        color: theme.myTheme.juoda,
        margin: '1em 0',
        padding: '1em 0 1em 0',
        [theme.breakpoints.up('md')]: {
            padding: '0',
        },
    },
    infoSection: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        '& ul': {
            margin: 0,
            padding: '0 0 0 1.5em',
            color: theme.myTheme.juoda,
            fontSize: theme.myTheme.sizeM,
        },
    },
    infoSection2: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: theme.myTheme.juoda,
    },
    infoP: {
        fontSize: theme.myTheme.sizeMM,
        color: theme.myTheme.juoda,
    },
    icon: {
        color: theme.myTheme.juoda,
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
            padding: '0 1em 0 0',
        },
    },
    rightSideBox: {
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1em',
        },
    },
    borderBottomBox: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        borderBottom: `.15em solid ${theme.myTheme.tZalia.main}`,
    },
    OptionTitleHeader: {
        fontSize: theme.myTheme.sizeMM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    pastaba: {
        border: `1px solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        marginBottom: '1em',
    },
    cssOutlinedInput: theme.myTheme.cssOutlinedInput,
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    button: theme.myTheme.button,
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
                <Breadcurmbs routes={[{path: 'kontaktai', name: 'Kontaktai'}]}/>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box classes={{root: classes.leftSideBox}}>
                            <Box>
                                <Box classes={{root: classes.borderBottomBox}}>
                                    <h1 className={classes.header}>Susisiekite su mumis!</h1>
                                </Box>
                                <Box classes={{root: classes.infoSection}}>
                                    <p className={classes.infoP}>
                                        Tavo reklama tai tavo asmeninė spaustuvė elektroninėje erdvėje. Mūsų komanda pakonsultuos ir atsakys Jums į visus rūpimus klausimus. Prašome susisiekite nurodytais kontaktais arba užpildykite užklausos formą.  
                                    </p>
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
    )
}

export default Contact
