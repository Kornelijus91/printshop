import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse, Container, Paper, InputBase, Divider} from '@material-ui/core'; // FormControl, RadioGroup, FormControlLabel, Radio 
import Alert from '@material-ui/lab/Alert';
import 'date-fns';
import ltLocale from "date-fns/locale/lt";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'center',
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        border: 'none',
        outline: 'none',
        width: '22rem',
        padding: '0 1rem 0 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            width: '33rem',
            padding: '0 1.5rem 0 1.5rem',
            '& h1': {
                fontSize: '2.4rem'
            },
            '& h3': {
                fontSize: '1.6rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            width: '44rem',
            padding: '0 2rem 0 2rem',
            '& h1': {
                fontSize: '3.6rem'
            },
            '& h3': {
                fontSize: '2rem'
            },
        }, 
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        width: '100%',
        borderRadius: '4px',
        // height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '.2rem .2rem .2rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
            boxShadow: "0px 3px 3px #888888",
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
            boxShadow: "0px 4px 4px #888888",
            padding: '.4rem .4rem .4rem 2rem',
        },
    },
    alertBox: {
        margin: '1rem .5rem 0 .5rem',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem .75rem 0 .75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 1rem 0 1rem',
        },
    },
    alertText: {
        textAlign: "left",
        marginTop: '-.1rem',
        padding: "0px",
        margin: '0',
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            marginTop: '-.15rem',
            fontSize: '1.6rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.2rem',
            fontSize: '2rem'
        },
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    buttonDelete: {
        width: '45%',
        margin: "0 1rem 1rem 0",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            margin: ".7rem 1.5rem 1.5rem 0",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem',
            width: '46%',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "1.5rem 2rem 2rem 0",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem',
            width: '47%',
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.sZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor:theme.myTheme.sZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            margin: ".7rem 0 1.5rem 0",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem',
            width: '46%',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "1.5rem 0 2rem 0",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem',
            width: '47%',
        },
    },
    nameForm: {
        padding: '.5rem 1rem',
        margin: '0 .5rem 1rem .5rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        // width: 400,
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem 1.5rem',
            borderRadius: '7px',
            margin: '0 .5rem 1.5rem .5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem 2rem',
            borderRadius: '9px',
            margin: '0 .5rem 2rem .5rem',
        },
    },
    input: {
        width: '100%',
        height: '2.5rem',
        marginLeft: theme.spacing(1),
        flex: 1,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            height: '3.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            height: '5rem',
        },
    },
    divider: {
        height: 28,
        margin: 4,
        [theme.breakpoints.up('xxl')]: {
            height: 42,
            margin: 6,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 56,
            margin: 8,
        },
    },
    button: {
        backgroundColor: theme.myTheme.tZalia.main,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        marginLeft: '.5rem', 
        height: '2.2rem',
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem',
            padding: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem',
            padding: '1.5rem'
        },
    },
    datePickerParent: {
        padding: '0',
        margin: '0 .5rem 1rem .5rem',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 .5rem 1.5rem .5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 .5rem 2rem .5rem',
        },
    },
    datepicker: {
        padding: '0',
        margin: '0',
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.trecia,
        width: '100%',
        borderRadius: '4px',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
        },
    },
    radioRoot: {
        color: theme.myTheme.trecia,
    },
    radioChecked: {
        color: theme.myTheme.pirma,
    },
    calendarIcon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35) translateX(-.5rem)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateX(-.7rem)'
        },
    },
    calendarPopover: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35) translateY(-4rem)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateY(-7.5rem)'
        },
    },
}));

