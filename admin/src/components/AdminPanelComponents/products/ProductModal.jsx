import { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, useMediaQuery, DialogTitle, OutlinedInput, FormControl, Select, MenuItem, CircularProgress } from '@material-ui/core';
import SelectOption from './SelectOption';
import NumberOption from './NumberOption';
import NumberSingleOption from './NumberSingleOption';
import PictureOption from './PictureOption';
import Price from './Price';
import Limits from './Limits';
// import PictureAmount from './PictureAmount';

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
            padding: '1rem 1rem 1rem 0'
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
    infotext: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem',
        [theme.breakpoints.up('xxl')]:{
            fontSize: '1.08rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            fontSize: '1.5rem',
        },
    },
    cancelButton: {
        margin: '0',
        padding: '.5rem 1rem .5rem 1rem',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.pirma,
        '&:hover': {
            backgroundColor: '#e31c2d',
        }, 
        [theme.breakpoints.up('xxl')]:{
            padding: '.75rem 1.5rem .75rem 1.5rem',
            fontSize: '1.5rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]:{
            padding: '1rem 1.5rem 1rem 1.5rem',
            fontSize: '2rem',
            borderRadius: '9px',
        },
    },
    saveButton: {
        margin: '0',
        padding: '.5rem 1rem .5rem 1rem',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: '#26a69a',
        width: '7rem',
        '&:hover': {
            backgroundColor: '#1c7d73',
        }, 
        [theme.breakpoints.up('xxl')]:{
            padding: '.75rem 1.5rem .75rem 1.5rem',
            fontSize: '1.5rem',
            width: '10.5rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]:{
            padding: '1rem 1.5rem 1rem 1.5rem',
            fontSize: '2rem',
            width: '14rem',
            borderRadius: '9px',
        },
    },
    input: {
        display: 'none',
    },
    imageBox: {
        padding: '0 1rem 0 1rem',
        height: '100%',
        [theme.breakpoints.up('xl')]: {
            borderRight: '1px solid #1a304d',
        }, 
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1.5rem 0 1.5rem',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2rem 0 2rem',
        }, 
    },
    image: {
        maxWidth: '10rem',
        maxheight: '15rem',
        objectFit: 'contain',
        margin: '0 0 1rem 0',
        padding: '1rem',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '100%',
            maxheight: '100%',
            margin: '0 0 1.5rem 0',
            padding: '1.5rem',
            borderRadius: '10px',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            // maxWidth: '20rem',
            // maxheight: '30rem',
            margin: '0 0 2rem 0',
            padding: '2rem',
            borderRadius: '14px',
        }, 
    },
    nameBox: {
        padding: '0 1rem 0 1rem',
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('xl')]: {
            borderRight: '1px solid #1a304d',
        }, 
    },
    descBox: {
        padding: '0 1rem 0 1rem',
        width: '100%',
        height: '100%',
    },
    formName: {
        width: '100%',
        // height: '2.5rem',
    },
    formdesc: {
        width: '100%',
    },
    formVariantSelect: {
        width: '21rem',
        [theme.breakpoints.up('xxl')]: {
            width: '32rem',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        }, 
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
    },
    diasbleOutline: {
        border: 'none',
    },
    contentSection: {
        margin: '0 0 1rem 0',
        padding: '1rem 0 1rem 0',
        borderTop: '1px solid #1a304d',
    },
    variantSelect: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0',
        padding: '0 0 0 1rem',
        minHeight: '3.5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: '4px',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
        [theme.breakpoints.up('xxl')]: {
            margin: '0',
            padding: '0 0 0 1.5rem',
            minHeight: '5.25rem',
            fontSize: '1.4rem',
            borderRadius: '6px',
            '&:focus': {
                borderRadius: '6px',
            }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0',
            padding: '0 0 0 2rem',
            minHeight: '7rem',
            fontSize: '1.8rem',
            borderRadius: '8px',
            '&:focus': {
                borderRadius: '8px',
            }, 
        },
    },
    variantSelectIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5) translateX(-.75rem)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateX(-1rem)',
        },
    },
    icon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
    },
    optionParentBox: {
        padding: '0 1rem 1rem 0', 
        border: '1px solid #F1FAEE', 
        borderRadius: '4px',
        margin: '0 0 1rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1.5rem 1.5rem 0', 
            borderRadius: '6px',
            margin: '0 0 1.5rem 1rems',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2rem 2rem 0', 
            borderRadius: '8px',
            margin: '0 0 2rem 1.3rem',
        },
    },
}));

