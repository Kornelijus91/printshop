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
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    header: {
        fontSize: theme.myTheme.sizeXL,
    },
    headerSmall: {
        fontSize: theme.myTheme.sizeMM,
    },
    cartItemParent: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        border: `.1em solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        padding: '1em',
        marginBottom: '1em',
        '& h2': {
            padding: 0,
            margin: 0,
        },
    },
    pdf: {
        width: '100%',
        objectFit: 'fill',
    },
    image: {
        width: '100%',
        objectFit: 'fill',
    },
    imagePlaceHolder: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        padding: '0 2em',
        objectFit: 'fill',
    },
    imageBox: {
        width: '100%',
    },
    summaryText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
    },
    discountText: {
        fontSize: theme.myTheme.sizeS,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.sZalia.main,
    },
    PriceTextSmall: {
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeM,
        fontWeight: 'bold',
    },
    PriceText: {
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
    },
    savingsText: {
        padding: '0',
        margin: '0 .7em 1em 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeM,
        fontWeight: 'bold',
    },
    Isbraukta: theme.myTheme.isbraukta,
    DiscountedPriceText: {
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.main,
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
        color: theme.myTheme.juoda,
        margin: '0',
        '&:hover': {
            cursor: "pointer",
            color: '#264673',
        },
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    buttonIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    editIconBox: {
        fontSize: theme.myTheme.sizeM,
        padding: '.11em .5em',
        [theme.breakpoints.up('xs')]: {
            padding: '.11em 1em',
        },
    },
    sumupBox: {
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: "wrap",
        marginBottom: '2em',
    },
    button: theme.myTheme.button,
    buttonActualyDisabled: {
        backgroundColor: theme.myTheme.sZalia.light,
    },
    buttonDisabled: {
        color: theme.myTheme.balta,
    },
    nuolaidosKodasBox: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            width: '21.5%',
            marginBottom: '0',
        },
    },
    pradetipirkimaBox: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '32%',
        },
    },
    pastaba: {
        fontSize: theme.myTheme.sizeM,
        border: `.1em solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        marginBottom: '1em',
    },
    cssOutlinedInput2: theme.myTheme.cssOutlinedInput2,
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    alert: theme.myTheme.alert,
    alertBox: theme.myTheme.alertBox,
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    loadingIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    formVariantSelect: theme.myTheme.formVariantSelect,
    variantSelect: {
        fontSize: 'clamp(1rem, 0.8vw, 2rem)',
        color: '#000000',
        fontFamily: "'GilroyLight', Helvetica, sans-serif", 
        margin: '0',
        padding: '0',
        height: '3em',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        border: '1px solid #000000',
        borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
        '&:focus': {
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
            border: '1px solid #000000',
        },
        [theme.breakpoints.up('xxl')]:{
            border: '1.4px solid #000000',
            '&:focus': {
                border: '1.4px solid #000000',
            },
        },
        [theme.breakpoints.up('xxxl')]:{
            border: '2px solid #000000',
            '&:focus': {
                border: '2px solid #000000',
            },
        },
    },
    variantSelectIcon: theme.myTheme.variantSelectIcon,
    menuPaper: theme.myTheme.menuPaper,
    selectRenderBox: {
        fontSize: theme.myTheme.sizeM,
        paddingLeft: '1em',
    },
    selectRenderValue: {
        fontSize: theme.myTheme.sizeM,
    },
    menuItem: {
        width: '100%',
        overflowWrap: 'break-word',
    },
    listItem: {
        fontSize: theme.myTheme.sizeM,
        margin: '0 1em 0 1em',
        padding: '0',
        overflowWrap: 'break-word',
    },
    primaryListText: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        maxWidth: '13em',
    },
}));

const CartPage = ({ pasirinktasPristatymoBudas, setPasirinktasPristatymoBudas, kodoNuolaida, roundTwoDec, pasirinktasGamybosLaikas, setPasirinktasGamybosLaikas, gamybosLaikas, setGamybosLaikas, cart, getCart, setCart, priceSum, setKodoNuolaida, findMaxDiscount, getItemProductionCost, params }) => { 

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

        switch(e.target.value) {
            case 'Kurjeriu, nurodytu adresu.':
                setPasirinktasPristatymoBudas({
                    name: e.target.value,
                    price: params.shippingHome
                });
                break;
            case 'Į artimiausią paštomatą.':
                setPasirinktasPristatymoBudas({
                    name: e.target.value,
                    price: params.shippingTeleport
                });
                break;
            default:
                setPasirinktasPristatymoBudas({
                    name: e.target.value,
                    price: params.shippingBus
                });
                break;
        };
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
                        <Button variant="contained" color="primary" classes={{root: classes.button, label: classes.buttonDisabled, disabled: classes.buttonActualyDisabled}} disabled={cart.length <= 0 || chekingCode} onClick={applyDiscountCode}>
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
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start' classes={{root: classes.selectRenderBox}}>
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
                                value={pasirinktasPristatymoBudas.name}
                                onChange={handlePasirinktasPristatymoBudas}
                                defaultValue={pasirinktasPristatymoBudas.name}
                                MenuProps={{ classes: { list: classes.menuPaper } }}
                                renderValue={(value) => 
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start' classes={{root: classes.selectRenderBox}}>
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
                        <Box display='flex'>
                            <p className={classes.PriceTextSmall}>Pristatymo kaina:</p>
                            <p className={classes.PriceTextSmall}>{pasirinktasPristatymoBudas.price.toFixed(2)} €</p>
                        </Box>
                        <Box display='flex' justifyContent='flex-start' alignItems='flex-end'>
                            <p className={classes.PriceText}>Viso kaina su PVM:</p>
                            {priceSum.sum !== priceSum.dscSum ?
                                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                    <span className={classes.Isbraukta}>{priceSum.sum.toFixed(2)}€</span>
                                    <p className={classes.DiscountedPriceText}>{priceSum.dscSum.toFixed(2)} €</p>
                                </Box>
                            :
                                <p className={classes.PriceText}>{priceSum.sum.toFixed(2)} €</p>
                            }
                        </Box>
                        {priceSum.sum !== priceSum.dscSum &&
                            <p className={classes.savingsText}>Sutaupote: {(priceSum.sum - priceSum.dscSum).toFixed(2)} €</p>
                        }
                        <Button 
                            variant="contained" 
                            color="primary" 
                            classes={{root: classes.button, label: classes.buttonDisabled, disabled: classes.buttonActualyDisabled}} 
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
