import { Box, Grid, FormControl, InputLabel, OutlinedInput, Collapse, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core'; 
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
    },
    labelRoot: {
        marginTop: '-.6rem',
        color: `${theme.myTheme.juoda} !important`,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: theme.myTheme.sizeXXS,
        borderRadius: '5px 5px 0 0',
        backgroundColor: theme.myTheme.sZalia.light,
        fontFamily: theme.myTheme.sriftas,
        transform: 'translateX(.5rem) translateY(1.6rem)',
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '10px 10px 0 0',
        },
    },
    labelFocused: {
        marginTop: '-.3em',
        color: `${theme.myTheme.juoda} !important`,
        fontFamily: theme.myTheme.sriftas,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: theme.myTheme.sizeXXS,
        borderRadius: '5px 5px 0 0',
        backgroundColor: theme.myTheme.sZalia.light,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '10px 10px 0 0',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.3em',
        },
    },
    textInput: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: "1.2em",
        backgroundColor: theme.myTheme.sZalia.light,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    },
    input: {
        fontSize: theme.myTheme.sizeM,
    },
    diasbleOutline: {
        border: 'none',
    },
    summaryText: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 1em 0 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    radioButtons: {
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 1em',
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 0 2em',
            transform: 'scale(2)'
        },
    },
    radiolabel: {
        fontFamily: theme.myTheme.sriftas,
        color:  theme.myTheme.juoda,
        
    },
    addressItem: {
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        border: `1px solid ${theme.myTheme.juoda}`,
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeS,
        overflowWrap: 'break-word',
        marginBottom: '1em',
        padding: '.5em 1em',
        transition: '0.2s ease background-color',
        '& p': {
            margin: 0,
            padding: 0,
        },
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.light,
            cursor: 'pointer'
        },
        [theme.breakpoints.up('xs')]: {
            fontSize: theme.myTheme.sizeM,
        },
    },
    addButton: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        marginBottom: "2em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '2.5em',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('md')]: {
            width: '20%',
        },
    },
    alert: theme.myTheme.alert,
    alertBox: {
        marginBottom:  theme.myTheme.sizeXL,
    },
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    juridinisBox: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            marginBottom: '0',
            paddingTop: '.5em',
        },
    },
    buttonIcon: {
        color: theme.myTheme.balta,
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)',
           marginLeft: '.5em'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginLeft: '1em'
        },
    },
}));

