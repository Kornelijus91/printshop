// import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, Grid, Hidden } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import picturePlaceHolder from '../../../media/picturePlaceHolder.png'

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
        backgroundColor: theme.myTheme.balta,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '18em',
        padding: '0 1em 0 1em',
        position: "absolute",  
        // top: "30%",
        [theme.breakpoints.up('xs')]: {
            width: '22em',
        },
        [theme.breakpoints.up('md')]: {
            width: '30em',
        },
        [theme.breakpoints.up('lg')]: {
            width: '70em',
        },
        // [theme.breakpoints.up('xxl')]: {
        //     borderRadius: '10px',
        //     width: '94.5rem',
        //     // top: "30%",
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     borderRadius: '14px',
        //     width: '140rem',
        // },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    buttonDelete: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        marginBottom: "1em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '2.5em',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0px 3px 3px #888888",
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0px 4px 4px #888888",
        },
    },
    buttonCancel: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        margin: "0",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '2.5em',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.sZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.dark,
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: "1em",
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0px 3px 3px #888888",
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0px 4px 4px #888888",
        },
    },
    cartItem: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
        // [theme.breakpoints.up('xxl')]: {
        //     fontSize: '1.6rem'
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     fontSize: '2.2rem'
        // },
    },
    pdf: {
        width: '100%',
        // height: '20rem',
        objectFit: 'contain',
    },
    image: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        maxHeight: '30em',
        objectFit: 'contain',
        // [theme.breakpoints.up('xxl')]: {
        //     maxHeight: '45rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     maxHeight: '60rem',
        // },
    },
    imagePlaceHolder: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        objectFit: 'contain',
        maxHeight: '20em',
        padding: '0 .5em 0 0',
        // [theme.breakpoints.up('xxl')]: {
        //     maxHeight: '27rem',
        //     padding: '0 2.7em',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     maxHeight: '40rem',
        //     padding: '0 4em',
        // },
    },
    summaryText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
        // [theme.breakpoints.up('xxl')]: {
        //     margin: '0 0 .45rem 0',
        //     fontSize: '1.2rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     margin: '0 0 .6rem 0',
        //     fontSize: '1.7rem',
        // },
    },
    discountText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.sZalia.dark,
        // [theme.breakpoints.up('xxl')]: {
        //     margin: '0 0 .45rem 0',
        //     fontSize: '1.2rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     margin: '0 0 .6rem 0',
        //     fontSize: '1.7rem',
        // },
    },
    PriceText: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        // [theme.breakpoints.up('xxl')]: {
        //     margin: '0 1.05rem .45rem 0',
        //     fontSize: '1.8rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     margin: '0 1.4rem .6rem 0',
        //     fontSize: '2.4rem',
        // },
    },
    Isbraukta: theme.myTheme.isbraukta,
    DiscountedPriceText: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.dark,
        // [theme.breakpoints.up('xxl')]: {
        //     margin: '0 1.05rem .45rem 0',
        //     fontSize: '1.8rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     margin: '0 1.4rem .6rem 0',
        //     fontSize: '2.4rem',
        // },
    },
}));

const ProductAddedModal = ({ appliedDiscount, papildomaMaketavimoKaina, getDiscountedPrice, getPrice, addModalOpen, setAddModalOpen, file, optionsValues, collapseOpen, productName, kiekis, unitPrice, pastaba, loyaltydiscount }) => { // pasirinktasGamybosLaikas

    const classes = useStyles();
    const history = useHistory();

    const handleClose = () => {
        setAddModalOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={addModalOpen}
            disableScrollLock={true}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
            disableEscapeKeyDown={true}
        >
            <Fade in={addModalOpen}>
                <Box classes={{root: classes.root}}>
                    <Box>
                        <h2 className={classes.header}>{`Produktas - ${productName} pridėtas į krepšelį!`}</h2>
                        <Hidden mdDown implementation="css">
                            <Box classes={{root: classes.cartItem}}>
                                <Grid container spacing={2}>
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                        {file.URL !== '' ?
                                            <Box>
                                                {file.type === 'application/pdf' ? 
                                                    <embed src={`${file.URL}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} />
                                                : 
                                                    <img 
                                                        className={classes.image} 
                                                        src={file.projectId !== '' ?
                                                            `${file.URL}?${+ new Date().getTime()}`
                                                            :
                                                            file.URL
                                                        } 
                                                        alt=""
                                                    />
                                                }
                                            </Box>
                                        :
                                            <Box >
                                                <img className={classes.imagePlaceHolder} src={picturePlaceHolder} alt=""/>
                                            </Box>
                                        }
                                        
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                        {optionsValues.map((item, index) => 
                                            <>
                                                {item.type === 0 && (!item.summon || item.summon === 0) ? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                                : item.type === 0 && item.summon && item.summon !== 0 && collapseOpen(item.summon) ? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p> 
                                                : item.type === 1 && (!item.summon || item.summon === 0) ? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</p>
                                                : item.type === 1 && item.summon && item.summon !== 0 && collapseOpen(item.summon) ? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</p>
                                                : item.type === 2 && (!item.summon || item.summon === 0) ? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                                : item.type === 2 && item.summon && item.summon !== 0 && collapseOpen(item.summon)? 
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                                : item.type === 3 && (!item.summon || item.summon === 0) ?
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.firstValue}</p> 
                                                : item.type === 3 && item.summon && item.summon !== 0 && collapseOpen(item.summon) &&    
                                                    <p key={index} className={classes.summaryText}>{item.name}: {item.firstValue}</p>  
                                                }
                                            </>
                                        )}
                                        {/* <p className={classes.summaryText}>Gamybos Laikas: {pasirinktasGamybosLaikas}</p> */}
                                        <p className={classes.summaryText}>Kiekis: {kiekis}</p>
                                        <p className={classes.summaryText}>Vieneto kaina: {unitPrice.price.toFixed(2)}€</p>
                                        {papildomaMaketavimoKaina > 0 &&
                                            <p className={classes.summaryText}>Maketavimas: {papildomaMaketavimoKaina}€</p>
                                        }
                                        {pastaba !== '' &&
                                            <p className={classes.summaryText}>Pastaba: {pastaba}</p>
                                        }
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                        {appliedDiscount.discount > 0 &&
                                            <p className={classes.discountText}>{appliedDiscount.discountName}: <b>{appliedDiscount.discount}%</b></p>
                                        }
                                        {/* <p className={classes.discountText}>Tavo reklama klubo nuolaida: {loyaltydiscount}%</p> */}
                                        <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                            <p className={classes.PriceText}>Kaina:</p>
                                            {appliedDiscount.discount > 0 ? 
                                                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                    {/* <p className={classes.Isbraukta}>{getPrice()}€</p> */}
                                                    <span className={classes.Isbraukta}>{getPrice()}€</span>
                                                    <p className={classes.DiscountedPriceText}>{getDiscountedPrice()}€</p>
                                                </Box>
                                            :
                                                <p className={classes.PriceText}>{getPrice()}€</p>
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Hidden>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Grid container spacing={2}>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Button variant="contained" color="primary" className={classes.buttonCancel} onClick={() => {
                                        handleClose();
                                        history.push('/products');
                                    }}>
                                        Tęsti apsipirkimą
                                    </Button>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Button variant="contained" color="primary" className={classes.buttonDelete} onClick={() => {
                                        handleClose();
                                        history.push('/cart');
                                    }}>
                                        Eiti į krepšelį
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box> 
                </Box>
            </Fade>
        </Modal>
    )
}

export default ProductAddedModal
