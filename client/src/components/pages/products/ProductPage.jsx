import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //Redirect
import { ListItemText, ListItem, MenuItem, Select, FormControl, Box, Grid, Breadcrumbs, Stepper, Step, StepLabel, Collapse, TextField, Button, Divider, Snackbar, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx' //ProjectURL
import { Link, useHistory } from 'react-router-dom'; // useHistory, useLocation 
import MuiAlert from '@material-ui/lab/Alert';
import NumberDoubleOption from './NumberDoubleOption.jsx';
import NumberOption from './NumberOption.jsx';
import PictureOption from './PictureOption.jsx'
import SelectOption from './SelectOption.jsx';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        minHeight: '50rem',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000'
    },
    header: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1.8rem',
        margin: '0',
        padding: '1rem 0 1rem 0'
    },
    content: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '94%',
        },
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    img: {
        height: '100%', 
        width: '100%', 
        objectFit: 'contain'
    },
    descText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.2rem',
        padding: '0',
        margin: '0',
        textAlign: 'justify',
        textJustify: 'inter-word'
    },
    stepText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        padding: '0',
        margin: '0'
    },
    pictureText: {
        textAlign: 'justify',
        textJustify: 'inter-word',
        padding: '0',
        margin: '0'
    },
    Stepper: {
        backgroundColor: 'transparent',
        padding: '4rem 0 1rem 0',
    },
    Step: {
        fontFamily: theme.myTheme.sriftas,
    },
    // gridItem: {
    //     padding: '0 .5rem 0 .5rem',
    // },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
    },
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    pastaba: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '4px',
        width: '100%',
    },
    OptionTitleHeader: {
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1rem',
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    input: {
        display: 'none',
    },
    uploadButton: {
        width: '100%',
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        margin: '.5rem 0 1rem 0'
    },
    middleBox: {
        width: '100%',
        height: '100%'
    },
    col1: {
        paddingRight: '1rem'
    },
    col2: {

    },
    col3: {
        paddingLeft: '1rem'
    },
    divider1: {
        marginRight: '1rem'
    },
    divider2: {
        marginLeft: '1rem'
    },
    image: {
        width: '100%',
        maxHeight: '30rem',
        objectFit: 'contain',
    },
    pdf: {
        width: '100%',
        // height: '20rem',
        objectFit: 'contain',
    },
    summaryText: {
        padding: '0',
        margin: '0 0 .3rem 0',
        overflowWrap: 'break-word',
    },
    discountText: {
        padding: '0',
        margin: '0 0 .3rem 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.pirma
    },
    PriceText: {
        padding: '0',
        margin: '0 .7rem .3rem 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold'
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
        }
    },
    DiscountedPriceText: {
        padding: '0',
        margin: '0 .7rem .3rem 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.myTheme.pirma
    },
    formVariantSelect: {
        width: '100%',
        marginBottom: '1rem',
        // [theme.breakpoints.up('sm')]: {
        //     width: '15rem',
        // },
        // [theme.breakpoints.up('md')]: {
        //     width: '14rem',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '21rem',
        // },
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
    },
    variantSelectIcon: {
        color: theme.myTheme.sriftoSpalva,
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto'
    },
    menuItem: {
        width: '100%',
        overflowWrap: 'break-word',
        // [theme.breakpoints.up('sm')]: {
        //     width: '15rem',
        // },
        // [theme.breakpoints.up('md')]: {
        //     width: '14rem',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '21rem',
        // },
    },
    listItem: {
        margin: '0 1rem 0 1rem',
        padding: '0',
        overflowWrap: 'break-word',
    },
    primaryListText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    icon: {
        color: theme.myTheme.trecia,
    },
}));

