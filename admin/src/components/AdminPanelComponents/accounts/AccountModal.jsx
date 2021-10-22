import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Box, Modal, Backdrop, Fade, Grid, Radio, RadioGroup, FormControlLabel, FormControl, Button, CircularProgress, Tab, Tabs } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { VscClose } from "react-icons/vsc";
import UserOrders from './UserOrders';
import UserPayments from './UserPayments'
import UserAddresses from './UserAddresses'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        border: `1px solid ${theme.myTheme.antra}`,
        borderRadius: '7px',
        padding: '1rem',
        position: "absolute",  
        top: "2%",
        maxWidth: '99%',
        [theme.breakpoints.up('sm')]: {
            maxHeight: '99%',
            maxWidth: '99%',
            overflowY: 'auto',
            overflowX: 'hidden',
        },
        [theme.breakpoints.up('md')]: {
            maxHeight: '100%',
            maxWidth: '99%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '300rem',
        },
    },
    item: {
        color: theme.myTheme.trecia,
        margin: '0 2rem 1rem 0',
        minWidth: '20rem',
        fontFamily: theme.myTheme.sriftas,
    },
    itemRadio: {
        color: theme.myTheme.trecia,
        margin: '0 2rem 1rem 0',
        minWidth: '20rem',
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    closeIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            cursor: "pointer",
            color: '#bce9af',
        },
    },
    radioButtons: {
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            margin: '.2rem 0 0 1rem',
        },
    },
    button: {
        width: '10rem',
        height: '2.5rem',
        fontWeight: 'bold',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
    },
    buttonDisabled: {
        backGroundColor: theme.myTheme.ketvirta,
    },
    tab: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas
    },
    tabsBox: {
        borderBottom: `2px solid ${theme.myTheme.pirma}`
    },
    paragraph: {
        padding: '0',
        maxWidth: '10rem',
        overflowWrap: 'break-word',
        margin: '.2rem 0 1rem 0',
        [theme.breakpoints.up('sm')]: {
            margin: '.8rem 0 0 0',
            maxWidth: '7rem',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '100%',
            margin: '.8rem 0 0 0',
        },
    },
    paragraphRadio: {
        padding: '0',
        overflowWrap: 'break-word',
        margin: '.2rem 0 0 0',
        [theme.breakpoints.up('sm')]: {
            margin: '.8rem 0 0 0',
        },
    },
}));


