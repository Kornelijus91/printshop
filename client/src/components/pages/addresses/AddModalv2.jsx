import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Container, Box, Backdrop, Fade, Tabs, Tab, Collapse, Grid, FormControl, InputLabel, OutlinedInput, Button, CircularProgress } from '@material-ui/core'; //Radio, RadioGroup, FormControlLabel,
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'scroll',
        [theme.breakpoints.up('md')]:{
          overflow:'hidden',
        },
      },
    root: {
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        width: '25rem',
        outline: 'none',
        borderRadius: "6px",
        textAlign: "center",
        position: "absolute",  
        top: "5%",
        paddingBottom: '1rem',
        [theme.breakpoints.down('sm')]:{
            top: "5%",
            width: '20rem',
        },
        [theme.breakpoints.up('xxl')]:{
            width: '33.75rem',
            borderRadius: "9px",
        },
        [theme.breakpoints.up('xxxl')]:{
            width: '50rem',
            borderRadius: "14px",
        },
    },
    tabs: {
        marginBottom: "1.2rem",
        backgroundColor: theme.myTheme.pirma,
        borderRadius: "6px 6px 0px 0px",
        zIndex: '1',
        position: 'relative',
        [theme.breakpoints.up('xxl')]:{
          marginBottom: "1.35rem",
          borderRadius: "9.45px 9.45px 0px 0px",
          height: '3.8rem',
        },
        [theme.breakpoints.up('xxxl')]:{
          marginBottom: "2rem",
          borderRadius: "14px 14px 0px 0px",
          height: '6rem',
        },
    },
    tab: {
        color: `${theme.myTheme.trecia} !important`,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        zIndex: '10',
        width: '10rem',
        [theme.breakpoints.up('xxl')]:{
            width: '13.5rem',
            fontSize: '1.15rem',
            marginTop: '.5rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            width: '20rem',
            fontSize: '1.5rem',
            marginTop: '1.2rem',
        },
    },
    tabFocused: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        zIndex: '10',
        width: '10rem',
        [theme.breakpoints.up('xxl')]:{
            marginTop: '.5rem',
            width: '13.5rem',
            fontSize: '1.15rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            width: '20rem',
            fontSize: '1.5rem',
            marginTop: '1.2rem',
        },
    },
    TabLeft: {
        width: '100%', 
        height: '.8rem', 
        backgroundColor: 'transparent', 
        borderRadius: "0 0 7px 0", 
        boxShadow: '5px 5px 0 #F1FAEE',
        [theme.breakpoints.up('xxl')]:{
          height: '1.3rem', 
          borderRadius: "0 0 10px 0", 
          boxShadow: '8px 10px 0 #F1FAEE',
        },
        [theme.breakpoints.up('xxxl')]:{
          height: '1.6rem', 
          borderRadius: "0 0 14px 0", 
          boxShadow: '10px 10px 0 #F1FAEE',
        },
    },
    Tabmiddle: {
        width: '100%', 
        height: '3rem', 
        backgroundColor: theme.myTheme.trecia,
        borderRadius: "7px 7px 0px 0px",
        [theme.breakpoints.up('xxl')]:{
            height: '3.82rem', 
        },
        [theme.breakpoints.up('xxxl')]:{
            height: '6rem', 
        },
    },
    tabmiddlegriditem: {
        backgroundColor: theme.myTheme.trecia,
        borderRadius: "7px 7px 0px 0px",
        [theme.breakpoints.up('xxl')]:{
            borderRadius: "10px 10px 0px 0px",
        },
        [theme.breakpoints.up('xxxl')]:{
            borderRadius: "14px 14px 0px 0px",
        },
    },
    TabRight: {
        width: '100%', 
        height: '.8rem', 
        backgroundColor: 'transparent', 
        borderRadius: "0 0 0 7px", 
        boxShadow: '-5px 5px 0 #F1FAEE',
        [theme.breakpoints.up('xxl')]:{
            height: '1.3rem', 
            borderRadius: "0 0 0 10px", 
            boxShadow: '-8px 10px 0 #F1FAEE',
        },
        [theme.breakpoints.up('xxxl')]:{
            height: '1.6rem', 
            borderRadius: "0 0 0 14px", 
            boxShadow: '-10px 10px 0 #F1FAEE',
        },
    },
    indicator: {
        height: '100%',
        backgroundColor: 'transparent',
    },
    form: {
        width: '80%',
    },
    alert: {
        width: '80%',
        borderRadius: '6px',
        padding: '.2rem .2rem .2rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '12px',
            padding: '1rem .4rem 1rem 2rem',
        },
    },
    alertBox: {
        marginBottom: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
        },
    },
    alertText: {
        textAlign: "left",
        margin: 0,
        padding: 0,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.6rem',
        },
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    diasbleOutline: {
        border: 'none',
    },
    textInput: {
        marginBottom: "1.2rem",
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '6px',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
            borderRadius: '12px',
            paddingLeft: '1rem'
        },
    },
    input: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            padding: '2rem'
        },
    },
    labelRoot: {
        marginTop: '-.6rem',
        color: `${theme.myTheme.sriftoSpalva} !important`,
        padding: '.2rem .5rem .2rem .5rem',
        borderRadius: '6px 6px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        fontFamily: theme.myTheme.sriftas,
        transform: 'translateX(.5rem) translateY(1.6rem)',
        [theme.breakpoints.up('xxl')]: {
            // marginTop: '-.9rem',
            padding: '.3rem .75rem .3rem .75rem',
            borderRadius: '9px 9px 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: 0,
            padding: '.4rem 1rem .4rem 1rem',
            borderRadius: '12px 12px 0 0',
            fontSize: '2rem',
        },
    },
    labelFocused: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        fontFamily: theme.myTheme.sriftas,
        padding: '.2rem .5rem .2rem .5rem',
        borderRadius: '6px 6px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        [theme.breakpoints.up('xxl')]: {
            padding: '.3rem .75rem .3rem .75rem',
            borderRadius: '9px 9px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.4rem 1rem .4rem 1rem',
            borderRadius: '12px 12px 0 0',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-1rem'
        },
    },
    header: {
        margin: '0 0 1rem 0',
        padding: '0',
        color: `${theme.myTheme.sriftoSpalva} !important`,
        [theme.breakpoints.up('xxl')]:{
            fontSize: '1.6rem'
        },
        [theme.breakpoints.up('xxxl')]:{
            fontSize: '2.5rem'
        },
    },
    header2: {
        margin: '0',
        padding: '0',
        color: `${theme.myTheme.sriftoSpalva} !important`,
        [theme.breakpoints.up('xxl')]:{
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]:{
            fontSize: '2.1rem'
        },
    },
    button: {
        width: '80%',
        marginBottom: ".5rem",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        [theme.breakpoints.up('xxl')]: {
            marginBottom: ".75rem",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "1rem",
            borderRadius: '12px',
            height: '4.5rem',
            fontSize: '1.6rem',
        },
    },
    radioButtons: {
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            margin: '.2rem 0 1rem 0',
        },
        [theme.breakpoints.up('md')]: {
            margin: '.2rem 0 1rem 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '.5rem 0 1.35rem 0',
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '.8rem 0 2rem 0',
            transform: 'scale(2)'
        },
    },
    radiolabel: {
        fontFamily: theme.myTheme.sriftas,
        color:  theme.myTheme.sriftoSpalva,
    },
}));

