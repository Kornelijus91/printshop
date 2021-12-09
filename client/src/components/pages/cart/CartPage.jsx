import { Box, Grid, Tooltip, Button, TextField, Collapse, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
// import Skeleton from '@material-ui/lab/Skeleton';
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import DeleteCartItemModal from './DeleteCartItemModal.jsx';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '80vh',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        justifyContent: 'center',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        padding: '0 1em',
        [theme.breakpoints.up('xl')]: {
            padding: '0',
        },
    },
    body: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    header: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem'
        },
    },
    headerSmall: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem'
        },
    },
    cartItemParent: {
        width: '100%',
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '5px',
        padding: '1em',
        marginBottom: '1em',
        '& h2': {
            padding: 0,
            margin: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            padding: '1.35em',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            borderRadius: '10px',
            padding: '2em',
            marginBottom: '2em',
        },
    },
    pdf: {
        width: '100%',
        // height: '20rem',
        objectFit: 'fill',
    },
    image: {
        width: '100%',
        // maxHeight: '30rem',
        objectFit: 'fill',
        // [theme.breakpoints.up('xxl')]: {
        //     maxHeight: '45rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     maxHeight: '60rem',
        // },
    },
    imageBox: {
        width: '100%',
    },
    summaryText: {
        padding: '0',
        margin: '0 0 .3rem 0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 .45rem 0',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 .6rem 0',
            fontSize: '1.7rem',
        },
    },
    discountText: {
        padding: '0',
        margin: '0 0 .3rem 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 .45rem 0',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 .6rem 0',
            fontSize: '1.7rem',
        },
    },
    PriceText: {
        padding: '0',
        margin: '0 .7rem .3rem 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem .45rem 0',
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem .6rem 0',
            fontSize: '2.4rem',
        },
    },
    savingsText: {
        padding: '0',
        margin: '0 .7rem 1rem 0',
        overflowWrap: 'break-word',
        fontSize: '1rem',
        fontWeight: 'bold',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 1.35rem 0',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 2rem 0',
            fontSize: '2rem',
        },
    },
    Isbraukta: {
        padding: '0',
        margin: '0 .7rem .3rem 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: 'rgba(230, 57, 70, 0.8)',
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem .45rem 0',
            fontSize: '1.8rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem .6rem 0',
            fontSize: '2.4rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
    },
    DiscountedPriceText: {
        padding: '0',
        margin: '0 .7rem .3rem 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem .45rem 0',
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem .6rem 0',
            fontSize: '2.4rem',
        },
    },
    skeleton: {
        height: 250,
        [theme.breakpoints.up('xxl')]: {
            height: 375,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 500,
        },
    },
    icon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        // transform: 'scale(0.7)',
        '&:hover': {
            cursor: "pointer",
            color: '#264673',
        },
        // [theme.breakpoints.up('xs')]: {
        //     transform: 'scale(1)'
        // },
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    buttonIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    editIconBox: {
        padding: '.11em .5em',
        [theme.breakpoints.up('xs')]: {
            padding: '.11em 1em',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '.149em 1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.22em 2em',
        },
    },
    sumupBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: "wrap",
        marginBottom: '2em',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '2.7em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '4em',
        },
    },
    button: {
        width: '100%',
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
    buttonDisabled: {
        color: theme.myTheme.trecia,
    },
    nuolaidosKodasBox: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20em',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '27em',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '40em',
        },
    },
    pradetipirkimaBox: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'unset',
        },
    },
    pastaba: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '4px',
        width: '100%',
        marginBottom: '1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            marginBottom: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            marginBottom: '2rem',
        },
    },
    cssOutlinedInput2: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            padding: '.5rem 1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.9rem',
            padding: '1rem 1.5rem'
        },
    },
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    alert: {
        width: '100%',
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
            marginBottom: '1.35rem',
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
            transform: 'scale(1.35)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    loadingIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
}));