const AddCodeModal = ({ page, getAllCodes, user, setSnackbar, codeModal, setCodeModal, handleCodeChange }) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');
    const [submitting, setSubmitting] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleClose = () => {
        setCodeModal({
            open: false,
            id: '',
            code: '',
            discount: 0,
            // oneuse: true,
            used: 0,
            valid: new Date().setDate(new Date().getDate() + 7),
        });
        setSubmitting(false);
        setAlert('');
    };

    const addEditCode = async () => {
        setSubmitting(true);
        if(isNaN(Number(codeModal.discount))){
            setAlert('Nuolaidos lauke įvesta bloga reikšmė');
            setSubmitting(false);
            return
        } else if (codeModal.discount < 0) {
            setAlert('Nuolaida negali bųti mažesnė už 0');
            setSubmitting(false);
            return
        } else if (codeModal.discount === 0) {
            setAlert('Nuolaida negali bųti lygi 0');
            setSubmitting(false);
            return
        } else if (codeModal.discount > 99) {
            setAlert('Nuolaida negali bųti didesnė už 99');
            setSubmitting(false);
            return
        } else if (!codeModal.code) {
            setAlert('Įrašykite nuolaidų kodą');
            setSubmitting(false);
            return
        } 
        try {
            const addEditCodeRequest = await fetch("/administracija/addEditDiscountCode/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    id: codeModal.id,
                    code: codeModal.code.replace(/\s/g, ''),
                    discount: codeModal.discount,
                    // oneuse: codeModal.oneuse,
                    valid: codeModal.valid,
                }),
            });
            const addEditCodeResponse= await addEditCodeRequest.json();
            if (addEditCodeResponse.success) {
                handleClose();
                getAllCodes(page);
                setSnackbar({
                    message: `${addEditCodeResponse.message}`,
                    open: true,
                });
            } else {
                setSubmitting(false);
                setSnackbar({
                    message: `${addEditCodeResponse.error}`,
                    open: true,
                });
            }
        } catch (error) {
            setSubmitting(false);
            setAlert('Klaida! Pabandykite vėliau.');
        }
    };

    const generateCode = () => {
        var code = '';
        var posibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for ( var i=0; i < 10; i++ ) {
            code += posibilities.charAt(Math.floor(Math.random() * posibilities.length));
        }
        setCodeModal({
            ...codeModal,
            code: code,
        });

    };

    const handleDateChange = (date) => {
        setCodeModal({
            ...codeModal,
            valid: new Date(date).setHours(23, 59),
        });
        // setSelectedDate(date);
    };

    // const handleOneUseChange = (event) => {
    //     if (event.target.value === 'taip') {
    //         setCodeModal({
    //             ...codeModal,
    //             oneuse: true,
    //         });
    //     } else {
    //         setCodeModal({
    //             ...codeModal,
    //             oneuse: false,
    //         });
    //     }
    // };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={codeModal.open}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={codeModal.open}>
                <Container classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h1>{codeModal.id ? `Redaguoti ${codeModal.name}` : 'Pridėti nuolaidos kodą'}</h1>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Nuolaidos kodas</h3>
                        <Paper component="form" className={classes.nameForm}>
                            <InputBase
                                value={codeModal.code}
                                onChange={handleCodeChange('code')}
                                className={classes.input}
                                placeholder="Kodas..."
                                inputProps={{ 'aria-label': 'Nuolaidos kodas' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <Button onClick={generateCode} aria-label="visi" className={classes.button} >
                                Generuoti
                            </Button>
                        </Paper>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Nuolaida, %</h3>
                        <Paper component="form" className={classes.nameForm}>
                            <InputBase
                                value={codeModal.discount}
                                onChange={handleCodeChange('discount')}
                                className={classes.input}
                                placeholder="%..."
                                inputProps={{ 'aria-label': 'Nuolaida' }}
                            />
                        </Paper>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Galioja iki</h3>
                        <Box classes={{root: classes.datePickerParent}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ltLocale}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    classes={{root: classes.datepicker}}
                                    variant="inline"
                                    format="yyyy-MM-dd" // "dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    // label="Galioja iki"
                                    disablePast={true}
                                    autoOk={true}
                                    invalidDateMessage='Netinkama data'
                                    inputVariant="outlined"
                                    value={codeModal.valid}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                        classes: {
                                            root: classes.calendarIcon,
                                        },
                                    }}
                                    PopoverProps={{
                                        classes: {
                                            root: classes.calendarPopover,
                                        },
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        {/* <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Vienkartinis:</h3>
                        <Box display='flex' justifyContent='flex-start' alignItems='center' style={{margin: '0 0 .5rem .5rem'}}>
                            <FormControl component="fieldset" >
                                <RadioGroup row aria-label="gender" name="gender1" value={codeModal.oneuse ? 'taip' : 'ne' } onChange={handleOneUseChange}>
                                    <FormControlLabel value='taip' control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}}/>} label="Taip" />
                                    <FormControlLabel value='ne' control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}}/>} label="Ne" />
                                </RadioGroup>
                            </FormControl>
                        </Box> */}
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={submitting} onClick={addEditCode}>
                                {submitting ? <CircularProgress size={20}/> : "Išsaugoti" }
                            </Button>
                            <Button variant="contained" color="primary" className={classes.buttonCancel} disabled={submitting} onClick={handleClose}>
                                Atšaukti
                            </Button>
                        </Box>
                    </Box> 
                </Container>
            </Fade>
        </Modal>
    )
}

export default AddCodeModal
