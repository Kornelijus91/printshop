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
        fontSize: theme.myTheme.sizeM,
        backgroundColor: theme.myTheme.ruda.main,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        width: '25em',
        outline: 'none',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        textAlign: "center",
        position: "absolute",  
        top: "5%",
        paddingBottom: '1em',
        [theme.breakpoints.down('sm')]:{
            top: "5%",
            width: '20em',
        },
    },
    tabs: {
        width: '100%',
        marginBottom: theme.myTheme.sizeMM,
        backgroundColor: theme.myTheme.juoda,
        borderRadius: "6px 6px 0px 0px",
        zIndex: '1',
        position: 'relative',
        height: 'clamp(3rem, 2.4vw, 6rem)',
        [theme.breakpoints.up('xxl')]:{
          borderRadius: "8.4px 8.4px 0px 0px",
        },
        [theme.breakpoints.up('xxxl')]:{
          borderRadius: "12px 12px 0px 0px",
        },
    },
    tab: {
        color: `${theme.myTheme.balta} !important`,
        transition:'color .2s ease', 
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        zIndex: '10',
        width: 'clamp(10rem, 8vw, 20rem)',
        fontSize: theme.myTheme.sizeS,
        marginTop: theme.myTheme.sizeXXXS,
        [theme.breakpoints.up('xxl')]:{
          marginTop: theme.myTheme.sizeXXS,
        },
        [theme.breakpoints.up('xxxl')]:{
          fontSize: theme.myTheme.sizeS,
        },
    },
    tabFocused: {
        color: `${theme.myTheme.juoda} !important`,
        transition:'color .2s ease', 
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        zIndex: '10',
        width: 'clamp(10rem, 8vw, 20rem)',
        fontSize: theme.myTheme.sizeS,
        marginTop: theme.myTheme.sizeXXXS,
        [theme.breakpoints.up('xxl')]:{
          marginTop: theme.myTheme.sizeXXS,
        },
        [theme.breakpoints.up('xxxl')]:{
          fontSize: theme.myTheme.sizeS,
        },
    },
    TabLeft: {
        width: '100%', 
        height: theme.myTheme.sizeS,
        backgroundColor: 'transparent', 
        borderRadius: "0 0 7px 0", 
        boxShadow: '5px 5px 0 #dddfd4',
        [theme.breakpoints.up('xxl')]:{
          borderRadius: "0 0 9.8px 0", 
          boxShadow: '8px 10px 0 #dddfd4',
        },
        [theme.breakpoints.up('xxxl')]:{
          borderRadius: "0 0 14px 0", 
          boxShadow: '10px 10px 0 #dddfd4',
        },
    },
    Tabmiddle: {
        width: '100%', 
        height: 'clamp(3rem, 2.4vw, 6rem)',
        backgroundColor: theme.myTheme.ruda.main,
        borderRadius: "7px 7px 0px 0px",
        [theme.breakpoints.up('xxl')]:{
          borderRadius: "9.8px 9.8px 0px 0px",
        },
        [theme.breakpoints.up('xxxl')]:{
          borderRadius: "14px 14px 0px 0px",
        },
    },
    tabmiddlegriditem: {
        backgroundColor: theme.myTheme.ruda.main,
        borderRadius: "7px 7px 0px 0px",
        [theme.breakpoints.up('xxl')]:{
          borderRadius: "9.8px 9.8px 0px 0px",
          boxShadow: '0 10px 0 #dddfd4',
        },
        [theme.breakpoints.up('xxxl')]:{
          borderRadius: "14px 14px 0px 0px",
          boxShadow: '0 15px 0 #dddfd4',
        },
    },
    TabRight: {
        width: '100%', 
        height: theme.myTheme.sizeS,
        backgroundColor: 'transparent', 
        borderRadius: "0 0 0 7px", 
        boxShadow: '-5px 5px 0 #dddfd4',
        [theme.breakpoints.up('xxl')]:{
          borderRadius: "0 0 0 9.8px", 
          boxShadow: '-7px 7px 0 #dddfd4',
        },
        [theme.breakpoints.up('xxxl')]:{
          borderRadius: "0 0 0 14px", 
          boxShadow: '-10px 10px 0 #dddfd4',
        },
    },
    indicator: {
        height: '100%',
        backgroundColor: 'transparent',
    },
    form: {
        width: '80%',
    },
    alert: theme.myTheme.alert,
    alertBox: {
        marginBottom: 'clamp(1rem, 0.8vw, 2rem)',
        width: '80%',
        display: 'felx',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    diasbleOutline: {
        border: 'none',
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
        padding: theme.myTheme.sizeM,
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
            marginTop: '-.3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '10px 10px 0 0',
            marginTop: 0,
        },
    },
    labelFocused: {
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
            marginTop: '-.3em',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.3em',
        },
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
        margin: '0 0 1em 0',
        padding: '0',
        color: `${theme.myTheme.juoda} !important`,
    },
    header2: {
        fontSize: theme.myTheme.sizeM,
        margin: '0',
        padding: '0',
        color: `${theme.myTheme.juoda} !important`,
    },
    button: {
        fontSize: theme.myTheme.sizeM,
        width: '80%',
        marginBottom: ".5em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '3em',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
    },
    radioButtons: {
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            margin: '.2em 0 1em 0',
        },
        [theme.breakpoints.up('md')]: {
            margin: '.2em 0 1em 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '.5em 0 1.35em 0',
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '.8em 0 2em 0',
            transform: 'scale(2)'
        },
    },
    radiolabel: {
        fontFamily: theme.myTheme.sriftas,
        color:  theme.myTheme.juoda,
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
                        <Box style={{width: '100%'}} justifyContent="center" display='flex' alignItems='center'>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{error}</p></Alert>
                            </Box>
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