export default function AddModalv2({token, setModalAddOpen, modalAddOpen, getAddresses, editAddress, setEditAddress, modalView, setmodalView }) {
  const classes = useStyles();

  const [address, setAddress] = useState({
    id: '',
    city: '',
    address: '',
    zipCode: '',
    companyName: '',
    companyCode: '',
    companyAddress: '',
    companyPVMCode: '',
    // budgetCompany: false
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (prop) => (event) => {
    setAddress({ ...address, [prop]: event.target.value });
  };

  const handleClose = () => {
    setModalAddOpen(false);
    setError('');
  };

  const handleViewChange = (event, newValue) => {
    setmodalView(newValue);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if(!address.city){
        setError("Įrašykite miestą.");
        setIsSubmitting(false);
    } else if(!address.address){
        setError("Įrašykite adresą.");
        setIsSubmitting(false);
    } else if(!address.zipCode){
        setError("Įrašykite pašto kodą.");
        setIsSubmitting(false);
    } else if(!address.companyName && modalView === 'Juridinis asmuo'){
        setError("Įrašykite įmonės pavadinimą.");
        setIsSubmitting(false);
    } else if(!address.companyCode && modalView === 'Juridinis asmuo'){
        setError("Įrašykite įmonės kodą.");
        setIsSubmitting(false);
    } else if(!address.companyAddress && modalView === 'Juridinis asmuo'){
        setError("Įrašykite įmonės adresą.");
        setIsSubmitting(false);
    } else if(!address.companyPVMCode && modalView === 'Juridinis asmuo'){
        setError("Įrašykite įmonės PVM kodą.");
        setIsSubmitting(false);
    } else {
        try {
            const addAddress = await fetch("/users/addaddress/", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    asmuo: modalView,
                    id: address.id,
                    city: address.city,
                    address: address.address,
                    zipCode: address.zipCode,
                    companyName: address.companyName,
                    companyCode: address.companyCode,
                    companyAddress: address.companyAddress,
                    companyPVMCode: address.companyPVMCode,
                    // budgetCompany: address.budgetCompany
                }),
            });
            const addAddressResponse = await addAddress.json();
            if (addAddressResponse.success) {
                setModalAddOpen(false);
                setIsSubmitting(false);
                getAddresses();
            } else {
                setError("Klaida! Pabandykite vėliau.");
                setIsSubmitting(false);
            }
        } catch (error) {

        }
    }
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalAddOpen}
        disableScrollLock={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{}}
    >
        <Fade in={modalAddOpen} 
            onExited={() => {
                setmodalView("Fizinis asmuo");
                // getAddresses();
                setAddress({
                    city: '',
                    address: '',
                    zipCode: '',
                    companyName: '',
                    companyCode: '',
                    companyAddress: '',
                    companyPVMCode: '',
                    budgetCompany: false
                });
                setEditAddress({
                    id: '',
                    city: '',
                    address: '',
                    zipCode: '',
                    companyName: '',
                    companyCode: '',
                    companyAddress: '',
                    companyPVMCode: '',
                    budgetCompany: false
                });
            }}
            onEnter={() => {
                if (editAddress.id) {
                    setAddress({
                        id: editAddress.id,
                        city: editAddress.city,
                        address: editAddress.address,
                        zipCode: editAddress.zipCode,
                        companyName: editAddress.companyName,
                        companyCode: editAddress.companyCode,
                        companyAddress: editAddress.companyAddress,
                        companyPVMCode: editAddress.companyPVMCode,
                        budgetCompany: editAddress.budgetCompany
                    });
                    if (editAddress.companyName) {
                        setmodalView("Juridinis asmuo");
                    } else {
                        setmodalView("Fizinis asmuo");
                    }
                }
            }}
        >
          <Container classes={{root: classes.root}}>
            <Box>
                <Tabs
                    value={modalView}
                    onChange={handleViewChange}
                    indicatorColor="secondary"
                    // textColor="secondary"
                    TabIndicatorProps={{ children: 
                    <div>
                        <Grid container justifyContent="space-between" display='flex' alignItems='flex-end'>
                            <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box classes={{root: classes.TabLeft}}/>
                            </Grid>
                            <Grid item xl={10} xs={10} md={10} sm={10} lg={10} className={classes.tabmiddlegriditem}>
                                <Box classes={{root: classes.Tabmiddle}}/>
                            </Grid>
                            <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box classes={{root: classes.TabRight}}/>
                            </Grid>
                        </Grid>
                    </div>
                    }}
                    centered
                    classes={{root: classes.tabs, indicator: classes.indicator}}
                >
                    <Tab disableRipple={true} classes={{root: modalView === 'Fizinis asmuo' ? classes.tabFocused : classes.tab}} value="Fizinis asmuo" label="Fizinis asmuo" />
                    <Tab disableRipple={true} classes={{root: modalView === 'Juridinis asmuo' ? classes.tabFocused : classes.tab}} value="Juridinis asmuo" label="Juridinis asmuo" />
                </Tabs>
                <Box>
                    <h2 className={classes.header}>Pridėkite adresą</h2>
                    <Collapse in={error !== ''}>
                        <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                            <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{error}</p></Alert>
                        </Box>
                    </Collapse>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-city" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Miestas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-city"
                            type='text'
                            value={address.city}
                            onChange={handleChange('city')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="1"
                        />
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-address" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Adresas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-address"
                            type='text'
                            value={address.address}
                            onChange={handleChange('address')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="2"
                        />
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-zipcode" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pašto kodas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-zipcode"
                            type='text'
                            value={address.zipCode}
                            onChange={handleChange('zipCode')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            labelWidth={85}
                            tabIndex="3"
                        />
                    </FormControl>
                    <Collapse in={modalView === 'Juridinis asmuo'}>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyName" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės pavadinimas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyName"
                                type='text'
                                value={address.companyName}
                                onChange={handleChange('companyName')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="1"
                            />
                        </FormControl>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyCode" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės kodas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyCode"
                                type='text'
                                value={address.companyCode}
                                onChange={handleChange('companyCode')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="1"
                            />
                        </FormControl>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyAddress" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės adresas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyAddress"
                                type='text'
                                value={address.companyAddress}
                                onChange={handleChange('companyAddress')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="1"
                            />
                        </FormControl>
                        <FormControl className={classes.form} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-companyPVMCode" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Įmonės PVM kodas</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyPVMCode"
                                type='text'
                                value={address.companyPVMCode}
                                onChange={handleChange('companyPVMCode')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                labelWidth={85}
                                tabIndex="1"
                            />
                        </FormControl>
                        {/* <h3 className={classes.header2}>Biudžetinė įstaiga?</h3>
                        <FormControl component="fieldset" className={classes.radioButtons}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="Ne" value={address.budgetCompany}>
                                <FormControlLabel classes={{label: classes.radiolabel}} value={true} control={<Radio color="primary" onClick={() => {setAddress({ ...address, budgetCompany: true})}}/>} label="Taip" />
                                <FormControlLabel classes={{label: classes.radiolabel}} value={false} control={<Radio color="primary" onClick={() => {setAddress({ ...address, budgetCompany: false})}}/>} label="Ne" />
                            </RadioGroup>
                        </FormControl> */}
                    </Collapse>
                    <Button variant="contained" color="primary" className={classes.button} disabled={isSubmitting} onClick={() => {handleSubmit()}}>
                        {isSubmitting ? <CircularProgress size={20}/> : "Išsaugoti" }
                    </Button>
                </Box>
            </Box> 
          </Container>
        </Fade>
    </Modal>
  );
}