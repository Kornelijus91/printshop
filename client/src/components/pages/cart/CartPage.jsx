import { Box, Grid, Tooltip, Button, TextField, Collapse, CircularProgress, ListItemText, ListItem, MenuItem, Select, FormControl } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import DeleteCartItemModal from './DeleteCartItemModal.jsx';
import { useHistory } from 'react-router-dom';
import picturePlaceHolder from '../../../media/picturePlaceHolder.png'

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
        objectFit: 'fill',
    },
    imagePlaceHolder: {
        width: '100%',
        padding: '0 2em',
        objectFit: 'fill',
        [theme.breakpoints.up('xxl')]: {
            padding: '0 2.7em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 4em',
        },
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
        marginBottom: "1rem",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.35rem",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
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
        marginBottom: '1rem',
        [theme.breakpoints.up('md')]: {
            width: '21.5%',
            marginBottom: '0',
        },
        // [theme.breakpoints.up('xxl')]: {
        //     width: '27em',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     width: '40em',
        // },
    },
    pradetipirkimaBox: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '32%',
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
    formVariantSelect: {
        width: '100%',
        marginBottom: '1rem',
        
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
            fontSize: '1.9rem',
        },
    },
    variantSelect: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        margin: '0',
        padding: '0',
        minHeight: '3.5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.sriftoSpalva}`,

        },
        [theme.breakpoints.up('xxl')]: {
            minHeight: '5.25rem',
            borderRadius: '7px',
            '&:focus': {
                 borderRadius: '7px',
            }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            minHeight: '7rem',
            borderRadius: '9px',
            '&:focus': {
                borderRadius: '9px',
                border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            }, 
        },
    },
    variantSelectIcon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto',
        [theme.breakpoints.up('xxl')]: {
            maxHeight: '33rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxHeight: '44rem',
            borderRadius: '9px',
        },
    },
    selectRenderBox: {
        paddingLeft: '1rem',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '2rem',
        },
    },
    selectRenderValue: {
        fontSize: '.8rem',
        [theme.breakpoints.up('lg')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.25rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    menuItem: {
        width: '100%',
        overflowWrap: 'break-word',
    },
    listItem: {
        margin: '0 1rem 0 1rem',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.5rem 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 2rem 0 2rem',
        },
    },
    primaryListText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        maxWidth: '13rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            maxWidth: '20rem',
            margin: '1rem 0'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            maxWidth: '26rem',
            margin: '1.5rem 0'
        },
    },
}));

