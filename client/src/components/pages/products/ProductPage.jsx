import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hidden, StepConnector, ListItemText, ListItem, MenuItem, Select, FormControl, Box, Grid, Breadcrumbs, Stepper, Step, StepLabel, Collapse, TextField, Button, Divider, Snackbar, ClickAwayListener, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx' 
import { Link, useHistory } from 'react-router-dom'; 
import MuiAlert from '@material-ui/lab/Alert';
// import Skeleton from '@material-ui/lab/Skeleton';
import NumberDoubleOption from './NumberDoubleOption.jsx';
import NumberOption from './NumberOption.jsx';
import PictureOption from './PictureOption.jsx'
import SelectOption from './SelectOption.jsx';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import ProductSkeleton from './ProductSkeleton.jsx';
import axios from "axios";
import ProductAddedModal from './ProductAddedModal.jsx';
import MaketavimoKaina from './MaketavimoKaina';
import Comments from './Comments'
import Galery from './Galery'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        minHeight: '90vh',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        padding: '0 1rem',
        [theme.breakpoints.up('xxl')]: {
            padding: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            paddingBottom: '5rem'
        },
    },
    header: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1.8rem',
        margin: '0',
        padding: '1rem 0 1rem 0',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.7rem',
            padding: '1.5rem 0 1.5rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.6rem',
            padding: '2rem 0 2rem 0',
        },
    },
    content: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
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
        pointerEvents: 'none',
    },
    img: {
        height: '100%', 
        width: '100%', 
        objectFit: 'contain'
    },
    imageBoxx: {
        padding: '0 2rem 0 2rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '0 3rem 0 3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 4rem 0 4rem',
        },
    },
    descText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.9rem',
        padding: '0',
        margin: '0',
        textAlign: 'justify',
        textJustify: 'inter-word',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    stepText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        padding: '0',
        margin: '0',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.7rem',
        },
    },
    pictureText: {
        textAlign: 'justify',
        textJustify: 'inter-word',
        padding: '0',
        margin: '0',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.7rem',
        },
    },
    Stepper: {
        backgroundColor: 'transparent',
        padding: '4rem 0 1rem 0',
        [theme.breakpoints.up('xxl')]: {
            padding: '6rem 0 1.5rem 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '8rem 0 2rem 0',
            fontSize: '1.8rem',
        },
    },
    Step: {
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            // fontSize: '1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            // fontSize: '1.4rem',
        },
    },
    stepIcon: {
        fontSize: '1.5rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.25rem',
            marginTop: '-.3rem',
            outline: `1.5rem solid ${theme.myTheme.trecia}`
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3rem',
            marginTop: '-.6rem',
            outline: `1.5rem solid ${theme.myTheme.trecia}`
        },
    },
    stepConnector: {
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2rem'
        },
    },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: '.5rem 1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.9rem',
            margin: '.75rem 1.5rem',
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
    pastaba: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '4px',
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
        },
    },
    OptionTitleHeader: {
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1rem',
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    input: {
        display: 'none',
    },
    uploadButton: {
        width: '100%',
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        margin: '.5rem 0 1rem 0',
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            margin: '.75rem 0 1.5rem 0',
            height: '3.375rem',
            borderRadius: '7px',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '1rem 0 2rem 0',
            height: '5rem',
            borderRadius: '9px',
            fontSize: '1.8rem',
        },
    },
    uploadButtonLabel: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
    },
    middleBox: {
        width: '100%',
        height: '100%',
    },
    col1: {
        paddingRight: 0,
        [theme.breakpoints.up('md')]: {
            paddingRight: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            paddingRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingRight: '2rem',
        },
    },
    col2: {

    },
    col3: {
        paddingLeft: 0,
        [theme.breakpoints.up('md')]: {
            paddingLeft: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '2rem',
        },
    },
    divider1: {
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '2rem',
        },
    },
    divider2: {
        marginLeft: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginLeft: '2rem',
        },
    },
    image: {
        width: '100%',
        maxHeight: '30rem',
        objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            maxHeight: '45rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxHeight: '60rem',
        },
    },
    pdf: {
        width: '100%',
        objectFit: 'contain',
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
    icon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    breakcrumbs: {
        margin: '1rem 0 0 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '1rem 0 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '1rem 0 0 0',
            fontSize: '1.8rem',
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
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    mobileStepNumberBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.myTheme.pirma,
        borderRadius: '1.5rem',
        padding: '1rem',
        height: '1.5rem',
        width: '1.5rem',
        margin: '0 .5rem 0 0',
        color: theme.myTheme.trecia,
    },
    mobileStepParentBox: {
        margin: '1rem 0',
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
}));

