import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse, Container, Paper, InputBase, Divider, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
        padding: '0 1rem 0 1rem'
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
    },
    alertBox: {
        margin: '1rem .5rem 0 .5rem',
    },
    alertText: {
        textAlign: "left",
        marginTop: '-.1rem',
        padding: "0px",
        margin: '0',
        fontFamily: theme.myTheme.sriftas,
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDelete: {
        width: '45%',
        margin: "0 1rem 1rem 0",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#36617c',
        },
    },
    nameForm: {
        padding: '.5rem 1rem',
        margin: '0 .5rem 1rem .5rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        // width: 400,
    },
    input: {
        width: '100%',
        height: '2.5rem',
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
    },
    datePickerParent: {
        padding: '0',
        margin: '0 .5rem 1rem .5rem',
    },
    datepicker: {
        padding: '0',
        margin: '0',
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.trecia,
        width: '100%',
        borderRadius: '4px'
    },
    radioRoot: {
        color: theme.myTheme.trecia,
    },
    radioChecked: {
        color: theme.myTheme.pirma,
    }
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
            oneuse: true,
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
                    code: codeModal.code,
                    discount: codeModal.discount,
                    oneuse: codeModal.oneuse,
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

    const handleOneUseChange = (event) => {
        if (event.target.value === 'taip') {
            setCodeModal({
                ...codeModal,
                oneuse: true,
            });
        } else {
            setCodeModal({
                ...codeModal,
                oneuse: false,
            });
        }
    };

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
                            <Button onClick={generateCode} aria-label="visi" className={classes.button} style={{marginLeft: '.5rem', height: '2.2rem'}}>
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
                                    format="dd/MM/yyyy"
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
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Vienkartinis:</h3>
                        <Box display='flex' justifyContent='flex-start' alignItems='center' style={{margin: '0 0 .5rem .5rem'}}>
                            <FormControl component="fieldset" >
                                <RadioGroup row aria-label="gender" name="gender1" value={codeModal.oneuse ? 'taip' : 'ne' } onChange={handleOneUseChange}>
                                    <FormControlLabel value='taip' control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}}/>} label="Taip" />
                                    <FormControlLabel value='ne' control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}}/>} label="Ne" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
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