const ProductModal = ({ getAllProducts, page, productOptionsMemo, setProductOptionsMemo, productInfo, setProductInfo, file, setFile, productModalOpen, setProductModalOpen, setSnackbar, user }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [selectOption, setSelectOption] = useState(0);
    // const [kiekioPasirinkimas, setKiekioPasirinkimas] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    const handleProductInfoChange = (prop) => (event) => {
        setProductInfo({ ...productInfo, [prop]: event.target.value });
    };

    const handleAmountDiscountChange = (prop, i) => (event) => {
        const arrayCopy = productInfo.amountDiscount;
        if (prop === 'amount') {
            arrayCopy[i].amount = event.target.value;
        } else if (prop === 'price') {
            arrayCopy[i].price = event.target.value;
        } else {
            arrayCopy[i].discount = event.target.value;
        }
        setProductInfo({ ...productInfo, amountDiscount: arrayCopy });
    };

    const addAmountDiscount = () => {
        const arrayCopy = productInfo.amountDiscount;
        arrayCopy.push({
            amount: 0,
            price: 0,
            discount: 0
        });
        setProductInfo({ ...productInfo, amountDiscount: arrayCopy });
    };

    const deleteAmountDiscount = (itemIndex) => {
        setProductInfo({ ...productInfo, amountDiscount: productInfo.amountDiscount.filter(function(value, index, arr) {
            return index !== itemIndex
        })});
    };

    const handleClose = () => {
        setProductModalOpen(false);
        setProductInfo({
            id: '',
            name: '',
            description: '',
            amountDiscount: [],
            options: [],
            oneDayLimit: 1,
            twoDayLimit: 1,
            oneDayPriceIncreace: 0,
            twoDayPriceIncreace: 0,
            pictureAmount: 1,
            templateID: '',
            kiekioPasirinkimas: 0,
            kainosModelis: 0,
            basePrice: 0,
            baseDiscount: 0,
        });
        setFile({
            src: null,
            URL: ''
        });
        setProductOptionsMemo([]);
    };

    const handleFile = (e) => {
        const imagefile = e.target.files[0];
        setFile({
            src: imagefile,
            URL: URL.createObjectURL(imagefile)
        });
    };

    const descriptionElementRef = useRef(null);

    const checkBeforeAdd = () => {
        var missing = [];
        if (file.URL === '') {
            missing.push('piktogramos');
        }
        if (productInfo.name === '') {
            missing.push('pavadinimo');
        }
        if (productInfo.description === '') {
            missing.push('aprašymo');
        }
        if (productInfo.amountDiscount.length <= 0 && productInfo.kainosModelis !== 1) {
            missing.push('kainos');
        } else {
            for (const item of productInfo.amountDiscount) {
                if ((!item.price || item.price <= 0) && productInfo.kainosModelis !== 1) {
                    missing.push('kainos');
                    break;
                }
            }
        }
        // if (!productInfo.twoDayLimit) {
        //     missing.push('1-2 dienų limito');
        // }
        // if (!productInfo.oneDayLimit) {
        //     missing.push('24h limito');
        // }
        for (const item of productInfo.options) {
            if (!item.name) {
                missing.push('pasirinkimo pavadinimo');
                break
            }
            if ((item.type !== 1 && item.type !== 3) && (item.menuOptions.length === 0 || !item.menuOptions)) {
                missing.push('pasirinkimo variantų');
                break
            }
        }
        return missing;
    };

    const discountCheck = () => {
        if (productInfo.amountDiscount.length > 0) {
            for (const item of productInfo.amountDiscount) {
                if (item.discount < 0 || item.discount > 99) {
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    const checkIfSameSummonID = () => {
        for (const item of productInfo.options) {
            if (item.summon && ((item.menuOptions.length > 0) && (item.summon !== 0))) {
                for (const iteminner of item.menuOptions) {
                    if (item.summon === iteminner.summonID) {
                        return true;
                    }
                }
            } 
        }
        return false;
    };

    const handleProductAddOrUpdate = async () => {
        setSubmitting(true);
        const missingCheck = checkBeforeAdd();
        if (missingCheck.length > 0) {
            const errorMessage = `Trūksta ${missingCheck.join(', ')}.`;
            setSubmitting(false);
            setSnackbar({
                message: errorMessage,
                open: true,
            });
        } else if (discountCheck()) {
            setSubmitting(false);
            setSnackbar({
                message: 'Nuolaida negali būti mažesnė už 0 ir didesnė už 99.',
                open: true,
            });
        } else if (checkIfSameSummonID()) {
            setSubmitting(false);
            setSnackbar({
                message: 'Pasirinkimas negali iškviesti pats savęs.',
                open: true,
            });
        } else {
            try {
                const formData = new FormData();
                formData.append('images', file.src);
                for (const item of productInfo.options) {
                    for (const menuItem of item.menuOptions) {
                        formData.append('images', menuItem.fileSrc);
                    }   
                }
                formData.append('id', productInfo.id);
                formData.append('name', productInfo.name);
                formData.append('templateID', productInfo.templateID);
                formData.append('kiekioPasirinkimas', productInfo.kiekioPasirinkimas);
                formData.append('kainosModelis', productInfo.kainosModelis);
                formData.append('basePrice', productInfo.basePrice);
                formData.append('baseDiscount', productInfo.baseDiscount);
                formData.append('link', encodeURIComponent(productInfo.name));
                formData.append('description', productInfo.description);
                formData.append('mainImage', file.URL);
                // formData.append('price', Math.round(Number((Math.abs(productInfo.price) * 100).toPrecision(15))) / 100 * Math.sign(productInfo.price));
                // if (productInfo.discountPrice) {
                //     formData.append('discountPrice', parseInt(productInfo.discountPrice));
                // }
                // if (productInfo.minOrderAmount) {
                //     formData.append('minOrderAmount', parseInt(productInfo.minOrderAmount));
                // }
                formData.append('amountDiscount', JSON.stringify(productInfo.amountDiscount));
                formData.append('options', JSON.stringify(productInfo.options));
                if (productInfo.oneDayLimit) {
                    formData.append('oneDayLimit', parseInt(productInfo.oneDayLimit));
                }
                if (productInfo.twoDayLimit) {
                    formData.append('twoDayLimit', parseInt(productInfo.twoDayLimit));
                }
                if (productInfo.oneDayPriceIncreace) {
                    formData.append('oneDayPriceIncreace', parseInt(productInfo.oneDayPriceIncreace));
                }
                if (productInfo.twoDayPriceIncreace) {
                    formData.append('twoDayPriceIncreace', parseInt(productInfo.twoDayPriceIncreace));
                }
                formData.append('pictureAmount', parseInt(productInfo.pictureAmount));
                const productAddOrUpdateRequest = await fetch("/administracija/createProduct/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        // "Content-Type": "application/json",
                        "authorization": `JWT ${user.token}`,
                    },
                    body: formData,
                });
                const productAddOrUpdateResponse = await productAddOrUpdateRequest.json();
                if (productAddOrUpdateResponse.success) {
                    setSubmitting(false);
                    setProductModalOpen(false);
                    setProductInfo({
                        id: '',
                        name: '',
                        description: '',
                        price: null,
                        discountPrice: null,
                        minOrderAmount: 1,
                        amountDiscount: [],
                        options: [],
                        oneDayLimit: 1,
                        twoDayLimit: 1,
                        oneDayPriceIncreace: 0,
                        twoDayPriceIncreace: 0,
                        pictureAmount: 1,
                        templateID: '',
                        kiekioPasirinkimas: 0,
                        kainosModelis: 0,
                        basePrice: 0,
                        baseDiscount: 0,
                    });
                    setFile({
                        src: null,
                        URL: ''
                    });
                    setProductOptionsMemo([]);
                    setSnackbar({
                        message: productAddOrUpdateResponse.message,
                        open: true,
                    });
                    getAllProducts(page);
                }
            } catch (error) {
                setSubmitting(false);
                setSnackbar({
                    message: 'Klaida! pabandykite vėliau.',
                    open: true,
                });
            }
        }
    };

    const handleOptionAdd = () => {
        setProductOptionsMemo([
            ...productOptionsMemo,
            {
                fileSrc: null,
                fileURL: '',
                fileOriginalName: '',
                variantName: '',
                variantDesc: '',
                priceAdd: 0,
                optionIndex: null,
                summonID: 0,
            }
        ])
        setProductInfo({ ...productInfo, options: [ ...productInfo.options, {
            type: selectOption, // 0-select 1-number 2-picture
            name: '',
            info: '',
            menuOptions: [],
            firstItemName: '',
            secondItemName: '',
            fistItemMinValue: 0,
            firstItemMaxValue: 100,
            secondItemMinValue: 0,
            secondItemMaxValue: 100,
            fiststItemUnit: 1,
            secondItemUnit: 1,
            firstItemAdditionalPrice: 0,
            secondItemAdditionalPrice: 0,
            additionalPrice: 0,
            summon: 0,
            // kiekioPasirinkimas: 0
        }]});
        setSelectOption(0);
        // setKiekioPasirinkimas(0);
    };

    const handleSelectOptionChange = (e) => {
        setSelectOption(e.target.value);
    };

    // const handleKiekioPasirinkimoModelis = (e) => {
    //     setKiekioPasirinkimas(e.target.value);
    // };

    useEffect(() => {
        if (productModalOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [productModalOpen]);

    return (
        <Dialog
            open={productModalOpen}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            classes={{paper: classes.root}}
            fullWidth
            maxWidth={screenSizexxxl ? 'xxl' : screenSizexxl ? 'xl' : 'lg'}
        >
            <DialogTitle id="scroll-dialog-title" classes={{root: classes.dialogBackgroundTop}}><h4 className={classes.header}>Pridėti produktą</h4></DialogTitle>
            <DialogContent dividers={true} classes={{root: classes.dialogBackground}}>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container>
                            <Grid item xl={2} lg={2} md={6} sm={6} xs={12}>
                                <Box classes={{root: classes.imageBox}}>
                                    <Box>
                                        <h3 className={classes.header} style={{marginBottom: '1rem'}}>Produkto piktograma</h3>
                                    </Box>
                                    <Box style={{width: '100%'}}>
                                        { file.URL ? 
                                            <img className={classes.image} src={file.URL} alt=""/>
                                        :
                                            <p className={classes.infotext}>Geriausia png failas, nedidelis 512px dydžio, lengvas, max 100 KB. Dabartinės ikonos įkeltos iš <a style={{color: theme.myTheme.trecia}} href='https://www.flaticon.com/' target='_blank' rel="noreferrer">https://www.flaticon.com/.</a></p>
                                        }
                                    </Box>
                                    <Box>
                                        <label htmlFor="upload_product_icon">
                                            <Button variant="contained" color="primary" component="span" classes={{root: classes.cancelButton}} style={{marginBottom: '1rem'}}>
                                                { file.src !== null && file.URL ? 'Pakeisti' : 'Įkelti' }
                                            </Button>
                                        </label>
                                        <input
                                            type="file" 
                                            accept=".png, .jpg, .jpeg"
                                            className={classes.input}
                                            name="photo"
                                            id="upload_product_icon"
                                            onChange={handleFile}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <Box classes={{root: classes.nameBox}} >
                                    <Box>
                                        <h3 className={classes.header} style={{marginBottom: '1rem'}}>Produkto pavadinimas</h3>
                                    </Box>
                                    <Box>
                                        <FormControl className={classes.formName} variant="outlined">
                                            <OutlinedInput
                                                id="Product_Name"
                                                type='text'
                                                value={productInfo.name}
                                                placeholder='Pavadinimas...'
                                                onChange={handleProductInfoChange('name')}
                                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                autoComplete='off'
                                            />
                                        </FormControl>    
                                    </Box>
                                    <Box>
                                        <h3 className={classes.header} style={{marginBottom: '1rem'}}>Šablonų kategorijos ID</h3>
                                    </Box>
                                    <Box>
                                        <FormControl className={classes.formName} variant="outlined">
                                            <OutlinedInput
                                                id="template_id"
                                                type='text'
                                                value={productInfo.templateID}
                                                placeholder='ID...'
                                                onChange={handleProductInfoChange('templateID')}
                                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                autoComplete='off'
                                            />
                                        </FormControl>    
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                                <Box classes={{root: classes.descBox}} >
                                    <Box>
                                        <h3 className={classes.header} style={{marginBottom: '1rem'}}>Produkto aprašymas</h3>
                                    </Box>
                                    <Box>
                                        <FormControl className={classes.formdesc} variant="outlined">
                                            <OutlinedInput
                                                id="Product_Name"
                                                type='text'
                                                multiline
                                                rows={7}
                                                value={productInfo.description}
                                                placeholder='Aprašymas...'
                                                onChange={handleProductInfoChange('description')}
                                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                autoComplete='off'
                                            />
                                        </FormControl>    
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection} style={{margin: '1rem 0 0 0'}}>
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Box style={{margin: '1em 0'}}>
                                    <h3 className={classes.header}>Kainos modelis:</h3>
                                </Box>
                            </Grid> 
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                    <Select
                                        id="produkto_kiekio_pasirinkimo_modelis"
                                        disableUnderline
                                        classes={{root: classes.variantSelect, icon: classes.variantSelectIcon}}
                                        value={productInfo.kainosModelis}
                                        onChange={handleProductInfoChange('kainosModelis')}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}>Pirmas</MenuItem>
                                        <MenuItem value={1}>Antras</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection} style={{margin: '1rem 0 0 0'}}>
                        {productInfo.kainosModelis === 1 ?
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Grid container>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Box style={{margin: '1em 0'}}>
                                                        <h3 className={classes.header}>Vieneto kaina, €:</h3>
                                                    </Box>
                                                </Grid> 
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <FormControl className={classes.formPrice} variant="outlined">
                                                        <OutlinedInput
                                                            id='bazine_kaina'
                                                            onWheel={(e) => e.target.blur()}
                                                            type='text'
                                                            value={productInfo.basePrice}
                                                            placeholder='Eur...'
                                                            onChange={handleProductInfoChange('basePrice')}
                                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>  
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Grid container>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Box style={{margin: '1em 0'}}>
                                                        <h3 className={classes.header}>Nuolaida-Akcija, %:</h3>
                                                    </Box>
                                                </Grid> 
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <FormControl className={classes.formPrice} variant="outlined">
                                                        <OutlinedInput
                                                            id='bazine_nuolaida'
                                                            onWheel={(e) => e.target.blur()}
                                                            type='text'
                                                            value={productInfo.baseDiscount}
                                                            placeholder='%...'
                                                            onChange={handleProductInfoChange('baseDiscount')}
                                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>  
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <Box style={{margin: '1em 0'}}>
                                                    <h3 className={classes.header}>Kiekio pasirinkimas:</h3>
                                                </Box>
                                            </Grid> 
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                                    <Select
                                                        id="produkto_kiekio_pasirinkimo_modelis"
                                                        disableUnderline
                                                        classes={{root: classes.variantSelect, icon: classes.variantSelectIcon}}
                                                        value={productInfo.kiekioPasirinkimas}
                                                        onChange={handleProductInfoChange('kiekioPasirinkimas')}
                                                        defaultValue={0}
                                                    >
                                                        <MenuItem value={0}>Laisvas</MenuItem>
                                                        <MenuItem value={1}>Fiksuotas</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        :
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Box style={{margin: '1em 0'}}>
                                        <h3 className={classes.header}>Kiekio pasirinkimas:</h3>
                                    </Box>
                                </Grid> 
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                        <Select
                                            id="produkto_kiekio_pasirinkimo_modelis"
                                            disableUnderline
                                            classes={{root: classes.variantSelect, icon: classes.variantSelectIcon}}
                                            value={productInfo.kiekioPasirinkimas}
                                            onChange={handleProductInfoChange('kiekioPasirinkimas')}
                                            defaultValue={0}
                                        >
                                            <MenuItem value={0}>Laisvas</MenuItem>
                                            <MenuItem value={1}>Fiksuotas</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection} style={{margin: '1rem 0 0 0'}}>
                        <Price 
                            productInfo={productInfo}
                            deleteAmountDiscount={deleteAmountDiscount}
                            addAmountDiscount={addAmountDiscount}
                            handleAmountDiscountChange={handleAmountDiscountChange}
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection}>
                        <h3 className={classes.header} style={{margin: '0 0 1rem 0', padding: '0 0 0 1rem'}}>Produkto pasirinkimai:</h3>
                        {productInfo.options.length > 0 && productInfo.options.map((item, index) => 
                            <Box key={index} classes={{root: classes.optionParentBox}} >
                                {
                                    {
                                        0: <SelectOption 
                                                itemIndex={index} 
                                                setProductInfo={setProductInfo} 
                                                productInfo={productInfo} 
                                                setSnackbar={setSnackbar}
                                                productOptionsMemo={productOptionsMemo}
                                                setProductOptionsMemo={setProductOptionsMemo}
                                            />,
                                        1: <NumberOption 
                                                itemIndex={index} 
                                                setProductInfo={setProductInfo} 
                                                productInfo={productInfo} 
                                                productOptionsMemo={productOptionsMemo}
                                                setProductOptionsMemo={setProductOptionsMemo}
                                            />,      
                                        2: <PictureOption 
                                                itemIndex={index} 
                                                setProductInfo={setProductInfo} 
                                                productInfo={productInfo} 
                                                setSnackbar={setSnackbar}
                                                productOptionsMemo={productOptionsMemo}
                                                setProductOptionsMemo={setProductOptionsMemo}
                                            />,
                                        3: <NumberSingleOption 
                                                itemIndex={index} 
                                                setProductInfo={setProductInfo} 
                                                productInfo={productInfo} 
                                                productOptionsMemo={productOptionsMemo}
                                                setProductOptionsMemo={setProductOptionsMemo}
                                            />,     
                                    }[productInfo.options[index].type]
                                }
                            </Box>
                        )}
                        <Box display='flex' justifyContent='flex-start' alignItems='center' style={{margin: '0 0 0 1rem'}}>

                            <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                <Select
                                    id="simple-select-outlined"
                                    disableUnderline
                                    classes={{root: classes.variantSelect, icon: classes.variantSelectIcon}}
                                    value={selectOption}
                                    onChange={(e) => handleSelectOptionChange(e)}
                                    defaultValue={0}
                                >
                                    <MenuItem value={0}>Pasirinkimas</MenuItem>
                                    <MenuItem value={3}>Skaičius</MenuItem>
                                    <MenuItem value={1}>Skaičius Dvigubas</MenuItem>
                                    <MenuItem value={2}>Paveikslėliai</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <Box display='flex' justifyContent='center' alignItems='center' style={{height: '100%', marginLeft: '1rem'}}>
                                <Button onClick={handleOptionAdd} classes={{root: classes.cancelButton}} style={{height: '100%'}}>
                                    Pridėti variantą
                                </Button>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection} style={{margin: '1rem 0 0 0'}}>
                        <Limits 
                            productInfo={productInfo}
                            handleProductInfoChange={handleProductInfoChange}
                        />
                    </Grid>
                    {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contentSection} style={{margin: '1rem 0 0 0'}}>
                        <PictureAmount 
                            productInfo={productInfo}
                            setProductInfo={setProductInfo} 
                        />
                    </Grid> */}
                </Grid>
            </DialogContent>
            <DialogActions classes={{root: classes.dialogBackgroundBottom}}>
                <Button onClick={handleClose} classes={{root: classes.cancelButton}}>
                    Atšaukti
                </Button>
                <Button onClick={handleProductAddOrUpdate} classes={{root: classes.saveButton}} disabled={submitting}>
                    {submitting ? <CircularProgress size={20} className={classes.icon}/> : 'Išsaugoti' }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProductModal
