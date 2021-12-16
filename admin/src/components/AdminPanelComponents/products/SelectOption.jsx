import { useState, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Button, FormControl, Select, MenuItem, OutlinedInput, Tooltip, ListItemText, ListItem, ListItemAvatar } from '@material-ui/core';
import { FaInfoCircle, FaTimes, FaTrash } from 'react-icons/fa';
import MoveOptions from './MoveOptions';
import SummonSelect from './SummonSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 0 1rem 0',
        padding: '0 0 0 1.2rem'
    },
    variantSelect: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        // border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
        borderRadius: '4px',
        '&:focus': {
            borderRadius: '4px',
            // border: `1px solid ${theme.myTheme.trecia}`,
        }, 
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
        },
    },
    variantSelectIcon: {
        color: theme.myTheme.trecia,
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
        marginTop: '-.5rem',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5) translateX(-.75rem)',
            marginTop: '-.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateX(-1rem)',
            marginTop: '-1rem',
        },
    },
    formVariantSelect: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        },
    },
    exampleHeaderBox: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        },
    },
    formVariant: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        },
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem'
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
            maxWidth: '15rem',
            maxheight: '22.5rem',
            margin: '0 0 1.5rem 0',
            padding: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '20rem',
            maxheight: '30rem',
            margin: '0 0 2rem 0',
            padding: '2rem',
        },
    },
    infotext: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 1.5rem 0',
            fontSize: '1.125rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            fontSize: '1.5rem',
        },
    },
    infoTextRed: {
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 1.5rem 0',
            fontSize: '1.125rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            fontSize: '1.5rem',
        },
    },
    input: {
        display: 'none',
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
        },
    },
    diasbleOutline: {
        border: 'none',
    },
    infoIcon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    innerGridItem: {
        margin: '0',
        [theme.breakpoints.up('md')]: {
            margin: '0 0 0 1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 0 2rem',
        },
    },
    innerGridItemRight: {
        margin: '0',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 0 1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0',
        },
    },
    imageinfoBox: {
        maxWidth: '21rem',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '31.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '41rem',
        },
    },
    optionsDisplayBox: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        height: '20rem',
        padding: '.5rem',
        borderRadius: '4px',
        border: `1px solid ${theme.myTheme.trecia}`,
        overflowY: 'auto',
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
            height: '30rem',
            padding: '.75rem',
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
            height: '40rem',
            padding: '1rem',
            borderRadius: '8px',
        },
    },
    optionDisplayItem: {
        width: '100%',
        padding: '.5rem',
        borderRadius: '4px',
        border: `1px solid ${theme.myTheme.antra}`,
        backgroundColor: theme.myTheme.ketvirta,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.myTheme.antra,
        }, 
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem',
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem',
            borderRadius: '8px',
        },
    },
    optionNameText: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.95rem',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.9rem',
        },
    },
    optionDescText: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.75rem',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.125rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.5rem',
        },
    },
    closeIcon: {
        color: theme.myTheme.sriftoSpalva,
        '&:hover': {
           cursor: 'pointer',
           color: '#0d1726',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        }, 
    },
    optionDisplayImageBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    optionDisplayImage: {
        width: '2.5em',
        objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            width: '3.375em',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '5em',
        },
    },
    variantNameSingleBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    variantSelectExample: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
        padding: '0',
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
            margin: '0 0 1.5rem 0',
            minHeight: '5.25rem',
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            minHeight: '7rem',
            borderRadius: '8px',
        },
    },
    variantSelectSummon: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
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
            margin: '0 0 1.5rem 0',
            padding: '0 0 0 1.5rem',
            minHeight: '5.25rem',
            borderRadius: '6px',
            fontSize: '1.4rem',
            '&:focus': {
                borderRadius: '6px',
            }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            padding: '0 0 0 2rem',
            minHeight: '7rem',
            borderRadius: '8px',
            fontSize: '1.8rem',
            '&:focus': {
                borderRadius: '8px',
            }, 
        },
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
    menuItem: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        },
        overflowWrap: 'break-word',
    },
    primaryListText: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem'
        },
    },
    secondaryListText: {
        color: '#bfbfbf',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem'
        },
    },
    avatar: {
        backgroundColor: 'transparent'
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto'
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        }, 
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.5)',
            marginRight: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)',
            marginRight: '2rem'
        },
    },
    cancelButton: {
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '0',
        },
        [theme.breakpoints.up('xxl')]:{
            height: '3.75rem',
            fontSize: '1.4rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]:{
            height: '5rem',
            fontSize: '1.8rem',
            borderRadius: '9px',
        },
    },
    addoptionButton: {
        width: '16rem',
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
            marginBottom: '0',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '31.5rem',
            height: '3.75rem',
            fontSize: '1.4rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
            height: '5rem',
            fontSize: '1.8rem',
            borderRadius: '9px',
        },
    },
    optionsBox: {
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            padding: '0 1rem 0 1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1.5rem 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0',
        },
    },
    optionsDisplayBoxParent: {
        marginLeft: '0',
        [theme.breakpoints.up('md')]: {
            marginLeft: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            marginLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginLeft: '2rem',
        },
    },
    optionDisplayTextBox: {
        width: '100%', 
        overflowWrap: 'break-word',
        // [theme.breakpoints.up('sm')]: {
        //     width: '13rem', 
        //     overflowWrap: 'break-word',
        // },
    },
}));