const AccountModal = ({ accountModalOpen, setAccountModalOpen, accountModalInfo, setAccountModalOpenInfo, token, administracija, setSnackbar, loyalty }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [isEmployee, setIsEmployee] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [button, setbutton] = useState('normal');
    const [tab, setTab] = useState('Užsakymai');

    const handleClose = () => {
        setAccountModalOpen(false);
        setAccountModalOpenInfo({
            userId: '',
            username: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            personalas: '',
            administracija: '',
            moneySpent: 0,
        });
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const updateStatus = async () => {
        setbutton('submitting');
        try {
            const updateRequest = await fetch("/administracija/updateStatus/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    id: accountModalInfo.userId,
                    personalas: isEmployee,
                    administracija: isAdmin,
                }),
            });
            const updateResponse = await updateRequest.json();
            if (updateResponse.success) {
                setbutton('success');
                setTimeout(function() {
                    setbutton('normal');
                }, 3000);
                setAccountModalOpenInfo({
                    ...accountModalInfo,
                    personalas: isEmployee,
                    administracija: isAdmin
                });
            } else {
                setbutton('normal');
                setSnackbar({
                    open: true,
                    message: updateResponse.error
                });
            }
        } catch (error) {
            setbutton('normal');
            setSnackbar({
                open: true,
                message: error
            });
        }
    };

    const loyaltyLevel = () => {
        var lvl = 0;
        var money = accountModalInfo.moneySpent;
        if (money !== 0 && money !== '') {
            for (const [index, item] of loyalty.entries()) {
                if (item.money <= money) {
                    lvl = index + 1;
                } else {
                    break;
                }
            }
        } else {
            return 0;
        }   
        return lvl;
    };

    useEffect(() => {
        setIsEmployee(accountModalInfo.personalas ? true : false);
        setIsAdmin(accountModalInfo.administracija ? true : false);
        // eslint-disable-next-line
    }, [accountModalInfo])

    return (
        <Modal
            aria-labelledby="transition-modal-account-modal"
            aria-describedby="transition-modal-accountModalBody"
            className={classes.modal}
            open={accountModalOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={accountModalOpen}>
                <Box className={classes.paper}>
                    <Grid container>
                        <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                            <Box>
                                <Grid container>
                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6}>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={3} lg={3} md={3} sm={3} xs={11}>
                                                    <p className={classes.paragraph}>El. paštas:</p>
                                                </Grid>
                                                <Grid item xl={9} lg={9} md={9} sm={9} xs={11}>
                                                    <p className={classes.paragraph}>{accountModalInfo.username}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={3} lg={3} md={3} sm={3} xs={11}>
                                                    <p className={classes.paragraph}>Tel. nr.:</p>
                                                </Grid>
                                                <Grid item xl={9} lg={9} md={9} sm={9} xs={11}>
                                                    <p className={classes.paragraph}>{accountModalInfo.phoneNumber}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6}>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={3} lg={3} md={3} sm={3} xs={11}>
                                                    <p className={classes.paragraph}>Vardas:</p>
                                                </Grid>
                                                <Grid item xl={9} lg={9} md={9} sm={9} xs={11}>
                                                    <p className={classes.paragraph}>{accountModalInfo.firstName}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={3} lg={3} md={3} sm={3} xs={11}>
                                                    <p className={classes.paragraph}>Pavardė:</p>
                                                </Grid>
                                                <Grid item xl={9} lg={9} md={9} sm={9} xs={11}>
                                                    <p className={classes.paragraph}>{accountModalInfo.lastName}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6}>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={4} lg={4} md={4} sm={4} xs={11}>
                                                    <p className={classes.paragraph}>Lojalumo lygis:</p>
                                                </Grid>
                                                <Grid item xl={8} lg={8} md={8} sm={8} xs={11}>
                                                    <p className={classes.paragraph}>{loyaltyLevel()}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box classes={{root: classes.item}}>
                                            <Grid container>
                                                <Grid item xl={4} lg={4} md={4} sm={4} xs={11}>
                                                    <p className={classes.paragraph}>Išleista pinigų:</p>
                                                </Grid>
                                                <Grid item xl={8} lg={8} md={8} sm={8} xs={11}>
                                                    <p className={classes.paragraph}>{accountModalInfo.moneySpent && accountModalInfo.moneySpent} €</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={12} sm={12} xs={6}>
                                        <Box classes={{root: classes.itemRadio}}>
                                            <Grid container>
                                                <Grid item xl={5} lg={5} md={3} sm={4} xs={11}>
                                                    <p className={classes.paragraphRadio}>Personalas: </p>
                                                </Grid>
                                                <Grid item xl={7} lg={7} md={9} sm={8} xs={11}>
                                                    <FormControl component="fieldset" className={classes.radioButtons}>
                                                        <RadioGroup row aria-label="position" name="position" value={isEmployee ? true : false}>
                                                            <FormControlLabel value={true} control={<Radio color="primary" onClick={() => {setIsEmployee(true)}} disabled={!administracija}/>} label="Taip" />
                                                            <FormControlLabel value={false} control={<Radio color="primary" onClick={() => {setIsEmployee(false)}} disabled={!administracija}/>} label="Ne" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xl={5} lg={5} md={3} sm={5} xs={11}>
                                                    <p className={classes.paragraphRadio}>Administracija: </p>
                                                </Grid>
                                                <Grid item xl={7} lg={7} md={9} sm={7} xs={11}>    
                                                    <FormControl component="fieldset" className={classes.radioButtons}>
                                                        <RadioGroup row aria-label="position" name="position" value={isAdmin ? true : false}>
                                                            <FormControlLabel value={true} control={<Radio color="primary" onClick={() => {setIsAdmin(true)}} disabled={!administracija}/>} label="Taip" />
                                                            <FormControlLabel value={false} control={<Radio color="primary" onClick={() => {setIsAdmin(false)}} disabled={!administracija}/>} label="Ne" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>        
                                        </Box>
                                        <Box classes={{root: classes.item}}>
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <Button 
                                                    onClick={() => updateStatus()}
                                                    style={button === 'success' ? {backgroundColor: '#26a69a'} : {backgroundColor: theme.myTheme.pirma }}
                                                    classes={{root: classes.button, disabled: classes.buttonDisabled}}
                                                    disabled={button === 'submitting' || !administracija || (accountModalInfo.personalas === isEmployee && accountModalInfo.administracija === isAdmin)} 
                                                >
                                                    {
                                                        {
                                                            'normal': "Pakeisti statusą", 
                                                            'submitting': <CircularProgress size={25}/>,     
                                                            'success': <CheckIcon size={25}/>,
                                                        }[button]
                                                    }
                                                </Button>
                                            </Box>
                                        </Box> 
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                            <Box display='flex' justifyContent='flex-end' alignItems='flex-start'>
                                <VscClose onClick={() => handleClose()} className={classes.closeIcon} size={25}/>
                            </Box>
                        </Grid>    
                    </Grid>
                    <Box >
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            aria-label="disabled tabs example"
                            classes={{root: classes.tabsBox}}
                        >
                            <Tab label="Užsakymai" value={"Užsakymai"} classes={{root: classes.tab}}/>
                            <Tab label="Mokėjimai" value={"Mokėjimai"} classes={{root: classes.tab}}/>
                            <Tab label="Adresai" value={"Adresai"} classes={{root: classes.tab}}/>
                        </Tabs>
                    </Box>
                    <Box>
                    {
                        {
                            "Užsakymai": <UserOrders />, 
                            "Mokėjimai": <UserPayments />,     
                            "Adresai": <UserAddresses userId={accountModalInfo.userId} setSnackbar={setSnackbar} token={token}/>,
                        }[tab]
                    }
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AccountModal