const CartPage = ({ pasirinktasPristatymoBudas, setPasirinktasPristatymoBudas, kodoNuolaida, roundTwoDec, pasirinktasGamybosLaikas, setPasirinktasGamybosLaikas, gamybosLaikas, setGamybosLaikas, cart, getCart, setCart, priceSum, setKodoNuolaida, findMaxDiscount, getItemProductionCost }) => { 

    const classes = useStyles();
    const history = useHistory();
    
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

    const handleGamybosLaikasChange = (e) => {
        setPasirinktasGamybosLaikas(e.target.value);
    };

    const handlePasirinktasPristatymoBudas = (e) => {
        setPasirinktasPristatymoBudas(e.target.value);
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

    useEffect(() => {
        setPasirinktasGamybosLaikas('3-5 darbo dienos.');
        if (cart.length > 0) {
            var one = false;
            var two = false;
            for (const cartItem of cart) {
                if (cartItem.quantity > cartItem.oneDayLimit) {
                    one = true;
                }
                if (cartItem.quantity > cartItem.twoDayLimit) {
                    two = true;
                }
            }
            setGamybosLaikas({
                fivedays: false,
                twodays: two,
                oneday: one,
            });
        } else {
            setGamybosLaikas({
                fivedays: false,
                twodays: false,
                oneday: false,
            });
        }
        // eslint-disable-next-line
    }, [cart]);

    useEffect(() => {
        if (kodoNuolaida.kodas !== '') {
            setNuolaidosKodas(kodoNuolaida.kodas);
        }
        // eslint-disable-next-line
    }, []);

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
                                                <AiFillEdit 
                                                    size={20} 
                                                    className={classes.icon} 
                                                    onClick={() => {
                                                        history.push(`/products/${encodeURIComponent(item.name)}/${item._id}`);
                                                        window.scrollTo({top: 0, left: 0});
                                                    }}
                                                />
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
                                    {item.image !== '' ? 
                                        <Box classes={{root: classes.imageBox}}>
                                                {item.image.substring(item.image.lastIndexOf(".")) === '.pdf' ? 
                                                <embed src={`${item.image}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} /> //onLoad={() => imageLoadedSet(index)}
                                            : 
                                                <img className={classes.image} src={`${item.image}?${+ new Date().getTime()}`} alt="" /> //onLoad={() => imageLoadedSet(index)}
                                            }
                                        </Box>
                                    :
                                        <Box classes={{root: classes.imageBox}}>
                                            <img className={classes.imagePlaceHolder} src={picturePlaceHolder} alt="" />
                                        </Box>
                                    } 
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
                                    {/* <p className={classes.summaryText}>Gamybos Laikas: <b>{item.gamybosLaikas}</b></p> */}
                                    <p className={classes.summaryText}>Kiekis: <b>{item.quantity}</b></p>
                                    <p className={classes.summaryText}>Vieneto kaina: <b>{item.unitPrice.toFixed(2)}€</b></p>
                                    {item.maketavimoKaina > 0 &&
                                        <p className={classes.summaryText}>Maketavimas: <b>{item.maketavimoKaina}€</b></p>
                                    }
                                    {item.pastaba !== '' &&
                                        <p className={classes.summaryText}>Pastaba: <b>{item.pastaba}</b></p>
                                    }
                                </Grid>
                                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                    {findMaxDiscount(item.discount)[1] > 0 &&
                                        <p className={classes.discountText}>{findMaxDiscount(item.discount)[0]}: <b>{findMaxDiscount(item.discount)[1]}%</b></p>
                                    }
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                        <p className={classes.PriceText}>Kaina:</p>
                                        {findMaxDiscount(item.discount)[1] > 0 ? 
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <span className={classes.Isbraukta}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) + item.maketavimoKaina).toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) * (1 - (findMaxDiscount(item.discount)[1] / 100)) + item.maketavimoKaina).toFixed(2)}€</p>
                                            </Box>
                                        : 
                                            <p className={classes.PriceText}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) + item.maketavimoKaina).toFixed(2)}€</p>
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') applyDiscountCode();
                            }}
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
                    <Box classes={{root: classes.nuolaidosKodasBox}} >
                        <p className={classes.PriceText}>Gamybos laikas:</p>
                        <FormControl classes={{root: classes.formVariantSelect}} focused={false} disabled={cart.length <= 0}>
                            <Select
                                id="simple-select-outlined"
                                variant='outlined'
                                classes={{
                                    outlined: classes.variantSelect, 
                                    iconOutlined: classes.variantSelectIcon,
                                }}
                                value={pasirinktasGamybosLaikas}
                                onChange={handleGamybosLaikasChange}
                                defaultValue={pasirinktasGamybosLaikas}
                                MenuProps={{ classes: { list: classes.menuPaper } }}
                                renderValue={(value) => 
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.selectRenderBox}}>
                                        <p className={classes.selectRenderValue}>{value}</p>
                                    </Box>
                                }
                            >
                               
                                <MenuItem value={'3-5 darbo dienos.'} classes={{root: classes.menuItem}} disabled={gamybosLaikas.fivedays}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'3-5 darbo dienos.'} 
                                        />
                                    </ListItem>
                                </MenuItem>

                                <MenuItem value={'1-2 darbo dienos.'} classes={{root: classes.menuItem}} disabled={gamybosLaikas.twodays}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'1-2 darbo dienos.'} 
                                        />
                                    </ListItem>
                                </MenuItem>

                                <MenuItem value={'Iki 24H.'} classes={{root: classes.menuItem}} disabled={gamybosLaikas.oneday}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'Iki 24H.'} 
                                        />
                                    </ListItem>
                                </MenuItem>
                                
                            </Select>
                        </FormControl>
                    </Box>
                    <Box classes={{root: classes.nuolaidosKodasBox}} >
                        <p className={classes.PriceText}>Pristatymo būdas:</p>
                        <FormControl classes={{root: classes.formVariantSelect}} focused={false} disabled={cart.length <= 0}>
                            <Select
                                id="simple-select-outlined-2"
                                variant='outlined'
                                classes={{
                                    outlined: classes.variantSelect, 
                                    iconOutlined: classes.variantSelectIcon,
                                }}
                                value={pasirinktasPristatymoBudas}
                                onChange={handlePasirinktasPristatymoBudas}
                                defaultValue={pasirinktasPristatymoBudas}
                                MenuProps={{ classes: { list: classes.menuPaper } }}
                                renderValue={(value) => 
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.selectRenderBox}}>
                                        <p className={classes.selectRenderValue}>{value}</p>
                                    </Box>
                                }
                            >
                               
                                <MenuItem value={'Kurjeriu, nurodytu adresu.'} classes={{root: classes.menuItem}}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'Kurjeriu, nurodytu adresu.'} 
                                        />
                                    </ListItem>
                                </MenuItem>

                                <MenuItem value={'Į artimiausią paštomatą.'} classes={{root: classes.menuItem}}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'Į artimiausią paštomatą.'} 
                                        />
                                    </ListItem>
                                </MenuItem>

                                <MenuItem value={'Autobusu.'} classes={{root: classes.menuItem}}>
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemText 
                                            classes={{
                                                primary: classes.primaryListText,
                                            }}
                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                            primary={'Autobusu.'} 
                                        />
                                    </ListItem>
                                </MenuItem>
                                
                            </Select>
                        </FormControl>
                    </Box>
                    <Box classes={{root: classes.pradetipirkimaBox}}>
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
                            onClick={() => {history.push('/order'); window.scrollTo({top: 0, left: 0});}}
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