const SelectOption = ({ productInfo, itemIndex, setProductInfo, setSnackbar, productOptionsMemo, setProductOptionsMemo }) => {

    const classes = useStyles();
    const theme = useTheme();
    const inputField = useRef(null)

    const [, setVariant] = useState({
        fileSrc: null,
        fileURL: '',
        fileOriginalName: '',
        variantName: '',
        variantDesc: '',
        priceAdd: 0,
        optionIndex: null,
        summonID: 0,
    });
    
    const [dummyValue, setDummyValue] = useState(0);

    const handleFile = () => {
        const image = inputField.current.files[0];
        if (image) {
            const optionsCopy = productOptionsMemo;
            if (image) {
                optionsCopy[itemIndex].fileSrc = image;
                optionsCopy[itemIndex].fileURL = URL.createObjectURL(image);
                optionsCopy[itemIndex].fileOriginalName = image.name;
            }
            setProductOptionsMemo(optionsCopy);
            setVariant(prev => ({
                ...prev,
                fileSrc: image,
                fileURL: URL.createObjectURL(image) //[e.target.id]
            }));
        }
    };

    const deletePic = () => {
        const optionsCopy = productOptionsMemo;
        optionsCopy[itemIndex].fileSrc = null;
        optionsCopy[itemIndex].fileURL = '';
        optionsCopy[itemIndex].fileOriginalName = '';
        setProductOptionsMemo(optionsCopy);
        setVariant(prev => ({
            ...prev,
            fileSrc: null,
            fileURL: ''
        }));
    };

    const handleVariantChange = (prop) => (event) => {
        const optionsCopy = productOptionsMemo;
        optionsCopy[itemIndex][prop] = event.target.value
        setProductOptionsMemo(optionsCopy);
        setVariant(prev => ({ ...prev, [prop]: event.target.value }));
    };

    const addOption = () => {
        if (productOptionsMemo[itemIndex].optionIndex !== null) {
            const arrayCopy = productInfo.options;
            var innerArrayCopy1 = productInfo.options[itemIndex].menuOptions;
            innerArrayCopy1[productOptionsMemo[itemIndex].optionIndex] = productOptionsMemo[itemIndex];
            arrayCopy[itemIndex].menuOptions = innerArrayCopy1;
            setProductInfo({ ...productInfo, options: arrayCopy});
            const optionsCopy = productOptionsMemo;
            optionsCopy[itemIndex] = {
                fileSrc: null,
                fileURL: '',
                fileOriginalName: '',
                variantName: '',
                variantDesc: '',
                priceAdd: 0,
                optionIndex: null,
                summonID: 0,
            }
            setProductOptionsMemo(optionsCopy);
            setVariant({
                fileSrc: null,
                fileURL: '',
                fileOriginalName: '',
                variantName: '',
                variantDesc: '',
                priceAdd: 0,
                optionIndex: null,
                summonID: 0,
            });
            
        } else {
            if (productOptionsMemo[itemIndex].variantName) {
                const arrayCopy = productInfo.options;
                var innerArrayCopy = productInfo.options[itemIndex].menuOptions;
                innerArrayCopy.push(productOptionsMemo[itemIndex]);
                arrayCopy[itemIndex].menuOptions = innerArrayCopy;
                setProductInfo({ ...productInfo, options: arrayCopy});
                const optionsCopy = productOptionsMemo;
                optionsCopy[itemIndex] = {
                    fileSrc: null,
                    fileURL: '',
                    fileOriginalName: '',
                    variantName: '',
                    variantDesc: '',
                    priceAdd: 0,
                    optionIndex: null,
                    summonID: 0,
                }
                setProductOptionsMemo(optionsCopy);
                setVariant({
                    fileSrc: null,
                    fileURL: '',
                    fileOriginalName: '',
                    variantName: '',
                    variantDesc: '',
                    priceAdd: 0,
                    optionIndex: null,
                    summonID: 0,
                });
               
            } else {
                setSnackbar({
                    message: 'Įrašykite pasirinkimą.',
                    open: true,
                });
            }
        }
    };

    const handleProductInfoNameChange = (e) => {
        const arrayCopy = productInfo.options;
        arrayCopy[itemIndex].name = e.target.value;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoInfoChange = (e) => {
        const arrayCopy = productInfo.options;
        arrayCopy[itemIndex].info = e.target.value;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const deleteOption = (e, item_index) => {
        e.stopPropagation();
        const arrayCopy = productInfo.options;
        var innerArrayCopy = productInfo.options[itemIndex].menuOptions;
        innerArrayCopy = productInfo.options[itemIndex].menuOptions.filter(function(item, index) {
            return index !== item_index
        });
        arrayCopy[itemIndex].menuOptions = innerArrayCopy;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const editOption = (item_index) => {
        const optionsCopy = productOptionsMemo;
        optionsCopy[itemIndex] = {
            fileSrc: productInfo.options[itemIndex].menuOptions[item_index].fileSrc,
            fileURL: productInfo.options[itemIndex].menuOptions[item_index].fileURL,
            fileOriginalName:  productInfo.options[itemIndex].menuOptions[item_index].fileOriginalName,
            variantName: productInfo.options[itemIndex].menuOptions[item_index].variantName,
            variantDesc: productInfo.options[itemIndex].menuOptions[item_index].variantDesc,
            priceAdd: productInfo.options[itemIndex].menuOptions[item_index].priceAdd,
            optionIndex: item_index,
            summonID: productInfo.options[itemIndex].menuOptions[item_index].summonID,
        }
        setProductOptionsMemo(optionsCopy);
        setVariant({
            fileSrc: productInfo.options[itemIndex].menuOptions[item_index].fileSrc,
            fileURL: productInfo.options[itemIndex].menuOptions[item_index].fileURL,
            fileOriginalName:  productInfo.options[itemIndex].menuOptions[item_index].fileOriginalName,
            variantName: productInfo.options[itemIndex].menuOptions[item_index].variantName,
            variantDesc: productInfo.options[itemIndex].menuOptions[item_index].variantDesc,
            priceAdd: productInfo.options[itemIndex].menuOptions[item_index].priceAdd,
            optionIndex: item_index,
            summonID: productInfo.options[itemIndex].menuOptions[item_index].summonID,
        });
    };

    const handleDummyValueChange = (e) => {
        setDummyValue(e.target.value);
    };

    const handleOpdtionDelete = () => {
        setProductOptionsMemo(productOptionsMemo.filter(function(value, index, arr) {
            return index !== itemIndex
        }));
        setProductInfo({ ...productInfo, options: productInfo.options.filter(function(value, index, arr) {
            return index !== itemIndex
        })});
    };

    return (
        <Box classes={{root: classes.root}}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                        <SummonSelect 
                            itemIndex={itemIndex}
                            setProductInfo={setProductInfo}
                            productInfo={productInfo}
                        />
                        <MoveOptions 
                            itemIndex={itemIndex}
                            setProductInfo={setProductInfo}
                            setProductOptionsMemo={setProductOptionsMemo}
                            arraylength={productInfo.options.length}
                            productInfo={productInfo}
                            productOptionsMemo={productOptionsMemo}
                        />
                        <Tooltip title='Ištrinti pasirinkimą' placement="top" arrow>
                            <div>
                                <FaTrash size={20} onClick={handleOpdtionDelete} className={classes.deleteIcon}/>
                            </div>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: '0 0 1rem 0'}}>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} >
                            <Box className={classes.exampleHeaderBox}>
                                <Grid container justifyContent="space-between">
                                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                                        {productInfo.options[itemIndex].name ?
                                            <h3 className={classes.header}>{productInfo.options[itemIndex].name}</h3>
                                        :
                                            <h3 className={classes.header}>Peržiūra</h3>
                                        }
                                    </Grid>    
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                                        {productInfo.options[itemIndex].info && 
                                            <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                                <Tooltip title={productInfo.options[itemIndex].info} placement="top" arrow>
                                                    <div>
                                                        <FaInfoCircle 
                                                            size={20} 
                                                            className={classes.infoIcon} 
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </Box> 
                                        }
                                    </Grid> 
                                </Grid>
                            </Box>
                            <Box>
                                <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                    <Select
                                        id="simple-select-outlined"
                                        classes={{root: classes.variantSelectExample, icon: classes.variantSelectIconExample}}
                                        value={dummyValue}
                                        onChange={(e) => handleDummyValueChange(e)}
                                        defaultValue={0}
                                        disableUnderline
                                        MenuProps={{ classes: { list: classes.menuPaper } }}
                                    >
                                        { productInfo.options[itemIndex].menuOptions.length > 0 && productInfo.options[itemIndex].menuOptions.map((item, index) => 
                                            <MenuItem value={index} classes={{root: classes.menuItem}}>
                                                { item.fileURL && item.variantName && item.variantDesc ? 
                                                    <ListItem classes={{root: classes.listItem}}>
                                                        <ListItemAvatar style={{marginRight: '.5rem'}}>
                                                            <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                        </ListItemAvatar>
                                                        <ListItemText 
                                                            classes={{
                                                                primary: classes.primaryListText,
                                                                secondary: classes.secondaryListText,
                                                            }}
                                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            secondaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            primary={item.variantName} 
                                                            secondary={item.variantDesc} 
                                                        />
                                                    </ListItem>
                                                :
                                                item.fileURL && item.variantName && !item.variantDesc ? 
                                                    <ListItem classes={{root: classes.listItem}}>
                                                        <ListItemAvatar style={{marginRight: '.5rem'}}>
                                                            <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                        </ListItemAvatar>
                                                        <ListItemText 
                                                            classes={{
                                                                primary: classes.primaryListText,
                                                            }}
                                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            primary={item.variantName}
                                                        />
                                                    </ListItem>
                                                :
                                                !item.fileURL && item.variantName && item.variantDesc ? 
                                                    <ListItem classes={{root: classes.listItem}}>
                                                        <ListItemText 
                                                            classes={{
                                                                primary: classes.primaryListText,
                                                                secondary: classes.secondaryListText,
                                                            }}
                                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            secondaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            primary={item.variantName} 
                                                            secondary={item.variantDesc}
                                                        />
                                                    </ListItem>
                                                :
                                                !item.fileURL && item.variantName && !item.variantDesc &&
                                                    <ListItem classes={{root: classes.listItem}}>
                                                        <ListItemText 
                                                            classes={{
                                                                primary: classes.primaryListText,
                                                            }}
                                                            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                            primary={item.variantName}
                                                        />
                                                    </ListItem>
                                                }
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} >
                            <Box className={classes.innerGridItemRight}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pavadinimas:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="Option_name"
                                        type='text'
                                        value={productInfo.options[itemIndex].name}
                                        placeholder='Pavadinimas...'
                                        onChange={(e) => handleProductInfoNameChange(e)}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>    
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <Box className={classes.innerGridItem}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Info:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="Option_info"
                                        type='text'
                                        value={productInfo.options[itemIndex].info}
                                        placeholder='Info...'
                                        onChange={(e) => handleProductInfoInfoChange(e)}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>    
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} style={{padding: '0 1rem 0 0'}}>
                            <Box classes={{root: classes.imageBox}}>
                                <Box>
                                    <h3 className={classes.header} style={{marginBottom: '1rem'}}>Varianto piktograma</h3>
                                </Box>
                                <Box>
                                    { productOptionsMemo[itemIndex].fileSrc !== null && productOptionsMemo[itemIndex].fileURL ? 
                                        <img className={classes.image} src={productOptionsMemo[itemIndex].fileURL} alt=""/>
                                    :
                                        <Box className={classes.imageinfoBox}>
                                            <p className={classes.infotext}>
                                                Geriausia png failas, nedidelis 128px dydžio, lengvas, max 20 KB. Dabartinės ikonos įkeltos iš <a style={{color: theme.myTheme.trecia}} href='https://www.flaticon.com/' target='_blank' rel="noreferrer">https://www.flaticon.com/.</a>
                                            </p>
                                            <p className={classes.infoTextRed}>
                                                Jeigu nenorite piktogramos priekyje pasirinkimo, palikite lauką tuščią.
                                            </p>
                                        </Box>
                                    }
                                </Box>
                                <Box>
                                    <label htmlFor={`upload_option_id${itemIndex}`}>
                                        <Button variant="contained" color="primary" component="span" classes={{root: classes.cancelButton}}>
                                            { productOptionsMemo[itemIndex].fileSrc !== null && productOptionsMemo[itemIndex].fileURL ? 'Pakeisti' : 'Įkelti' }
                                        </Button>
                                    </label>
                                    <input
                                        type="file" 
                                        accept=".png, .jpg, .jpeg"
                                        className={classes.input}
                                        name="photo"
                                        id={`upload_option_id${itemIndex}`}
                                        ref={inputField}
                                        onChange={handleFile}
                                    />
                                    {productOptionsMemo[itemIndex].fileSrc !== null && productOptionsMemo[itemIndex].fileURL && 
                                    <Box>
                                        <Button variant="contained" color="primary" component="span" classes={{root: classes.cancelButton}} onClick={deletePic} style={{margin: '1rem 0 0 0'}}>
                                            Ištrinti
                                        </Button>
                                    </Box>
                                    }
                                </Box>
                            </Box>
                        </Grid>   
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <Box classes={{root: classes.optionsBox}}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pasirinkimas:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="Option"
                                        type='text'
                                        value={productOptionsMemo[itemIndex].variantName}
                                        placeholder='Pasirinkimas...'
                                        onChange={handleVariantChange('variantName')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pasirinkimo aprašymas:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="Option"
                                        type='text'
                                        multiline
                                        rows={2}
                                        value={productOptionsMemo[itemIndex].variantDesc}
                                        placeholder='Pasirinkimo aprašymas...'
                                        onChange={handleVariantChange('variantDesc')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl>    
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Papildoma kaina, EUR:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="Option"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productOptionsMemo[itemIndex].priceAdd}
                                        placeholder='Papildoma kaina, EUR...'
                                        onChange={handleVariantChange('priceAdd')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pasirinkimo iškvietimas:</h3>
                                <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                                    <Select
                                        id="summon_select"
                                        onWheel={(e) => e.target.blur()}
                                        disableUnderline
                                        value={productOptionsMemo[itemIndex].summonID}
                                        onChange={handleVariantChange('summonID')}
                                        label="Iškvietimo ID"
                                        defaultValue={productOptionsMemo[itemIndex].summonID}
                                        classes={{root: classes.variantSelectSummon, icon: classes.variantSelectIconExample}}
                                    >
                                        <MenuItem value={0}>
                                            <em>Nėra</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl> 
                                <Button variant="contained" color="primary" component="span" classes={{root: classes.addoptionButton}} onClick={addOption} >
                                    {productOptionsMemo[itemIndex].optionIndex !== null ? 'Išsaugoti' : 'Pridėti' }
                                </Button>     
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Box classes={{root: classes.optionsDisplayBoxParent}}>
                                <h3 className={classes.header}>Variantai:</h3>
                                <Box classes={{root: classes.optionsDisplayBox}}>
                                    { productInfo.options[itemIndex].menuOptions.length > 0 && productInfo.options[itemIndex].menuOptions.map((item, index) => 
                                        <Box classes={{root: classes.optionDisplayItem}} onClick={() => editOption(index)}>
                                            { item.fileURL && item.variantName && item.variantDesc ? 
                                                <Box>
                                                    <Grid container>
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box classes={{root: classes.optionDisplayImageBox}}>
                                                                <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                            </Box>
                                                        </Grid>  
                                                        <Grid item xl={7} lg={7} md={5} sm={7} xs={5} style={{padding: '0 .5rem 0 0'}}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>{item.variantName}</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.variantDesc}</p>
                                                            </Box>
                                                        </Grid> 
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>Kaina:</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.priceAdd} &euro;</p>
                                                            </Box>
                                                        </Grid>     
                                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <Box display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                                                <FaTimes size={15} className={classes.closeIcon} onClick={(e) => deleteOption(e, index)} />
                                                            </Box>
                                                        </Grid>  
                                                    </Grid>
                                                </Box>
                                            :
                                            item.fileURL && item.variantName && !item.variantDesc ? 
                                                <Box>
                                                    <Grid container>
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box classes={{root: classes.optionDisplayImageBox}}>
                                                                <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                            </Box>
                                                        </Grid>  
                                                        <Grid item xl={7} lg={7} md={5} sm={7} xs={5} style={{padding: '0 .5rem 0 0'}}>
                                                            <Box classes={{root: classes.variantNameSingleBox}}>
                                                                <Box classes={{root: classes.optionDisplayTextBox}}>
                                                                    <p className={classes.optionNameText}>{item.variantName}</p>
                                                                </Box>
                                                            </Box>
                                                        </Grid> 
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>Kaina:</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.priceAdd} &euro;</p>
                                                            </Box>
                                                        </Grid>     
                                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <Box display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                                                <FaTimes size={15} className={classes.closeIcon} onClick={(e) => deleteOption(e, index)}/>
                                                            </Box>
                                                        </Grid>    
                                                    </Grid>
                                                </Box> 
                                            :
                                            !item.fileURL && item.variantName && item.variantDesc ? 
                                                <Box>
                                                    <Grid container>
                                                        <Grid item xl={9} lg={9} md={8} sm={9} xs={8} style={{padding: '0 .5rem 0 0'}}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>{item.variantName}</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.variantDesc}</p>
                                                            </Box>
                                                        </Grid> 
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>Kaina:</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.priceAdd} &euro;</p>
                                                            </Box>
                                                        </Grid>     
                                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <Box display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                                                <FaTimes size={15} className={classes.closeIcon} onClick={(e) => deleteOption(e, index)}/>
                                                            </Box>
                                                        </Grid>  
                                                    </Grid>
                                                </Box>
                                            :
                                            !item.fileURL && item.variantName && !item.variantDesc &&
                                                <Box>
                                                    <Grid container>
                                                        <Grid item xl={9} lg={9} md={8} sm={9} xs={8} style={{padding: '0 .5rem 0 0'}}>
                                                            <Box classes={{root: classes.variantNameSingleBox}}>
                                                                <Box classes={{root: classes.optionDisplayTextBox}}>
                                                                    <p className={classes.optionNameText}>{item.variantName}</p>
                                                                </Box>
                                                            </Box>
                                                        </Grid> 
                                                        <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                                                            <Box>
                                                                <p className={classes.optionNameText}>Kaina:</p>
                                                            </Box>
                                                            <Box>
                                                                <p className={classes.optionDescText}>{item.priceAdd} &euro;</p>
                                                            </Box>
                                                        </Grid>     
                                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <Box display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                                                <FaTimes size={15} className={classes.closeIcon} onClick={(e) => deleteOption(e, index)}/>
                                                            </Box>
                                                        </Grid>  
                                                    </Grid>
                                                </Box>
                                            }
                                        </Box> 
                                    )}
                                </Box>
                            </Box>
                        </Grid> 
                    </Grid>
                </Grid>    
            </Grid>
        </Box>
    )
}

export default SelectOption
