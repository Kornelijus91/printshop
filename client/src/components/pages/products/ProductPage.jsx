import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, MenuItem, FormControl, Hidden, Box, Grid, Stepper, Step, StepLabel, Collapse, TextField, Button, Divider, Snackbar, ClickAwayListener, CircularProgress } from '@material-ui/core'; // ListItemText, ListItem, MenuItem, Select, FormControl,
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx' 
import { useHistory } from 'react-router-dom'; 
import MuiAlert from '@material-ui/lab/Alert';
import NumberDoubleOption from './NumberDoubleOption.jsx';
import NumberOption from './NumberOption.jsx';
import PictureOption from './PictureOption.jsx'
import SelectOption from './SelectOption.jsx';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaExchangeAlt, FaShoppingCart, FaPaintBrush, FaTrashAlt } from "react-icons/fa";
import ProductSkeleton from './ProductSkeleton.jsx';
import axios from "axios";
import ProductAddedModal from './ProductAddedModal.jsx';
import MaketavimoKaina from './MaketavimoKaina';
import Comments from './Comments'
import Galery from './Galery'
import SelectTemplateModal from './SelectTemplateModal'
import EditDesignButtom from './EditDesignButtom.jsx';
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    header: {
        textAlign: 'center',
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeXXL,
        margin: '0',
        padding: '0 0 1em 0',
        [theme.breakpoints.up('xl')]: {
            padding: '1em 0',
        },
    },
    img: {
        fontSize: theme.myTheme.sizeXXL,
        height: '7em', 
        width: '100%', 
        objectFit: 'contain'
    },
    imageBoxx: {
        fontSize: theme.myTheme.sizeM,
        padding: '0 2em ',
        objectFit: 'contain'
    },
    descTextBox: {
        fontSize: theme.myTheme.sizeM,
        padding: '0 2em 0 0',
    },
    descText: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0',
        textAlign: 'justify',
        textJustify: 'inter-word',
    },
    stepText: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0',
    },
    pictureText: {
        textAlign: 'justify',
        textJustify: 'inter-word',
        padding: '0',
        margin: '0 0 1em 0',
        fontSize: theme.myTheme.sizeM,
    },
    Stepper: {
        fontSize: theme.myTheme.sizeS,
        backgroundColor: 'transparent',
        padding: '4em 0 1em 0',
        marginBottom: '2em',
    },
    Step: {
        fontFamily: theme.myTheme.sriftas,
    },
    stepIcon: {
        fontSize: theme.myTheme.sizeXL,
    },
    stepConnector: {
        fontSize: theme.myTheme.sizeM,
        backgroundColor: theme.myTheme.sZalia.main,
        width: '90%',
        height: '.2em',
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        transform: 'translate(-52%, .8em)',
    },
    cssOutlinedInput:theme.myTheme.cssOutlinedInput,
    cssOutlinedInput2: theme.myTheme.cssOutlinedInput2,
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    pastaba: {
        fontSize: theme.myTheme.sizeM,
        border: `1px solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            border: `1.4px solid ${theme.myTheme.juoda}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.juoda}`,
        },
    },
    OptionTitleHeader: {
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeM,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    input: {
        display: 'none',
    },
    uploadButton: theme.myTheme.button,
    uploadButtonLabel: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    middleBox: {
        width: '100%',
        height: '100%',
    },
    col1: {
        fontSize: theme.myTheme.sizeM,
        paddingRight: 0,
        [theme.breakpoints.up('md')]: {
            paddingRight: '1em',
        },
    },
    col2: {

    },
    col3: {
        fontSize: theme.myTheme.sizeM,
        paddingLeft: 0,
        [theme.breakpoints.up('md')]: {
            paddingLeft: '1em',
        },
    },
    divider1: {
        fontSize: theme.myTheme.sizeM,
        marginRight: '1em',
    },
    divider2: {
        fontSize: theme.myTheme.sizeM,
        marginLeft: '1em',
    },
    image: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        maxHeight: '14em',
        objectFit: 'cover',
    },
    pdf: {
        width: '100%',
        objectFit: 'contain',
    },
    summaryText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
    },
    discountText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 0 .3em 0',
        overflowWrap: 'break-word',
        color: theme.myTheme.sZalia.dark,
    },
    PriceText: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
    },
    Isbraukta:theme.myTheme.isbraukta,
    DiscountedPriceText: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em .3em 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.dark,
    },
    variantSelect: theme.myTheme.variantSelect,
    icon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    mobileStepNumberBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.myTheme.tZalia.main,
        borderRadius: '1.5em',
        padding: '1em',
        height: '1.5em',
        width: '1.5em',
        margin: '0 .5em 0 0',
        color: theme.myTheme.balta,
    },
    mobileStepParentBox: {
        margin: '1em 0',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    skeleton: {
        height: 250,
        [theme.breakpoints.up('xxl')]: {
            height: 337,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 500,
        },
    },
    alternativeLabel: {
        fontSize: theme.myTheme.sizeM,
        marginTop: '.1em',
    },
    formVariantSelect: theme.myTheme.formVariantSelect,
    variantSelectIcon: theme.myTheme.variantSelectIcon,
    menuitself: theme.myTheme.menuitself,
    menuPaper: theme.myTheme.menuPaper,
    menuItem: theme.myTheme.menuItem,
    selectRenderOuterBox: theme.myTheme.selectRenderOuterBox,
    selectRender2: theme.myTheme.selectRender2,
}));

const ProductPage = ({ userid, products, loyaltydiscount, getCart, cart, roundTwoDec, maketavimoKaina, firstName, personalas, token, kodoNuolaida, findMaxDiscount }) => {

    let { link, cartItemID } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    const [product, setProduct] = useState({});
    const [optionsValues, setOptionsValues] = useState([]);
    const [select, setSelect] = useState([]);
    const [pastaba, setPastaba] = useState('');
    const [file, setFile] = useState({
        src: null,
        URL: '',
        type: '',
        size: 0,
        name: '',
        projectPreviewArray: [],
        projectId: ''
    });
    const [snackbar, setSnackbar] = useState('');
    const [kiekis, setKiekis] = useState(1);
    const [unitPrice, setUnitPrice] = useState({
        price: 0,
        discount: 0
    });
    const [amountArray, setAmountArray] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [cartItemId, setCartItemId] = useState('');
    const [papildomaMaketavimoKaina, setPapildomaMaketavimoKaina] = useState(0);
    const [appliedDiscount, setAppliedDiscount] = useState({
        discountName: '',
        discount: 0
    });
    const [selectTemplateModalOpen, setSelectTemplateModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const resetEverything = () => {
        setPastaba('');
        setFile({
            src: null,
            URL: '',
            type: '',
            size: 0,
            name: '',
            projectPreviewArray: [],
            projectId: ''
        });
        setUnitPrice({
            price: 0,
            discount: 0
        });
        setCartItemId('');
    };

    const getPrice = () => {
        if (amountArray.length > 0) {
            if (kiekis <= amountArray[0].amount) {
                const roundedTotalPrice = roundTwoDec(unitPrice.price * amountArray[0].amount + papildomaMaketavimoKaina);
                return roundedTotalPrice.toFixed(2);
            } else {
                const roundedTotalPrice = roundTwoDec(unitPrice.price * Math.round(kiekis) + papildomaMaketavimoKaina);
                return roundedTotalPrice.toFixed(2);
            } 
        } 
    };

    const getDiscountedPrice = () => {
        if (amountArray.length > 0) {
            if (kiekis <= amountArray[0].amount) {
                const dscnt = 1 - (appliedDiscount.discount / 100);
                const roundedTotalDiscountedPrice = roundTwoDec(unitPrice.price * amountArray[0].amount * dscnt + papildomaMaketavimoKaina);
                return roundedTotalDiscountedPrice.toFixed(2);
            } else {
                const dscnt = 1 - (appliedDiscount.discount / 100);
                const roundedTotalDiscountedPrice = roundTwoDec(unitPrice.price * Math.round(kiekis) * dscnt + papildomaMaketavimoKaina);
                return roundedTotalDiscountedPrice.toFixed(2);
            } 
        }
    };

    const handlePastabaChange = (e) => {
        setPastaba(e.target.value);
    };

    const handleKiekisChange = (e) => {
        setKiekis(e.target.value);
    };

    // const handleFiksuotasKiekisChange = (kiekis) => {
    //     setKiekis(kiekis);
    // };

    const handleKiekisCorrection = () => {
        if (Number(kiekis) < amountArray[0].amount) {
            setKiekis(Math.round(amountArray[0].amount));
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
                projectPreviewArray: [],
                projectId: ''
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
        setUploading(true);
        try {
            const formData = new FormData();
            if (file.src !== null) { 
                formData.append('image', file.src);
            } else if (file.URL) {
                formData.append('imageURL', file.URL);
            }
            formData.append('projectPreviewArray', JSON.stringify(file.projectPreviewArray));
            formData.append('projectId', file.projectId);
            formData.append('name', product.name);
            formData.append('productID', product._id);
            formData.append('productLink', product.link);
            formData.append('id', cartItemId);
            formData.append('options', JSON.stringify(optionsValues));
            formData.append('pastaba', pastaba);
            formData.append('quantity', Number(kiekis));
            formData.append('discount', Number(unitPrice.discount)); 
            formData.append('maketavimoKaina', papildomaMaketavimoKaina);
            if (unitPrice.discount > 0 || loyaltydiscount > 0) {
                formData.append('price', Number(getDiscountedPrice()));
            } else {
                formData.append('price', Number(getPrice()));
            }
            const res = await axios({
                method: 'post',
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                url: '/users/addToCart/',
                data: formData,
                onUploadProgress: data => {
                    setUploadProgress(Math.round((100 * data.loaded) / data.total))
                },
            });
            const response = await res;
            setUploading(false);
            if (response.data.success) {
                var items = JSON.parse(localStorage.getItem("cartArray")) || [];
                if (!items.includes(response.data.item)) {
                    items.push(response.data.item);
                    localStorage.setItem("cartArray", JSON.stringify(items));
                }
                getCart();
                setAddModalOpen(true);
            } 
        } catch (error) {
            setUploading(false);
        }
    };

    const getCartItem = async (crtItemID) => {
        try {
            const req = await fetch("/users/getCartItem/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cartItemID: crtItemID,
                }),
            });
            const response = await req.json();
            if (response.success) {
                const result = products.find(obj => {
                    return obj.link === response.data.productLink;
                });
                if (result) {
                    
                    setOptionsValues(response.data.options);
                    var darvienasarray66 = [];
                    for (var i2 = 0; i2 <= response.data.options.length - 1; i2++) {
                        if (response.data.options[i2].type === 0) {
                            for (var p2 = 0; p2 <= result.options.length - 1; p2++) {
                                if (result.options[p2].type === response.data.options[i2].type && result.options[p2].name === response.data.options[i2].name) {
                                    for (var y2 = 0; y2 <= result.options[p2].menuOptions.length - 1; y2++) {
                                        if (result.options[p2].menuOptions[y2].variantName === response.data.options[i2].value) {
                                            darvienasarray66.push(y2);
                                        }
                                    }
                                }
                            }
                        } else {
                            darvienasarray66.push(0);
                        }
                    }
                    setSelect(darvienasarray66);
                    setPastaba(response.data.pastaba);
                    var imgType2 = response.data.image.substring(response.data.image.lastIndexOf("."));
                    imgType2 = imgType2.replace('.', '')
                    setFile({
                        src: null,
                        URL: response.data.image,
                        type: imgType2 === 'pdf' ? 'application/pdf': `image/${imgType2}`,
                        size: 0,
                        name: '',
                        projectPreviewArray: response.data.projectPreviewArray,
                        projectId: response.data.projectId,
                    });
                    var min3 = result.amountDiscount;
                    if (min3) {
                        min3.sort(function (a, b) {
                            return a.amount - b.amount
                        });
                        setKiekis(response.data.quantity);
                        setAmountArray(min3);
                    } else {
                        setKiekis(1);
                    }
                    setCartItemId('');
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e) {

        }
    };

    useEffect(() => {
        resetEverything();
        if (products.length !== 0) {
            const result = products.find(obj => {
                return obj.link.toLowerCase() === encodeURIComponent(link).toLowerCase()
            });
            if (result) {
                setProduct(result);
                var copy18 = []; 
                if (!cartItemID) {
                    for (const item of result.options) {
                        if (item.type === 0) {
                            copy18.push({
                                name: item.name,
                                value: item.menuOptions[0].variantName,
                                price: item.menuOptions[0].priceAdd,
                                summon: item.summon,
                                summonID: item.menuOptions[0].summonID,
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
                    var darvienasarray = [];
                    for (var j = 0; j <= copy18.length - 1; j++) {
                        darvienasarray.push(0);
                    }
                    setSelect(darvienasarray);
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
                } else {
                    var cartItem = {};
                    for (const item of cart) {
                        if (item._id === cartItemID) {
                            cartItem = item;
                            break;
                        }
                    }
                    if (cartItem._id) {
                        setOptionsValues(cartItem.options);
                        var darvienasarray2 = [];
                        for (var i = 0; i <= cartItem.options.length - 1; i++) {
                            if (cartItem.options[i].type === 0) {
                                for (var p = 0; p <= result.options.length - 1; p++) {
                                    if (result.options[p].type === cartItem.options[i].type && result.options[p].name === cartItem.options[i].name) {
                                        for (var y = 0; y <= result.options[p].menuOptions.length - 1; y++) {
                                            if (result.options[p].menuOptions[y].variantName === cartItem.options[i].value) {
                                                darvienasarray2.push(y);
                                            }
                                        }
                                    }
                                }
                            } else {
                                darvienasarray2.push(0);
                            }
                        }
                        setSelect(darvienasarray2);
                        setPastaba(cartItem.pastaba);
                        var imgType = cartItem.image.substring(cartItem.image.lastIndexOf("."));
                        imgType = imgType.replace('.', '')
                        setFile({
                            src: null,
                            URL: cartItem.image,
                            type: imgType === 'pdf' ? 'application/pdf': `image/${imgType}`,
                            size: 0,
                            name: '',
                            projectPreviewArray: cartItem.projectPreviewArray,
                            projectId: cartItem.projectId
                        });
                        var min2 = result.amountDiscount;
                        if (min2) {
                            min2.sort(function (a, b) {
                                return a.amount - b.amount
                            });
                            setKiekis(cartItem.quantity);
                            setAmountArray(min2);
                        } else {
                            setKiekis(1);
                        }
                        setPapildomaMaketavimoKaina(cartItem.maketavimoKaina);
                        setCartItemId(cartItemID);
                    } else {
                        const crtItem = getCartItem(cartItemID);
                        if (!crtItem) {
                            history.push('/pageNotFound');
                            return;
                        } 
                    }
                }
            } else {
                history.push('/pageNotFound')
            }
        }
        // eslint-disable-next-line
    }, [products, link]);

    useEffect(() => {
        if (product.kainosModelis !== 1)
        {
            var unitPrice = 0;
            var addonPrice = 0;
            var unitDiscount = 0;
            if (amountArray.length > 0) {
                unitPrice = roundTwoDec(amountArray[0].price);
                unitDiscount = amountArray[0].discount;
            } 
            for (const x of amountArray) {
                if (x.amount <= kiekis) {
                    unitPrice = roundTwoDec(x.price)
                    unitDiscount = x.discount;
                } else {
                    break
                }
            }
            for (const y of optionsValues) {
                if (y.type === 1) {
                    addonPrice = roundTwoDec(addonPrice + y.firstPrice + y.secondPrice);
                } else if (y.type === 3) {
                    addonPrice = roundTwoDec(addonPrice + y.firstPrice);
                } else {
                    addonPrice = roundTwoDec(addonPrice + y.price);
                }
            }
            setUnitPrice({
                price: roundTwoDec(unitPrice + addonPrice), // * gamybosPabrangimas
                discount: unitDiscount
            });
        } else {
            var addonPrice2 = 0;
            var unitDiscount2 = 0;

            for (const dalykas of product.amountDiscount) {
                if (kiekis >= dalykas.amount){
                    unitDiscount2 = (100 - dalykas.discount) / 100
                }
            }

            for (const y of optionsValues) {
                if (y.type === 1) {
                    addonPrice2 = roundTwoDec(addonPrice2 + y.firstPrice + y.secondPrice);
                } else if (y.type === 3) {
                    addonPrice2 = roundTwoDec(addonPrice2 + y.firstPrice);
                } else {
                    addonPrice2 = roundTwoDec(addonPrice2 + y.price);
                }
            }
            setUnitPrice({
                price: roundTwoDec((product.basePrice  + addonPrice2) * unitDiscount2), // * gamybosPabrangimas
                discount: product.baseDiscount
            });
        }
        // eslint-disable-next-line
    }, [amountArray, kiekis, optionsValues ]); //gamybosPabrangimas

    useEffect(() => {
        const maxdiscount = findMaxDiscount(unitPrice.discount);
        if (maxdiscount[1] > 0) {
            setAppliedDiscount({
                discountName: maxdiscount[0],
                discount: maxdiscount[1]
            });
        } else {
            setAppliedDiscount({
                discountName: '',
                discount: 0
            });
        }
        
        // eslint-disable-next-line
    }, [kiekis, unitPrice, loyaltydiscount, kodoNuolaida]);

    return (
        <>
            { products.length <= 0 ? 
            <ProductSkeleton />
            :
            <Box classes={{root: classes.root}} >
                <Helmet>
                    <title>{product.name} | {ProjectName}</title>  
                </Helmet>
                <Snackbar open={snackbar !== ''} autoHideDuration={5000} onClose={handleClose}> 
                    <Alert severity="warning">{snackbar}</Alert>
                </Snackbar>
                <SelectTemplateModal 
                    selectTemplateModalOpen={selectTemplateModalOpen}
                    setSelectTemplateModalOpen={setSelectTemplateModalOpen}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    userid={userid}
                    productID={product._id}
                    productName={product.name}
                    productTemplateID={product.templateID}
                    setFile={setFile}
                />
                <ProductAddedModal 
                    addModalOpen={addModalOpen} 
                    setAddModalOpen={setAddModalOpen}
                    file={file}
                    optionsValues={optionsValues}
                    collapseOpen={collapseOpen}
                    productName={product.name}
                    kiekis={kiekis}
                    unitPrice={unitPrice}
                    pastaba={pastaba}
                    getDiscountedPrice={getDiscountedPrice}
                    getPrice={getPrice}
                    papildomaMaketavimoKaina={papildomaMaketavimoKaina}
                    appliedDiscount={appliedDiscount}
                />
                {/* <Box display='flex' justifyContent='center' style={{paddingBottom: '2rem'}}> */}
                    <Box>
                        <Breadcurmbs routes={[{path: 'products', name: 'Produktai'}, {path: product.link, name: product.name}]}/>
                        <Grid container style={{margin: '0'}}>
                            <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                                <Box display='flex' justifyContent='flex start'>
                                    <h1 className={classes.header}>{product.name}</h1> 
                                </Box>
                                <Box display='flex' justifyContent='flex start' classes={{root: classes.descTextBox}}>
                                    <p className={classes.descText}>{product.description}</p>
                                </Box>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <Box display='flex' justifyContent='center' alignItems='flex-start' classes={{root: classes.imageBoxx}} >
                                        <img src={product.image} alt={product.name} className={classes.img}/>
                                    </Box>
                                </Grid>
                            </Hidden>
                        </Grid>
                        <Hidden smDown>
                            <Stepper 
                                alternativeLabel 
                                activeStep={0} 
                                classes={{root: classes.Stepper}}
                                connector={
                                    // <StepConnector classes={{root: classes.stepConnector}}/>
                                    <div className={classes.stepConnector}/>
                                }
                            >
                                <Step active={true} >
                                    <StepLabel 
                                        classes={{root: classes.alternativeLabel}}
                                        StepIconProps={{ 
                                            classes: { text: classes.Step, root: classes.stepIcon } 
                                        }}
                                    >
                                        <p className={classes.stepText}>Pasirinkite produkto parametrus</p>
                                    </StepLabel>
                                </Step>
                                <Step active={true}>
                                    <StepLabel 
                                        StepIconProps={{ 
                                            classes: { text: classes.Step, root: classes.stepIcon } 
                                        }}
                                    >
                                        <p className={classes.stepText}>Įkelkite failą, arba susikurkite dizainą.</p>
                                    </StepLabel>
                                </Step>
                                <Step active={true}>
                                    <StepLabel 
                                        StepIconProps={{ 
                                            classes: { text: classes.Step, root: classes.stepIcon } 
                                        }}
                                    >
                                        <p className={classes.stepText}>Pasirinkite kiekį ir užsakykite</p>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Hidden>
                        <Grid container>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.col1} >
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.mobileStepParentBox}}>
                                    <Box classes={{root: classes.mobileStepNumberBox}}>
                                        <h2>1</h2>
                                    </Box>
                                    <h2>Pasirinkite produkto parametrus</h2>
                                </Box>
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
                                                    optionsValues={optionsValues}
                                                />
                                            : item.type === 0 && item.summon && item.summon !== 0 ? 
                                                <Collapse in={collapseOpen(item.summon)}>
                                                    <SelectOption 
                                                        index={index} 
                                                        product={product}
                                                        handleOptionChange={handleOptionChange}
                                                        select={select}
                                                        optionsValues={optionsValues}
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
                                            rows={3}
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
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.mobileStepParentBox}}>
                                    <Box classes={{root: classes.mobileStepNumberBox}}>
                                        <h2>2</h2>
                                    </Box>
                                    <h2>Įkelkite failą</h2>
                                </Box>
                                <Box display='flex' justifyContent='center' alignItems='flex-start' classes={{root: classes.middleBox}}>
                                    <Hidden smDown>
                                        <Divider orientation="vertical" flexItem classes={{root: classes.divider1}}/>
                                    </Hidden>
                                    <Box style={{width: '100%'}}>
                                        <Box>
                                            { file.URL ? 
                                                <>
                                                    { file.projectPreviewArray.length > 0 ? 
                                                        <>
                                                            {file.projectPreviewArray.map((prieviewPic) => 
                                                                <Box>
                                                                    {file.type === 'application/pdf' ? 
                                                                        <embed src={`${file.URL}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} /> 
                                                                    : 
                                                                        <img className={classes.image} src={`${prieviewPic}?${+ new Date().getTime()}`} alt=""/>
                                                                    }
                                                                </Box>
                                                            )}
                                                        </>
                                                    :
                                                        <Box>
                                                            {/* {!imgLoaded && <Skeleton variant="rect" classes={{root: classes.skeleton}}/>}
                                                            onLoad={() => setImgLoaded(true)}
                                                            onLoad={() => setImgLoaded(true)} */}
                                                            {file.type === 'application/pdf' ? 
                                                                <embed src={`${file.URL}#toolbar=0&navpanes=0&scrollbar=0`} className={classes.pdf} /> 
                                                            : 
                                                                <img className={classes.image} src={file.URL} alt=""/>
                                                            }
                                                        </Box>
                                                    }
                                                </>
                                            :
                                                <p className={classes.pictureText}>
                                                    Priimame visus paveikslėlių failo formatus ir PDF formatą. Rekomenduojame PDF formatą. Jeigu gaminys turi daugiau negu vieną paveikslėlį, paruoškite failą PDF formatu. Abu paveikslėliai turi būti pateikti viename PDF faile. Maksimalus failo dydis 100MB.
                                                </p>
                                            }
                                        </Box>
                                        <Box>     
                                            {file.URL ?
                                                <>
                                                    {file.projectId !== '' ?
                                                        <>
                                                            <EditDesignButtom 
                                                                userid={userid}
                                                                productID={product._id}
                                                                productName={product.name}
                                                                file={file}
                                                                setFile={setFile}
                                                            />
                                                            <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                component="span" 
                                                                classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
                                                                startIcon={<FaTrashAlt size={17} className={classes.icon}/>}
                                                                onClick={() => setFile({
                                                                    src: null,
                                                                    URL: '',
                                                                    type: '',
                                                                    size: 0,
                                                                    name: '',
                                                                    projectPreviewArray: [],
                                                                    projectId: ''
                                                                })}
                                                            >
                                                                Trinti
                                                            </Button>
                                                        </>
                                                    :
                                                        <>
                                                            <label htmlFor="upload_product_icon">
                                                                <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} startIcon={<FaExchangeAlt size={17} className={classes.icon}/>}>
                                                                    Pakeisti
                                                                </Button>
                                                            </label>
                                                            <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                component="span" 
                                                                classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
                                                                startIcon={<FaTrashAlt size={17} className={classes.icon}/>}
                                                                onClick={() => setFile({
                                                                    src: null,
                                                                    URL: '',
                                                                    type: '',
                                                                    size: 0,
                                                                    name: '',
                                                                    projectPreviewArray: [],
                                                                    projectId: ''
                                                                })}
                                                            >
                                                                Trinti
                                                            </Button>
                                                        </>
                                                    }
                                                </>
                                                
                                            : 
                                                <>
                                                    <label htmlFor="upload_product_icon">
                                                        <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} startIcon={<AiOutlineCloudUpload size={27} className={classes.icon}/>}>
                                                            Įkelti
                                                        </Button>
                                                    </label>
                                                    <Button 
                                                        variant="contained" 
                                                        color="primary" component="span" 
                                                        classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
                                                        startIcon={<FaPaintBrush size={20} className={classes.icon}/>}
                                                        onClick={() => setSelectTemplateModalOpen(true)}
                                                    >
                                                        Kurti dizainą
                                                    </Button>
                                                </>
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
                                    <Hidden smDown>
                                        <Divider orientation="vertical" flexItem classes={{root: classes.divider2}}/>
                                    </Hidden>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.col3}>
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.mobileStepParentBox}}>
                                    <Box classes={{root: classes.mobileStepNumberBox}}>
                                        <h2>3</h2>
                                    </Box>
                                    <h2>Pasirinkite kiekį, gamybos laiką ir užsakykite</h2>
                                </Box>
                                <h2 className={classes.OptionTitleHeader}>Kiekis</h2>
                                {product.kiekioPasirinkimoModelis === 1 ? 
                                    <FormControl variant="outlined" classes={{root: classes.formVariantSelect}} focused={false}>
                                        <Select
                                            id="fiksuoto_kiekio_select"
                                            variant='outlined'
                                            classes={{outlined: classes.variantSelect, iconOutlined: classes.variantSelectIcon}}
                                            value={kiekis}
                                            onChange={handleKiekisChange}
                                            defaultValue={kiekis}
                                            MenuProps={{ classes: { paper: classes.menuitself, list: classes.menuPaper } }}
                                            renderValue={(value) => 
                                                <Box classes={{root: classes.selectRenderOuterBox}}>
                                                    <p className={classes.selectRender2}>{value}</p>
                                                </Box> 
                                            }
                                        >
                                            {product.amountDiscount.map((value) => 
                                            
                                                <MenuItem value={value.amount} classes={{root: classes.menuItem}}>
                                                    {value.amount}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                :
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
                                                    root: classes.cssOutlinedInput2,
                                                    focused: classes.cssFocused,
                                                    notchedOutline: classes.notchedOutline,
                                                },
                                            }}
                                        />
                                    </ClickAwayListener>
                                }
                                <MaketavimoKaina 
                                    maketavimoKaina={maketavimoKaina}
                                    papildomaMaketavimoKaina={papildomaMaketavimoKaina}
                                    setPapildomaMaketavimoKaina={setPapildomaMaketavimoKaina}
                                />
                                {optionsValues.map((item, index) => 
                                    <>
                                        {item.type === 0 && (!item.summon || item.summon === 0) ? 
                                            <p key={index} className={classes.summaryText}>{item.name}: <b>{item.value}</b></p>
                                        : item.type === 0 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <p key={index} className={classes.summaryText}>{item.name}: <b>{item.value}</b></p>
                                            </Collapse>
                                        : item.type === 1 && (!item.summon || item.summon === 0) ? 
                                            <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</b></p>
                                        : item.type === 1 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstName}- {item.firstValue}, {item.secondName}- {item.secondValue}</b></p>
                                            </Collapse>
                                        : item.type === 2 && (!item.summon || item.summon === 0) ? 
                                            <p key={index} className={classes.summaryText}>{item.name}: <b>{item.value}</b></p>
                                        : item.type === 2 && item.summon && item.summon !== 0 ? 
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <p key={index} className={classes.summaryText}>{item.name}: <b>{item.value}</b></p>
                                            </Collapse>
                                        : item.type === 3 && (!item.summon || item.summon === 0) ?
                                            <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstValue}</b></p> 
                                        : item.type === 3 && item.summon && item.summon !== 0 &&
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstValue}</b></p>  
                                            </Collapse>
                                        }
                                    </>
                                )}
                                <p className={classes.summaryText}>Kiekis: <b>{kiekis}</b></p>
                                <p className={classes.summaryText}>Vieneto kaina: <b>{unitPrice.price.toFixed(2)}€</b></p>
                                <Collapse in={papildomaMaketavimoKaina > 0}>
                                    <p className={classes.summaryText}>Maketavimo kaina: <b>{papildomaMaketavimoKaina}€</b></p>
                                </Collapse>
                                <Collapse in={pastaba !== ''}>
                                    <p className={classes.summaryText}>Pastaba: <b>{pastaba}</b></p>
                                </Collapse>
                                <Collapse in={appliedDiscount.discount > 0}>
                                    <p className={classes.discountText}>{appliedDiscount.discountName}: <b>{appliedDiscount.discount}%</b></p>
                                </Collapse>
                                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                    <p className={classes.PriceText}>Kaina:</p>
                                    {unitPrice.discount > 0 || loyaltydiscount > 0 ? 
                                        <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
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
                                    classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
                                    startIcon={!uploading && <FaShoppingCart size={20} className={classes.icon}/>}
                                    disabled={uploading}
                                    onClick={addToCart}
                                    style={uploading ? {background: `linear-gradient(90deg, ${theme.myTheme.tZalia.dark} ${uploadProgress}%, ${theme.myTheme.tZalia.light} 0%)`}
                                    : 
                                    file.URL === '' ?
                                        {background: `linear-gradient(90deg, 0%, ${theme.myTheme.tZalia.light} 0%)`}
                                    :
                                        {background: `linear-gradient(90deg, ${theme.myTheme.tZalia.dark} ${100}%, ${theme.myTheme.tZalia.light} 0%)`}
                                    }
                                >
                                    {uploading ? file.src !== null && (uploadProgress >= 0 || uploadProgress < 100) ? `Įkeliamas failas - ${uploadProgress}%` : <CircularProgress size={20} className={classes.icon}/> : 'Į krepšelį'}
                                </Button>
                            </Grid>
                        </Grid>
                        <Comments product={product} firstName={firstName} personalas={personalas} token={token}/>
                        {product.name && 
                            <>
                                {product.galerija.length > 0 &&
                                    <Galery product={product}/>
                                }
                            </>
                        }
                    </Box>
                {/* </Box>   */}
            </Box>
            }
        </>
    )
}

export default ProductPage