const ProductPage = ({ products, loyaltydiscount, getCart, cart, roundTwoDec, maketavimoKaina, firstName, personalas, token }) => {

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
        name: ''
    });
    const [snackbar, setSnackbar] = useState('');
    const [kiekis, setKiekis] = useState(1);
    const [unitPrice, setUnitPrice] = useState({
        price: 0,
        discount: 0
    });
    const [gamybosLaikas, setGamybosLaikas] = useState([]);
    const [amountArray, setAmountArray] = useState([]);
    const [pasirinktasGamybosLaikas, setPasirinktasGamybosLaikas] = useState('3-5 darbo dienos.');
    const [gamybosPabrangimas, setGamybosPabrangimas] = useState(1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [cartItemId, setCartItemId] = useState('');
    const [papildomaMaketavimoKaina, setPapildomaMaketavimoKaina] = useState(0);
    // const [imgLoaded, setImgLoaded] = useState(false);

    const resetEverything = () => {
        setPastaba('');
        setFile({
            src: null,
            URL: '',
            type: '',
            size: 0,
            name: ''
        });
        setUnitPrice({
            price: 0,
            discount: 0
        });
        setPasirinktasGamybosLaikas('3-5 darbo dienos.');
        setGamybosPabrangimas(1);
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
                const dscnt = 1 - (amountArray[0].discount / 100) - (loyaltydiscount / 100);
                const roundedTotalDiscountedPrice = roundTwoDec(unitPrice.price * amountArray[0].amount * dscnt + papildomaMaketavimoKaina);
                return roundedTotalDiscountedPrice.toFixed(2);
            } else {
                const dscnt = 1 - (unitPrice.discount / 100) - (loyaltydiscount / 100);
                const roundedTotalDiscountedPrice = roundTwoDec(unitPrice.price * Math.round(kiekis) * dscnt + papildomaMaketavimoKaina);
                return roundedTotalDiscountedPrice.toFixed(2);
            } 
        }
    };

    const handleGamybosLaikasChange = (e) => {
        setPasirinktasGamybosLaikas(e.target.value);
    };

    const handlePastabaChange = (e) => {
        setPastaba(e.target.value);
    };

    const handleKiekisChange = (e) => {
        setKiekis(e.target.value);
        gamybosLaikoKorekcija(Number(e.target.value));
    };

    const gamybosLaikoKorekcija = (quantity) => {
        if (gamybosLaikas.length > 0) {
            if (pasirinktasGamybosLaikas === gamybosLaikas[1].name && gamybosLaikas[1].limit < quantity) {
                setPasirinktasGamybosLaikas(gamybosLaikas[0].name);
                setGamybosPabrangimas((gamybosLaikas[0].price / 100) + 1);
            } else if (pasirinktasGamybosLaikas === gamybosLaikas[2].name && gamybosLaikas[2].limit < quantity) {
                setPasirinktasGamybosLaikas(gamybosLaikas[1].name);
                setGamybosPabrangimas((gamybosLaikas[1].price / 100) + 1);
            }
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
        setUploading(true);
        try {
            const formData = new FormData();
            if (file.src !== null) { 
                formData.append('image', file.src);
            } else if (file.URL) {
                formData.append('imageURL', file.URL);
            }
            formData.append('name', product.name);
            formData.append('productID', product._id);
            formData.append('productLink', product.link);
            formData.append('id', cartItemId);
            formData.append('options', JSON.stringify(optionsValues));
            formData.append('pastaba', pastaba);
            formData.append('quantity', Number(kiekis));
            formData.append('gamybosLaikas', pasirinktasGamybosLaikas);
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
                        name: ''
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
                    setPasirinktasGamybosLaikas(response.data.gamybosLaikas);
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
                return obj.link === encodeURIComponent(link)
            });
            if (result) {
                console.log(result);
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
                            name: ''
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
                        setPasirinktasGamybosLaikas(cartItem.gamybosLaikas);
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
    }, [products, link]);

    useEffect(() => {
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
        gamybosLaikoKorekcija(kiekis);
        setUnitPrice({
            price: roundTwoDec((unitPrice + addonPrice) * gamybosPabrangimas),
            discount: unitDiscount
        });
        // eslint-disable-next-line
    }, [amountArray, kiekis, optionsValues, gamybosPabrangimas]);

    useEffect(() => {
        if (gamybosLaikas.length > 0) {
            for (const item of gamybosLaikas) {
                if (item.name === pasirinktasGamybosLaikas) {
                    setGamybosPabrangimas((item.price / 100) + 1);
                }
            }
        }
        // eslint-disable-next-line
    }, [pasirinktasGamybosLaikas]);

    return (
        <>
            { products.length <= 0 ? 
            <ProductSkeleton />
            :
            <Box maxWidth='xl' classes={{root: classes.root}} >
                <Helmet>
                    <title>{product.name} | {ProjectName}</title>  
                </Helmet>
                <Snackbar open={snackbar !== ''} autoHideDuration={5000} onClose={handleClose}> 
                    <Alert severity="warning">{snackbar}</Alert>
                </Snackbar>
                <ProductAddedModal 
                    addModalOpen={addModalOpen} 
                    setAddModalOpen={setAddModalOpen}
                    file={file}
                    optionsValues={optionsValues}
                    collapseOpen={collapseOpen}
                    productName={product.name}
                    kiekis={kiekis}
                    unitPrice={unitPrice}
                    pasirinktasGamybosLaikas={pasirinktasGamybosLaikas}
                    pastaba={pastaba}
                    loyaltydiscount={loyaltydiscount}
                    getDiscountedPrice={getDiscountedPrice}
                    getPrice={getPrice}
                    papildomaMaketavimoKaina={papildomaMaketavimoKaina}
                />
                <Box display='flex' justifyContent='center' style={{paddingBottom: '2rem'}}>
                    <Box classes={{root: classes.content}}>
                        <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                            <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                            <Link to='/products' className={classes.breadcrumbLink}>Produktai</Link>
                            <Link to={`/products/${encodeURIComponent(link)}`} className={classes.breadcrumbLinkDisabled}>{product.name}</Link>
                        </Breadcrumbs>
                        <Grid container style={{margin: '0'}}>
                            <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                                <Box display='flex' justifyContent='flex start'>
                                    <h1 className={classes.header}>{product.name}</h1> 
                                </Box>
                                <Box display='flex' justifyContent='flex start'>
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
                                connector={<StepConnector classes={{root: classes.stepConnector}}/>}
                            >
                                <Step active={true}>
                                    <StepLabel 
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
                                        <p className={classes.stepText}>Įkelkite failą</p>
                                    </StepLabel>
                                </Step>
                                <Step active={true}>
                                    <StepLabel 
                                        StepIconProps={{ 
                                            classes: { text: classes.Step, root: classes.stepIcon } 
                                        }}
                                    >
                                        <p className={classes.stepText}>Pasirinkite kiekį, gamybos laiką ir užsakykite</p>
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
                                        <MaketavimoKaina 
                                            maketavimoKaina={maketavimoKaina}
                                            papildomaMaketavimoKaina={papildomaMaketavimoKaina}
                                            setPapildomaMaketavimoKaina={setPapildomaMaketavimoKaina}
                                        />
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
                                            :
                                                <p className={classes.pictureText}>
                                                    Priimame visus paveikslėlių failo formatus ir PDF formatą. Rekomenduojame PDF formatą. Jeigu gaminys turi daugiau negu vieną paveikslėlį, paruoškite failą PDF formatu. Abu paveikslėliai turi būti pateikti viename PDF faile. Maksimalus failo dydis 100MB.
                                                </p>
                                            }
                                        </Box>
                                        <Box>     
                                            {file.URL ?
                                                <label htmlFor="upload_product_icon">
                                                    <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} startIcon={<FaExchangeAlt size={17} className={classes.icon}/>}>
                                                        Pakeisti
                                                    </Button>
                                                </label>
                                            : 
                                                <label htmlFor="upload_product_icon">
                                                    <Button variant="contained" color="primary" component="span" classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} startIcon={<AiOutlineCloudUpload size={27} className={classes.icon}/>}>
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
                                <h2 className={classes.OptionTitleHeader}>Gamybos laikas</h2>
                                <FormControl classes={{root: classes.formVariantSelect}} focused={false}>
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
                                        {gamybosLaikas.map((item) => 
                                            <MenuItem value={item.name} classes={{root: classes.menuItem}} disabled={item.limit < kiekis}>
                                                <ListItem classes={{root: classes.listItem}}>
                                                    <ListItemText 
                                                        classes={{
                                                            primary: classes.primaryListText,
                                                        }}
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
                                            <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstName}- {item.firstValue}</b></p> 
                                        : item.type === 3 && item.summon && item.summon !== 0 &&
                                            <Collapse in={collapseOpen(item.summon)}>
                                                <p key={index} className={classes.summaryText}>{item.name}: <b>{item.firstName}- {item.firstValue}</b></p>  
                                            </Collapse>
                                        }
                                    </>
                                )}
                                <p className={classes.summaryText}>Kiekis: <b>{kiekis}</b></p>
                                <p className={classes.summaryText}>Vieneto kaina: <b>{unitPrice.price.toFixed(2)}€</b></p>
                                <p className={classes.summaryText}>Gamybos Laikas: <b>{pasirinktasGamybosLaikas}</b></p>
                                <Collapse in={papildomaMaketavimoKaina > 0}>
                                    <p className={classes.summaryText}>Maketavimo kaina: <b>{papildomaMaketavimoKaina}€</b></p>
                                </Collapse>
                                <p className={classes.summaryText}>Pastaba: <b>{pastaba}</b></p>
                                <Collapse in={unitPrice.discount > 0}>
                                    <p className={classes.discountText}>Nuolaida: <b>{unitPrice.discount}%</b></p>
                                </Collapse>
                                <p className={classes.discountText}>Tavo reklama klubo nuolaida: <b>{loyaltydiscount}%</b></p>
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
                                    style={uploading ? {background: `linear-gradient(90deg, ${theme.myTheme.pirma} ${uploadProgress}%, #f7bbc0 0%)`}
                                    : 
                                    file.URL === '' ?
                                        {background: `linear-gradient(90deg, 0%, #f7bbc0 0%)`}
                                    :
                                        {background: `linear-gradient(90deg, ${theme.myTheme.pirma} ${100}%, #f7bbc0 0%)`}
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
                </Box>  
            </Box>
            }
        </>
    )
}

export default ProductPage