const ProductPage = ({ products, moneySpent, loyalty, loggedIn, token }) => {

    let { link } = useParams();
    const classes = useStyles();
    const history = useHistory();
    // const location = useLocation();

    const [product, setProduct] = useState({});
    const [optionsValues, setOptionsValues] = useState([]);
    const [select, setSelect] = useState([]);
    const [pastaba, setPastaba] = useState('');
    const [file, setFile] = useState({
        src: null,
        URL: '',
        type: '',
        size: 0,
        name: ''
    });
    const [snackbar, setSnackbar] = useState('');
    const [kiekis, setKiekis] = useState(1);
    const [unitPrice, setUnitPrice] = useState({
        price: 0,
        discount: 0
    });
    const [loyaltydiscount, setLoyaltydiscount] = useState(0);
    const [gamybosLaikas, setGamybosLaikas] = useState([]);
    const [amountArray, setAmountArray] = useState([]);
    const [pasirinktasGamybosLaikas, setPasirinktasGamybosLaikas] = useState('3-5 darbo dienos.');
    const [gamybosPabrangimas, setGamybosPabrangimas] = useState(1);

    const getPrice = () => {
        if (amountArray.length > 0) {
            if (kiekis <= amountArray[0].amount) {
                return Number((unitPrice.price * amountArray[0].amount) * gamybosPabrangimas).toFixed(2);
            } else {
                return Number((unitPrice.price * Math.round(kiekis)) * gamybosPabrangimas).toFixed(2);
            } 
        } 
    };

    const getDiscountedPrice = () => {
        if (amountArray.length > 0) {
            if (kiekis <= amountArray[0].amount) {
                return Number((unitPrice.price * amountArray[0].amount * (1 - ((amountArray[0].discount / 100) + (loyaltydiscount / 100)))) * gamybosPabrangimas).toFixed(2);
            } else {
                return Number((unitPrice.price * Math.round(kiekis) * (1 - ((unitPrice.discount / 100) + (loyaltydiscount / 100)))) * gamybosPabrangimas).toFixed(2);
            } 
        }
    };

    const handleGamybosLaikasChange = (e) => {
        setPasirinktasGamybosLaikas(e.target.value);
        if (gamybosLaikas.length > 0) {
            for (const item of gamybosLaikas) {
                if (item.name === e.target.value) {
                    setGamybosPabrangimas((item.price / 100) + 1);
                }
            }
        }
    };

    const handlePastabaChange = (e) => {
        setPastaba(e.target.value);
    };

    const handleKiekisChange = (e) => {
        setKiekis(e.target.value);
        gamybosLaikoKorekcija(Number(e.target.value));
    };

    const gamybosLaikoKorekcija = (quantity) => {
        if (pasirinktasGamybosLaikas === gamybosLaikas[1].name && gamybosLaikas[1].limit < quantity) {
            setPasirinktasGamybosLaikas(gamybosLaikas[0].name);
            setGamybosPabrangimas((gamybosLaikas[0].price / 100) + 1);
        } else if (pasirinktasGamybosLaikas === gamybosLaikas[2].name && gamybosLaikas[2].limit < quantity) {
            setPasirinktasGamybosLaikas(gamybosLaikas[1].name);
            setGamybosPabrangimas((gamybosLaikas[1].price / 100) + 1);
        }
    };

    const handleKiekisCorrection = () => {
        if (Number(kiekis) < amountArray[0].amount) {
            setKiekis(Math.round(amountArray[0].amount));
            gamybosLaikoKorekcija((Math.round(amountArray[0].amount)));
        } 
    };

    const handleOptionChange = (event, index) => {
        var copy = [...optionsValues];
        copy[index].value = product.options[index].menuOptions[event.target.value].variantName;
        copy[index].price = product.options[index].menuOptions[event.target.value].priceAdd;
        if (product.options[index].menuOptions[event.target.value].summonID) {
            copy[index].summonID = product.options[index].menuOptions[event.target.value].summonID;
        } else {
            copy[index].summonID = 0;
        }
        setOptionsValues(copy);
        var selectArrayCopy = select;
        selectArrayCopy[index] = event.target.value;
        setSelect(selectArrayCopy);
    };

    const collapseOpen = (id) => {
        for (const item of optionsValues) {
            if (item.summonID === id) {
                return true;
            }
        }
        return false;
    };

    const handleFile = (e) => {
        const imagefile = e.target.files[0];
        if (e.target.files.length > 1) {
            setSnackbar('Galima įkelti tik vieną failą.');
        } else if (imagefile.size > 104857600) {
            setSnackbar('Maksimalus failo dydis - 100 Megabaitų.');
        } else {
            setFile({
                src: imagefile,
                URL: URL.createObjectURL(imagefile),
                type: imagefile.type,
                size: imagefile.size,
                name: imagefile.name,
            });
        } 
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar('');
    };

    const addToCart = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file.src);
            formData.append('name', product.name);
            formData.append('productID', product._id);
            formData.append('id', '');
            formData.append('options', JSON.stringify(optionsValues));
            formData.append('pastaba', pastaba);
            formData.append('quantity', kiekis);
            formData.append('gamybosLaikas', pasirinktasGamybosLaikas);
            formData.append('discount', unitPrice.discount);
            formData.append('loyaltyDiscount', loyaltydiscount);
            if (unitPrice.discount > 0 || loyaltydiscount > 0) {
                formData.append('price', Number(getDiscountedPrice()));
            } else {
                formData.append('price', Number(getPrice()));
            }
            if (loggedIn)
            const res = await fetch("/users/addToCart/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `JWT ${token}`,
                },
                body: formData
            });
            const response = await res.json();
            console.log(response);
        } catch (error) {
            console.log('Klaida bandant pridėti į krepšelį!');
        }
    };

    useEffect(() => {
        if (products.length !== 0) {
            const result = products.find(obj => {
                return obj.link === encodeURIComponent(link)
            });
            if (result) {
                setProduct(result);
                var copy18 = [...optionsValues];
                for (const item of result.options) {
                    if (item.type === 0) {
                        copy18.push({
                            name: item.name,
                            value: item.menuOptions[0].variantName,
                            price: item.menuOptions[0].priceAdd,
                            summon: item.summon,
                            type: item.type,
                        });
                    } else if (item.type === 1) {
                        copy18.push({
                            name: item.name,
                            firstName: item.firstItemName,
                            firstValue: item.fistItemMinValue,
                            firstPrice: 0,
                            secondName: item.secondItemName,
                            secondValue: item.secondItemMinValue,
                            secondPrice: 0,
                            summon: item.summon,
                            type: item.type,
                        });
                    } else if (item.type === 2) {
                        copy18.push({
                            name: item.name,
                            value: item.menuOptions[0].variantName,
                            price: item.menuOptions[0].priceAdd,
                            summon: item.summon,
                            type: item.type,
                        });
                    } else if (item.type === 3) {
                        copy18.push({
                            name: item.name,
                            firstName: item.firstItemName,
                            firstValue: item.fistItemMinValue,
                            firstPrice: 0,
                            summon: item.summon,
                            type: item.type,
                        });
                    } 
                }
                setOptionsValues(copy18);
                var min = result.amountDiscount;
                if (min) {
                    min.sort(function (a, b) {
                        return a.amount - b.amount
                    });
                    setKiekis(min[0].amount);
                    setAmountArray(min);
                } else {
                    setKiekis(1);
                }
                setGamybosLaikas([
                    {
                        name: '3-5 darbo dienos.',
                        limit: Math.pow(10, 1000),
                        price: 0
                    },
                    {
                        name: '1-2 darbo dienos.',
                        limit: result.twoDayLimit,
                        price: result.twoDayPriceIncreace
                    },
                    {
                        name: 'Iki 24H.',
                        limit: result.oneDayLimit,
                        price: result.oneDayPriceIncreace
                    },
                ]);
            } else {
                history.push('/pageNotFound')
            }
        }
        // eslint-disable-next-line
    }, [products]);

    useEffect(() => {
        var unitPrice = 0;
        var addonPrice = 0;
        var unitDiscount = 0;
        if (amountArray.length > 0) {
            unitPrice = amountArray[0].price;
            unitDiscount = amountArray[0].discount;
        } 
        for (const x of amountArray) {
            if (x.amount <= kiekis) {
                unitPrice = x.price
                unitDiscount = x.discount;
            } 
        }
        for (const y of optionsValues) {
            if (y.type === 1) {
                addonPrice = addonPrice + y.firstPrice + y.secondPrice;
            } else if (y.type === 3) {
                addonPrice = addonPrice + y.firstPrice;
            } else {
                addonPrice = addonPrice + y.price;
            }
        }
        setUnitPrice({
            price: unitPrice + addonPrice,
            discount: unitDiscount
        });
        // eslint-disable-next-line
    }, [amountArray, kiekis, optionsValues]);

    useEffect(() => {
        if (loyalty.length > 0 && moneySpent > 0) {
            for (const item of loyalty) {
                if (item.money <= moneySpent) {
                    setLoyaltydiscount(item.discount);
                }
            }
        } else {
            setLoyaltydiscount(0);
        }
        // eslint-disable-next-line
    }, [loyalty, moneySpent]);

    return (
        <Box maxWidth='xl' classes={{root: classes.root}} >
            <Helmet>
                <title>{product.name} | {ProjectName}</title>  
            </Helmet>
            <Snackbar open={snackbar !== ''} autoHideDuration={5000} onClose={handleClose}> 
                <Alert severity="warning">{snackbar}</Alert>
            </Snackbar>
            <Box display='flex' justifyContent='center' style={{paddingBottom: '2rem'}}>
                <Box classes={{root: classes.content}}>
                    <Breadcrumbs aria-label="breadcrumb" style={{margin: '1rem 0 0 0'}}>
                        <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                        <Link to='/products' className={classes.breadcrumbLink}>Produktai</Link>
                        <Link to={`/products/${encodeURIComponent(link)}`} className={classes.breadcrumbLinkDisabled}>{product.name}</Link>
                    </Breadcrumbs>
                    <Grid container style={{margin: '0'}}>
                        <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                            <Box display='flex' justifyContent='flex start'>
                                {/* Object.keys(product).length !== 0 &&  */}
                                <h1 className={classes.header}>{product.name}</h1> 
                            </Box>
                            <Box display='flex' justifyContent='flex start'>
                                <p className={classes.descText}>{product.description}</p>
                            </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                            <Box display='flex' justifyContent='center' alignItems='flex-start' style={{padding: '0 2rem 0 2rem'}}>
                                <img src={product.image} alt={product.name} className={classes.img}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Stepper alternativeLabel activeStep={0} classes={{root: classes.Stepper}}>
                        <Step active={true}>
                            <StepLabel 
                                StepIconProps={{ 
                                    classes: { text: classes.Step } 
                                }}
                            >
                                <p className={classes.stepText}>Pasirinkite produkto parametrus</p>
                            </StepLabel>
                        </Step>
                        <Step active={true}>
                            <StepLabel 
                                StepIconProps={{ 
                                    classes: { text: classes.Step } 
                                }}
                            >
                                <p className={classes.stepText}>Įkelkite failą</p>
                            </StepLabel>
                        </Step>
                        <Step active={true}>
                            <StepLabel 
                                StepIconProps={{ 
                                    classes: { text: classes.Step } 
                                }}
                            >
                                <p className={classes.stepText}>Pasirinkite kiekį, gamybos laiką ir užsakykite</p>
                            </StepLabel>
                        </Step>
                    </Stepper>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.col1} >
                            {Object.keys(product).length > 0 &&
                                <Box>
                                    {product.options.map((item, index) => 
                                        <>
                                        {item.type === 0 && (!item.summon || item.summon === 0) ? 
                                            <SelectOption 
                                                index={index} 
                                                product={product}
                                                handleOptionChange={handleOptionChange}
                                                select={select}
                                            />
                                        : item.type === 0 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <SelectOption 
                                                    index={index} 
                                                    product={product}
                                                    handleOptionChange={handleOptionChange}
                                                    select={select}
                                                />
                                            </Collapse>
                                        : item.type === 1 && (!item.summon || item.summon === 0) ? 
                                            <NumberDoubleOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        : item.type === 1 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <NumberDoubleOption 
                                                    optionsValues={optionsValues} 
                                                    setOptionsValues={setOptionsValues} 
                                                    index={index} 
                                                    product={product}
                                                />
                                            </Collapse>
                                        : item.type === 2 && (!item.summon || item.summon === 0) ? 
                                            <PictureOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        : item.type === 2 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <PictureOption 
                                                    optionsValues={optionsValues} 
                                                    setOptionsValues={setOptionsValues} 
                                                    index={index} 
                                                    product={product}
                                                />
                                            </Collapse>
                                        : item.type === 3 && (!item.summon || item.summon === 0) ?
                                            <NumberOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        : item.type === 3 && item.summon && item.summon !== 0 &&
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <NumberOption 
                                                    optionsValues={optionsValues} 
                                                    setOptionsValues={setOptionsValues} 
                                                    index={index} 
                                                    product={product}
                                                />  
                                            </Collapse>
                                        }
                                        </>
                                    )}
                                    <h2 className={classes.OptionTitleHeader}>Pastaba</h2>
                                    <TextField 
                                        id="pastaba" 
                                        variant="outlined" 
                                        classes={{root: classes.pastaba}}
                                        multiline
                                        rows={2}
                                        placeholder='Čia galite palikti pastabą susijusią su produkto gamyba.'
                                        value={pastaba}
                                        onChange={handlePastabaChange}
                                        InputProps={{
                                            classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    />
                                </Box>
                            }
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4} >
                            <Box display='flex' justifyContent='center' alignItems='flex-start' classes={{root: classes.middleBox}}>
                                <Divider orientation="vertical" flexItem classes={{root: classes.divider1}}/>
                                <Box style={{width: '100%'}}>
                                    <Box>
                                        { file.URL ? 
                                            <Box>
                                                {file.type === 'application/pdf' ? 
                                                    <embed src={`${file.URL}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} />
                                                : 
                                                    <img className={classes.image} src={file.URL} alt=""/>
                                                }
                                            </Box>
                                        :
                                            <p className={classes.pictureText}>
                                                Priimame visus paveikslėlių failo formatus ir PDF formatą. Rekomenduojame PDF formatą. Jeigu gaminys turi daugiau negu vieną paveikslėlį, paruoškite failą PDF formatu. Abu paveikslėliai turi būti pateikti viename PDF faile. Maksimalus failo dydis 100MB.
                                            </p>
                                        }
                                    </Box>
                                    <Box>     
                                        { file.src !== null && file.URL ?
                                            <label htmlFor="upload_product_icon">
                                                <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton}} startIcon={<FaExchangeAlt size={17} className={classes.icon}/>}>
                                                    Pakeisti
                                                </Button>
                                            </label>
                                        : 
                                            <label htmlFor="upload_product_icon">
                                                <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton}} startIcon={<AiOutlineCloudUpload size={27} className={classes.icon}/>}>
                                                    Įkelti
                                                </Button>
                                            </label>
                                        }
                                        <input
                                            type="file" 
                                            accept="image/*, .pdf"
                                            className={classes.input}
                                            name="photo"
                                            id="upload_product_icon"
                                            onChange={handleFile}
                                        />
                                    </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem classes={{root: classes.divider2}}/>
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.col3}>
                            <h2 className={classes.OptionTitleHeader}>Kiekis</h2>
                            <ClickAwayListener onClickAway={handleKiekisCorrection}>
                                <TextField 
                                    id="kiekis" 
                                    variant="outlined" 
                                    classes={{root: classes.pastaba}}
                                    value={kiekis}
                                    onChange={handleKiekisChange}
                                    type='number'
                                    style={{marginBottom: '1rem'}}
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        },
                                    }}
                                />
                            </ClickAwayListener>
                            <h2 className={classes.OptionTitleHeader}>Gamybos laikas</h2>
                            <FormControl variant="outlined" classes={{root: classes.formVariantSelect}} focused={false}>
                                <Select
                                    id="simple-select-outlined"
                                    variant='outlined'
                                    classes={{outlined: classes.variantSelect, iconOutlined: classes.variantSelectIcon}}
                                    value={pasirinktasGamybosLaikas}
                                    onChange={handleGamybosLaikasChange}
                                    defaultValue={pasirinktasGamybosLaikas}
                                    MenuProps={{ classes: { list: classes.menuPaper } }}
                                   
                                >
                                    {gamybosLaikas.map((item) => 
                                        <MenuItem value={item.name} classes={{root: classes.menuItem}} disabled={item.limit < kiekis}>
                                            <ListItem classes={{root: classes.listItem}}>
                                                <ListItemText 
                                                    classes={{
                                                        primary: classes.primaryListText,
                                                    }}
                                                    style={{maxWidth: '13rem'}}
                                                    primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                    primary={item.name} 
                                                />
                                            </ListItem>
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {optionsValues.map((item, index) => 
                                <>
                                    {item.type === 0 && (!item.summon || item.summon === 0) ? 
                                        <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                    : item.type === 0 && item.summon && item.summon !== 0 ? 
                                        <Collapse in={collapseOpen(item.summon)}>
                                            <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                        </Collapse>
                                    : item.type === 1 && (!item.summon || item.summon === 0) ? 
                                        <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</p>
                                    : item.type === 1 && item.summon && item.summon !== 0 ? 
                                        <Collapse in={collapseOpen(item.summon)}>
                                            <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</p>
                                        </Collapse>
                                    : item.type === 2 && (!item.summon || item.summon === 0) ? 
                                        <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                    : item.type === 2 && item.summon && item.summon !== 0 ? 
                                        <Collapse in={collapseOpen(item.summon)}>
                                            <p key={index} className={classes.summaryText}>{item.name}: {item.value}</p>
                                        </Collapse>
                                    : item.type === 3 && (!item.summon || item.summon === 0) ?
                                        <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}</p> 
                                    : item.type === 3 && item.summon && item.summon !== 0 &&
                                        <Collapse in={collapseOpen(item.summon)}>
                                            <p key={index} className={classes.summaryText}>{item.name}: {item.firstName}- {item.firstValue}</p>  
                                        </Collapse>
                                    }
                                </>
                            )}
                            <p className={classes.summaryText}>Kiekis: {kiekis}</p>
                            <p className={classes.summaryText}>Vieneto kaina: {unitPrice.price.toFixed(2)}€</p>
                            <p className={classes.summaryText}>Gamybos Laikas: {pasirinktasGamybosLaikas}</p>
                            <p className={classes.summaryText}>Pastaba: {pastaba}</p>
                            <Collapse in={unitPrice.discount > 0}>
                                <p className={classes.discountText}>Nuolaida: {unitPrice.discount}%</p>
                            </Collapse>
                            <p className={classes.discountText}>Lojalumo programos nuolaida: {loyaltydiscount}%</p>
                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                <p className={classes.PriceText}>Kaina:</p>
                                {unitPrice.discount > 0 || loyaltydiscount > 0 ? 
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                        {/* <p className={classes.Isbraukta}>{getPrice()}€</p> */}
                                        <span className={classes.Isbraukta}>{getPrice()}€</span>
                                        <p className={classes.DiscountedPriceText}>{getDiscountedPrice()}€</p>
                                    </Box>
                                :
                                    <p className={classes.PriceText}>{getPrice()}€</p>
                                }
                            </Box>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component="span" 
                                classes={{root: classes.uploadButton}} 
                                startIcon={<FaShoppingCart size={20} 
                                className={classes.icon}/>}
                                disabled={file.src === null}
                                onClick={addToCart}
                            >
                                Į krepšelį
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductPage
