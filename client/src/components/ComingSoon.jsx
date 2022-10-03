import { useState } from 'react'
import { Modal, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Treklama01 from '../media/logo.webp'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      opacity: 1,
    },
    comingSoonModal: {
        fontSize: theme.myTheme.sizeM,
        width: '98%',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5%',
        outline: 'none',
        "&:focus":{
            outline: 'none',
        },
        "& h1":{
            fontFamily: theme.myTheme.sriftasLogo,
            color: theme.myTheme.balta,
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            width: '30vw',
            margin: 0,
            padding: '5em',
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
                style: {backgroundColor: '#000000'}
            }}
        >
            <Box classes={{root: classes.comingSoonModal}}>
                <img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/>
                <h1>Jau greitai!</h1>
            </Box>
        </Modal >
    )
}

export default ComingSoon
