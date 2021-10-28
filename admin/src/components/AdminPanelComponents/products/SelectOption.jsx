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
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
    },
    variantSelectIcon: {
        color: theme.myTheme.trecia,
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
        marginTop: '-.5rem',
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
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    image: {
        maxWidth: '10rem',
        maxheight: '15rem',
        objectFit: 'contain',
        margin: '0 0 1rem 0',
        padding: '1rem',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px'
    },
    infotext: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem'
    },
    infoTextRed: {
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem'
    },
    input: {
        display: 'none',
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
    infoIcon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
    },
    innerGridItem: {
        margin: '0',
        [theme.breakpoints.up('md')]: {
            margin: '0 0 0 1rem',
        },
    },
    innerGridItemRight: {
        margin: '0',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 0 1rem',
        },
    },
    imageinfoBox: {
        maxWidth: '21rem'
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
        overflowY: 'auto'
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
    },
    optionNameText: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.95rem',
        overflowWrap: 'break-word',
    },
    optionDescText: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.75rem',
        overflowWrap: 'break-word',
    },
    closeIcon: {
        color: theme.myTheme.sriftoSpalva,
        '&:hover': {
           cursor: 'pointer',
           color: '#0d1726',
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
        width: '2.5rem',
        objectFit: 'contain',
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
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
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
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
    },
    listItem: {
        margin: '0 1rem 0 1rem',
        padding: '0',
        overflowWrap: 'break-word',
    },
    menuItem: {
        width: '16rem',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
    },
    primaryListText: {
        // maxWidth: '15rem'
    },
    secondaryListText: {
        color: '#bfbfbf',
        // maxWidth: '15rem'
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
    },
    cancelButton: {
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '0',
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
    },
    optionsBox: {
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            padding: '0 1rem 0 1rem',
        },
    },
    optionsDisplayBoxParent: {
        marginLeft: '0',
        [theme.breakpoints.up('md')]: {
            marginLeft: '1rem',
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
                    <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
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
                                <FormControl variant="outlined" className={classes.formVariantSelect}>
                                    <Select
                                        id="simple-select-outlined"
                                        classes={{outlined: classes.variantSelectExample, iconOutlined: classes.variantSelectIconExample}}
                                        value={dummyValue}
                                        onChange={(e) => handleDummyValueChange(e)}
                                        defaultValue={0}
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
                                                            style={{maxWidth: '13rem'}}
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
                                                            style={{maxWidth: '13rem'}}
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
                                                            style={{maxWidth: '17rem'}}
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
                                                            style={{maxWidth: '17rem'}}
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
                                <Box classes={{root: classes.cancelButton}}>
                                    <label htmlFor={`upload_option_id${itemIndex}`}>
                                        <Button variant="contained" color="primary" component="span">
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
                                <FormControl variant="outlined" className={classes.formVariantSelect}>
                                    <Select
                                        id="summon_select"
                                        onWheel={(e) => e.target.blur()}
                                        value={productOptionsMemo[itemIndex].summonID}
                                        onChange={handleVariantChange('summonID')}
                                        label="Iškvietimo ID"
                                        defaultValue={productOptionsMemo[itemIndex].summonID}
                                        classes={{outlined: classes.variantSelectSummon, iconOutlined: classes.variantSelectIconExample}}
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