const DeliveryInfo = ({ delivery, setDelivery, loggedIn, token, getAddresses, addresses, setOrderStep }) => {

    const classes = useStyles();
    const [alert, setAlert] = useState('');

    const handleChange = (e, attr) => {
        setDelivery({
            ...delivery,
            [attr]: e.target.value
        });
    };

    const getMe = async () => {
        if (loggedIn && token) {
            try {
                const res = await fetch("/users/me/", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${token}`,
                    },
                });
                const response = await res.json();
                setDelivery({
                    ...delivery,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    phone: response.phoneNumber,
                    email: response.username,
                });
            } catch (error) {

            }
        }
    };

    const nextStep = () => {
        setAlert('');
        var missing = [];
        if (!delivery.firstName) {
            missing.push('vardą');
        } 
        if (!delivery.lastName) {
            missing.push('pavardę');
        }  
        if (!delivery.phone) {
            missing.push('telefono numerį');
        }  
        if (!delivery.email) {
            missing.push('elektroninio pašto adresą');
        }  
        if (!delivery.city) {
            missing.push('miestą');
        }  
        if (!delivery.address) {
            missing.push('adresą');
        }  
        if (!delivery.zipcode) {
            missing.push('pašto kodą');
        }  
        if (!delivery.companyName && delivery.juridinis) {
            missing.push('įmonės pavadinimą');
        }  
        if (!delivery.companyCode && delivery.juridinis) {
            missing.push('įmonės kodą');
        }  
        if (!delivery.companyAddress && delivery.juridinis) {
            missing.push('įmonės adresą');
        }  
        if (!delivery.companyPVM && delivery.juridinis) {
            missing.push('įmonės PVM kodą');
        } 
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (missing.length > 0) {
            setAlert(`Įrašykite ${missing.join(', ')}.`);
            window.scrollTo({top: 0, left: 0});
        } else if (!re.test(String(delivery.email).toLowerCase())) {
            setAlert('Neteisingas El. Pašto adresas.');
            window.scrollTo({top: 0, left: 0});
        } else {
            setOrderStep(1);
            window.scrollTo({top: 0, left: 0});
        }
    };

    useEffect(() => {
        getMe();
        getAddresses();
        // eslint-disable-next-line
    }, [loggedIn, token])

    return (
        <Box>
            <Collapse in={alert !== ''}>
                <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                    <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                </Box>
            </Collapse>
            <Grid container spacing={2} style={{marginBottom: 'clamp(.5em, 1vw + .1em, 1em)'}}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-firstName" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Vardas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-firstName"
                            type='text'
                            value={delivery.firstName}
                            onChange={(e) => handleChange(e, 'firstName')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="1"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-lastName" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pavardė</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-lastName"
                            type='text'
                            value={delivery.lastName}
                            onChange={(e) => handleChange(e, 'lastName')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="2"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-telNr" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Telefono Nr.</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-telNr"
                            type='text'
                            value={delivery.phone}
                            onChange={(e) => handleChange(e, 'phone')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="3"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-email" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>El. Paštas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type='text'
                            value={delivery.email}
                            onChange={(e) => handleChange(e, 'email')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="4"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-city" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Miestas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-city"
                            type='text'
                            value={delivery.city}
                            onChange={(e) => handleChange(e, 'city')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="5"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-address" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Adresas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-address"
                            type='text'
                            value={delivery.address}
                            onChange={(e) => handleChange(e, 'address')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="6"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-zipcode" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pašto kodas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-zipcode"
                            type='text'
                            value={delivery.zipcode}
                            onChange={(e) => handleChange(e, 'zipcode')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="7"
                        />
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.juridinisBox}}>
                        <p className={classes.summaryText}>Juridinis asmuo:</p>
                        <FormControl component="fieldset" className={classes.radioButtons}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="Ne" value={delivery.juridinis}>
                                <FormControlLabel classes={{label: classes.radiolabel}} value={true} control={<Radio color="primary" onClick={() => setDelivery({...delivery, juridinis: true})} />} label="Taip" />
                                <FormControlLabel classes={{label: classes.radiolabel}} value={false} control={<Radio color="primary" onClick={() => setDelivery({...delivery, juridinis: false})} />} label="Ne" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Collapse in={delivery.juridinis}>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyname" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės pavadinimas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyname"
                                type='text'
                                value={delivery.companyName}
                                onChange={(e) => handleChange(e, 'companyName')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="8"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyCode" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės kodas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyCode"
                                type='text'
                                value={delivery.companyCode}
                                onChange={(e) => handleChange(e, 'companyCode')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="9"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyAddress" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės adresas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyAddress"
                                type='text'
                                value={delivery.companyAddress}
                                onChange={(e) => handleChange(e, 'companyAddress')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="10"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyPVM" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės PVM kodas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyPVM"
                                type='text'
                                value={delivery.companyPVM}
                                onChange={(e) => handleChange(e, 'companyPVM')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="11"
                            />
                        </FormControl>
                    </Grid>
                    {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box display='flex' justifyContent='flex-start' alignItems='center' style={{marginBottom: 'clamp(2em, 1vw + .5em, 4em)'}}>
                            <p className={classes.summaryText}>Biudžetinė įstaiga:</p>
                            <FormControl component="fieldset" className={classes.radioButtons}>
                                <RadioGroup row aria-label="position" name="position" defaultValue="Ne" value={delivery.budget}>
                                    <FormControlLabel classes={{label: classes.radiolabel}} value={true} control={<Radio color="primary" onClick={() => setDelivery({...delivery, budget: true})} />} label="Taip" />
                                    <FormControlLabel classes={{label: classes.radiolabel}} value={false} control={<Radio color="primary" onClick={() => setDelivery({...delivery, budget: false})} />} label="Ne" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid> */}
                </Grid>
            </Collapse>
            <Collapse in={addresses.length > 0}>
                {addresses.length > 0 &&
                    <Box style={{marginBottom: 'clamp(1em, 1vw + .2em, 2em)'}}>
                        {addresses.map((address) =>
                            <Box 
                                classes={{root: classes.addressItem}} 
                                onClick={() =>
                                    setDelivery({
                                        ...delivery,
                                        city: address.city,
                                        address: address.address,
                                        zipcode: address.zipCode,
                                        juridinis: address.companyName !== '' ? true : false,
                                        companyName: address.companyName,
                                        companyCode: address.companyCode,
                                        companyAddress: address.companyAddress,
                                        companyPVM: address.companyPVMCode,
                                        budget: address.budgetCompany,
                                    })
                                }
                            >
                                <Grid container display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                <p><b>Miestas:</b> {address.city}</p> 
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                <p><b>Adresas:</b> {address.address}</p>
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                <p><b>Pašto kodas:</b> {address.zipCode}</p>
                                            </Grid>
                                            {address.companyName !== '' && 
                                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                    <p><b>Įmonės pavadinimas:</b> {address.companyName}</p>
                                                </Grid>
                                            }
                                            {address.companyCode !== '' && 
                                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                    <p><b>Įmonės kodas:</b> {address.companyCode}</p>
                                                </Grid>
                                            }
                                            {address.companyAddress !== '' && 
                                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                    <p><b>Įmonės adresas:</b> {address.companyAddress}</p>
                                                </Grid>
                                            }
                                            {address.companyPVMCode !== '' && 
                                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                    <p><b>Įmonės PVM kodas:</b> {address.companyPVMCode}</p>
                                                </Grid>
                                            }
                                            {address.budgetCompany && 
                                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                                    <p><b>Biudžetinė įstaiga.</b></p>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                }
            </Collapse>
            <FormControl className={classes.form} variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-pastabaKurjeriui" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pastaba kurjeriui</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-pastabaKurjeriui"
                    type='text'
                    value={delivery.pastabaKurjeriui}
                    multiline
                    rows={4}
                    placeholder='Pastaba kurjeriui, pvz. laiptinės kodas.'
                    onChange={(e) => handleChange(e, 'pastabaKurjeriui')}
                    classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                    labelWidth={85}
                    tabIndex="12"
                />
            </FormControl>
            <Box display='flex' justifyContent='flex-end'>
                <Button 
                    classes={{root: classes.addButton}} 
                    onClick={nextStep}
                    endIcon={<FaArrowRight size={17} className={classes.buttonIcon}/>}
                >
                    Tęsti
                </Button> 
            </Box>
        </Box>
    )
}

export default DeliveryInfo
