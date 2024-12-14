import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, useMediaQuery, DialogTitle, CircularProgress, Badge } from '@material-ui/core';
import { MdClose } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '7px',
        backgroundColor: theme.myTheme.sriftoSpalva,
    },
    dialogBackgroundTop: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '5px 5px 0 0',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem'
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '2rem'
        },
    },
    dialogBackground: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem'
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '2rem'
        },
    },
    dialogBackgroundBottom: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '0 0 5px 5px'
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]:{
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            fontSize: '2rem',
        },
    },
    cancelButton: theme.myTheme.cancelButton,
    saveButton:theme.myTheme.saveButton,
    input: {
        display: 'none',
    },
    imageBox: {
        height: '100%',
        width: '100%',
        padding: '1em',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: theme.myTheme.antra,
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '1.35em',
            borderRadius: '7px',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            padding: '2em',
            borderRadius: '10px',
        }, 
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    icon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
    },
    previewSelectedBadge: {
        marginRight: '.5rem',
        marginTop: '.5rem',
        height: '2rem',
        width: '2rem',
        borderRadius: '50%',
        backgroundColor: theme.myTheme.pirma,
        '&:hover': {
            backgroundColor: '#b61624',
        },
        [theme.breakpoints.up('xxl')]: {
            marginRight: '.75rem',
            marginTop: '.75rem',
            height: '2.7rem',
            width: '2.7rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '1rem',
            marginTop: '1rem',
            height: '4rem',
            width: '4rem',
        },
    },
    badgecontainer: {
        width: '100%',
    },
    checkMark: {
        color: theme.myTheme.trecia,
        '&:hover': {
            cursor: 'pointer',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
}));

const GalerijaModal = ({ galerijaModal, setGalerijaModal, setSnackbar, user, getAllProducts, page }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [hovering, setHovering] = useState(null);

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    const handleClose = () => {
        setGalerijaModal({
            open: false,
            productID: '',
            productName: '',
            productGalerija: [],
        });
    };

    const handleFile = (e) => {
        // console.log(e.target.files);
        const imagefiles = e.target.files;
        if (imagefiles.length > 0) {
            // console.log(imagefiles);
            setSubmitting(true);
            uploadToGalery(imagefiles);
        } 
    };

    const uploadToGalery = async (images) => {
        try {
            const formData = new FormData();
            for (const item of images) {
                
                formData.append('images', item);
                  
            }
            formData.append('productID', galerijaModal.productID);
            const req = await fetch("/administracija/galeryUpload/", {
                method: "POST",
                credentials: "include",
                headers: {
                    // "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: formData,
            });
            const res = await req.json();
            if (res.success) {
                setSubmitting(false);
                getAllProducts(page);
                setGalerijaModal({
                    ...galerijaModal,
                    productGalerija: res.galery
                });
                setSnackbar({
                    message: `${galerijaModal.productName} galerija atnaujinta.`,
                    open: true,
                });
            } else {
                setSubmitting(false);
                setSnackbar({
                    message: 'Klaida! pabandykite vėliau.',
                    open: true,
                });
            }
        } catch (error) {
            setSubmitting(false);
            setSnackbar({
                message: 'Klaida! pabandykite vėliau.',
                open: true,
            });
        }
    };

    const deleteGaleryItem = async (image) => {
        setDeleting(true);
        try {
            const req = await fetch("/administracija/deleteGaleryItem/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    productID: galerijaModal.productID,
                    image: image
                }),
            });
            const res = await req.json();
            if (res.success) {
                setDeleting(false);
                getAllProducts(page);
                setGalerijaModal({
                    ...galerijaModal,
                    productGalerija: res.galery
                });
                setSnackbar({
                    message: `${galerijaModal.productName} galerija atnaujinta.`,
                    open: true,
                });
            } else {
                setDeleting(false);
                setSnackbar({
                    message: 'Klaida! pabandykite vėliau.',
                    open: true,
                });
            }
        } catch (error) {
            setDeleting(false);
            setSnackbar({
                message: 'Klaida! pabandykite vėliau.',
                open: true,
            });
        }
    };

    return (
        <Dialog
            open={galerijaModal.open}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            classes={{paper: classes.root}}
            fullWidth
            maxWidth={screenSizexxxl ? 'xxl' : screenSizexxl ? 'xl' : 'lg'}
        >
            <DialogTitle id="scroll-dialog-title" classes={{root: classes.dialogBackgroundTop}}><h4 className={classes.header}>Galerija - {galerijaModal.productName}</h4></DialogTitle>
            <DialogContent dividers={true} classes={{root: classes.dialogBackground}}>
               {galerijaModal.productGalerija.length > 0 ? 
                    <Box>
                        <Grid container>
                            {galerijaModal.productGalerija.map((item, index) => 
                                <Grid item xl={2} lg={2} md={3} sm={4} xs={6}>
                                    <Box 
                                        classes={{root: classes.imageBox}}
                                        onMouseEnter={() => setHovering(index)}
                                        onMouseLeave={() => setHovering(null)}
                                    >
                                        <Badge 
                                            classes={{badge: classes.previewSelectedBadge, root: classes.badgecontainer}}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }} 
                                            invisible={index !== hovering}
                                            badgeContent={
                                                <>
                                                    {deleting ? <CircularProgress size={20} className={classes.checkMark}/> : <MdClose size={20} className={classes.checkMark}/>}
                                                </>  
                                            }
                                            onClick={() => deleteGaleryItem(item)}
                                        >
                                            <img src={item} alt='' className={classes.image}/>
                                        </Badge> 
                                    </Box>
                                </Grid>
                            )} 
                        </Grid>
                    </Box>
                :
                    <h3 className={classes.header}>Nuotraukų nėra.</h3>
                }
            </DialogContent>
            <DialogActions classes={{root: classes.dialogBackgroundBottom}}>
                <label htmlFor="upload_product_galerija">
                    <Button variant="contained" color="primary" component="span" classes={{root: classes.saveButton}} disabled={submitting}>
                        {submitting ? <CircularProgress size={20} className={classes.icon}/> : 'Įkelti' }
                    </Button>
                </label>
                <input
                    type="file" 
                    accept="image/*"
                    className={classes.input}
                    name="photo"
                    id="upload_product_galerija"
                    onChange={handleFile}
                    multiple={true}
                />
                <Button onClick={handleClose} classes={{root: classes.cancelButton}}>
                    Uždaryti
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GalerijaModal
