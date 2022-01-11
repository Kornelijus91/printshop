import { useState } from 'react'
import { Modal, Box, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Treklama01 from '../media/Treklama01.png'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.myTheme.sriftoSpalva,
      opacity: 1,
    },
    comingSoonModal: {
        width: '98%',
        // height: '30vh',
        padding: '1rem',
        // top: '30%',
        // margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: theme.myTheme.pirma,
        borderRadius: '5%',
        outline: 'none',
        "&:focus":{
            outline: 'none',
        },
        "& h1":{
            fontFamily: theme.myTheme.sriftas,
            color: theme.myTheme.trecia,
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            width: '30vw',
            margin: 0,
            padding: '5rem',
        },
    },
    mainLogo: {
        width: '100%', 
        objectFit: 'contain',
    },
}));

const ComingSoon = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal 
            open={open}
            disableEscapeKeyDown={true}
            onKeyDown={(e) => {
                if (e.key === '7') {
                    handleClose();
                };
            }}
            // onClose={handleClose}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            BackdropProps={{
                style: {backgroundColor: '#1D3557'}
            }}
        >
            <Box classes={{root: classes.comingSoonModal}}>
                <img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/>
                <h1>Elektroninė spaustuvė Jūsų namuose. Jau greitai!</h1>
            </Box>
        </Modal >
    )
}

export default ComingSoon