const CartPage = ({ cart, getCart, loyaltydiscount, setCart, priceSum, kodoNuolaida, setKodoNuolaida }) => {

    const classes = useStyles();
    const history = useHistory();

    // const [imgLoaded, setImgLoaded] = useState({});
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        itemID: '',
        deleting: false,
        name: ''
    });
    const [nuolaidosKodas, setNuolaidosKodas] = useState('');
    const [chekingCode, setChekingCode] = useState(false);
    const [alert, setAlert] = useState('');

    const handleNuolaidosKodasChange = (e) => {
        setNuolaidosKodas(e.target.value);
    };

    const applyDiscountCode = async () => {
        setAlert('');
        setChekingCode(true);
        try {
            const res = await fetch("/users/applyDiscountCode/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    code: nuolaidosKodas,
                }),
            });
            const response = await res.json();
            if (response.success) {
                setChekingCode(false);
                if (response.success && response.error === '') {
                    setChekingCode(false);
                    setKodoNuolaida({
                        kodas: response.code,
                        nuolaida: response.discount
                    });
                } else {
                    setAlert(response.error);
                    setChekingCode(false);
                    setKodoNuolaida({
                        kodas: '',
                        nuolaida: 0
                    });
                }
            } else {
                setAlert('Klaida! Pabandykite vėliau.');
                setChekingCode(false);
            }
        } catch (error) {
            setAlert('Klaida! Pabandykite vėliau.');
            setChekingCode(false);
        }
    };

    const shouldShow = (option, summon, name) => {
        for (const item of option) {
            if (item.summon === summon && item.name !== name) {
                return true;
            }
        }
        return false;
    };

    // const imageLoadedSet = (indx) => {
    //     setImgLoaded({
    //         ...imgLoaded,
    //         [indx]: true
    //     });
    // };

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Krepšelis | {ProjectName}</title>  
            </Helmet>
            <DeleteCartItemModal 
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                getCart={getCart}
                setCart={setCart}
            />
            <Box classes={{root: classes.body}}>
                <h1 className={classes.header}>Krepšelis</h1>
                {cart.length > 0 ? 
                    <>
                    {cart.map((item, index) => 
                        <Box classes={{root: classes.cartItemParent}} key={index}>
                            <Grid container direction="row" justifyContent="space-between">
                                <Grid item xl={10} lg={10} md={10} sm={10} xs={9}>
                                    <h2 className={classes.headerSmall}>{item.name}</h2>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                        <Tooltip title="Redaguoti" aria-label="Redaguoti" placement="top" arrow >
                                            <Box classes={{root: classes.editIconBox}}> 
                                                <AiFillEdit size={20} className={classes.icon} onClick={() => history.push(`/products/${encodeURIComponent(item.name)}/${item._id}`)}/>
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title="Ištrinti" aria-label="Ištrinti" placement="top" arrow >
                                            <Box>
                                                <IoClose 
                                                    size={25} 
                                                    className={classes.icon}
                                                    onClick={() => setDeleteModal({
                                                        open: true,
                                                        itemID: item._id,
                                                        deleting: false,
                                                        name: item.name
                                                    })}
                                                />
                                            </Box>
                                        </Tooltip> 
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                                    <Box classes={{root: classes.imageBox}}>
                                        {/* {!imgLoaded[index] && <Skeleton variant="rect" classes={{root: classes.skeleton}}/>} */}
                                        {item.image.substring(item.image.lastIndexOf(".")) === '.pdf' ? 
                                            <embed src={`${item.image}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} /> //onLoad={() => imageLoadedSet(index)}
                                        : 
                                            <img className={classes.image} src={item.image} alt="" /> //onLoad={() => imageLoadedSet(index)}
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                                    {item.options.map((opt, i) => 
                                        <>
                                            {(opt.type === 0 || opt.type === 2) && (!opt.summon || opt.summon === 0) ? 
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.value}</b></p>
                                            : (opt.type === 0 || opt.type === 2) && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) ?
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.value}</b></p>
                                            : opt.type === 1 && (!opt.summon || opt.summon === 0) ?
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}, {opt.secondName}- {opt.secondValue}</b></p>
                                            : opt.type === 1 && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) ?
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}, {opt.secondName}- {opt.secondValue}</b></p>
                                            : opt.type === 3 && (!opt.summon || opt.summon === 0) ?
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}</b></p>
                                            : opt.type === 3 && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) &&
                                                <p key={i} className={classes.summaryText}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}</b></p>
                                            }
                                        </>
                                    )}
                                    <p className={classes.summaryText}>Gamybos Laikas: <b>{item.gamybosLaikas}</b></p>
                                    <p className={classes.summaryText}>Kiekis: <b>{item.quantity}</b></p>
                                    <p className={classes.summaryText}>Vieneto kaina: <b>{item.unitPrice.toFixed(2)}€</b></p>
                                    {item.pastaba !== '' &&
                                        <p className={classes.summaryText}>Pastaba: <b>{item.pastaba}</b></p>
                                    }
                                </Grid>
                                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                    {item.discountedPrice !== item.price &&
                                        <p className={classes.discountText}>Nuolaida: <b>{item.discount}%</b></p>
                                    }
                                    <p className={classes.discountText}>Tavo reklama klubo nuolaida: <b>{loyaltydiscount}%</b></p>
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                        <p className={classes.PriceText}>Kaina:</p>
                                        {item.discountedPrice !== item.price && loyaltydiscount <= 0 ? 
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <span className={classes.Isbraukta}>{item.price.toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{item.discountedPrice.toFixed(2)}€</p>
                                            </Box>
                                        : item.discountedPrice !== item.price && loyaltydiscount > 0 ?
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <span className={classes.Isbraukta}>{item.price.toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{(item.price * ((100 - loyaltydiscount - item.discount) / 100)).toFixed(2)}€</p>
                                            </Box>
                                        : item.discountedPrice === item.price && loyaltydiscount > 0 ?
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <span className={classes.Isbraukta}>{item.price.toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{(item.price * ((100 - loyaltydiscount) / 100)).toFixed(2)}€</p>
                                            </Box>
                                        :
                                            <p className={classes.PriceText}>{item.price.toFixed(2)}€</p>
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    </>
                :
                    <Box classes={{root: classes.cartItemParent}}>
                        <h2 className={classes.header}>Krepšelis tuščias.</h2>
                    </Box>
                }
                <Box classes={{root: classes.sumupBox}}>
                    <Box classes={{root: classes.nuolaidosKodasBox}}>
                        <p className={classes.PriceText}>Nuolaidos kodas:</p>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <TextField 
                            id="nuolaidos_kodas" 
                            variant="outlined" 
                            classes={{root: classes.pastaba}}
                            value={nuolaidosKodas}
                            onChange={handleNuolaidosKodasChange}
                            // type='number'
                            // style={{marginBottom: '1rem'}}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput2,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        />
                        <Button variant="contained" color="primary" classes={{root: classes.button, label: classes.buttonDisabled}} disabled={cart.length <= 0 || chekingCode} onClick={applyDiscountCode}>
                            {chekingCode ? <CircularProgress size={20} className={classes.loadingIcon}/> : 'Pritaikyti'}
                        </Button>
                    </Box>
                    <Box classes={{root: classes.pradetipirkimaBox}}>
                        <Collapse in={kodoNuolaida.nuolaida > 0}>
                            <p className={classes.DiscountedPriceText}>Nuolaida su kodu {kodoNuolaida.kodas}: -{kodoNuolaida.nuolaida}%</p>
                        </Collapse>
                        <Box display='flex' justifyContent='flex-start' alignItems='flex-end'>
                            <p className={classes.PriceText}>Viso kaina su PVM:</p>
                            {priceSum.sum !== priceSum.dscSum ?
                                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                    <span className={classes.Isbraukta}>{priceSum.sum.toFixed(2)}€</span>
                                    <p className={classes.DiscountedPriceText}>{priceSum.dscSum.toFixed(2)}€</p>
                                </Box>
                            :
                                <p className={classes.PriceText}>{priceSum.sum.toFixed(2)}€</p>
                            }
                        </Box>
                        {priceSum.sum !== priceSum.dscSum &&
                            <p className={classes.savingsText}>Sutaupote: {(priceSum.sum - priceSum.dscSum).toFixed(2)}€</p>
                        }
                        <Button 
                            variant="contained" 
                            color="primary" 
                            classes={{root: classes.button, label: classes.buttonDisabled}} 
                            disabled={cart.length <= 0} 
                            onClick={() => {history.push('/order'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}
                            endIcon={<FaArrowRight size={17} className={classes.buttonIcon}/>}
                        >
                            Pradėti pirkimą
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CartPage
