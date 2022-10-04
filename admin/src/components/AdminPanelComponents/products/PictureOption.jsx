import { useState, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Button, Tooltip, FormControl, OutlinedInput, Card, CardActionArea, CardContent, CardMedia, Badge } from '@material-ui/core';
import { FaInfoCircle, FaTrash, FaCheck } from 'react-icons/fa';
import MoveOptions from './MoveOptions';
import SummonSelect from './SummonSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 0 1rem 0',
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer',
        }, 
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    infoIcon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
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
            maxheight: '17.5rem',
            margin: '0 0 1.5rem 0',
            padding: '1.5rem',
            borderRadius: '10px',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '20rem',
            maxheight: '30rem',
            margin: '0 0 2rem 0',
            padding: '2rem',
            borderRadius: '14px',
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
            fontSize: '1.1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            fontSize: '1.5rem',
        },
    },
    imageinfoBox: {
        maxWidth: '21rem',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '32rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '42rem',
        },
    },
    LeftItem: {
        margin: '0 0 0 1rem',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 0 1.8rem',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 0 1.8rem',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 0 0 1.8rem',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 0 2rem',
        },
    },
    button: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.tZalia.main,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            padding: '.5rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            padding: '1rem',
            borderRadius: '9px',
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
    formVariant: {
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
        [theme.breakpoints.up('xxl')]: {
            width: '32rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
        },
    },
    addButton: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.tZalia.main,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
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
        [theme.breakpoints.up('xxl')]: {
            width: '32rem',
            fontSize: '1.4rem',
            padding: '.5rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '42rem',
            fontSize: '1.8rem',
            padding: '1rem',
            borderRadius: '9px',
        },
    },
    saveEditButton: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.tZalia.main,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        width: '7.5rem',
        [theme.breakpoints.up('sm')]: {
            width: '7.5rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '7.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '10rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '15rem',
            fontSize: '1.4rem',
            padding: '.5rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '20rem',
            fontSize: '1.8rem',
            padding: '1rem',
            borderRadius: '9px',
        },
    },
    card: {
        margin: '0 .5rem 0 0',
        height: '100%',
        '&:hover': {
            cursor: 'pointer',
            // outline: `2px solid ${theme.myTheme.ketvirta}`
        }, 
        [theme.breakpoints.up('xxl')]: {
            margin: '0 .75rem 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1rem 0 0',
        },
    },
    cardText: {
        margin: '0 0 .5rem 0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        // maxWidth: '4.2rem',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 .75rem 0',
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 1rem 0',
            fontSize: '1.8rem'
        },
    },
    cardContent: {
        margin: '0',
        padding: '.5rem .5rem 0 .5rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem .75rem 0 .75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem 1rem 0 1rem',
        },
    },
    optionDisplayImage: {
        width: '100%',
        objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            objectFit: 'contain',
        },
        [theme.breakpoints.up('xxxl')]: {
            objectFit: 'fill',
        },
    },
    previewSelectedBadge: {
        marginRight: '.5rem',
        marginTop: '.5rem',
        height: '1.6rem',
        borderRadius: '50%',
        backgroundColor: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            marginRight: '.75rem',
            marginTop: '.75rem',
            height: '2.4rem',
            width: '2.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '1rem',
            marginTop: '1rem',
            height: '3.2rem',
            width: '3.2rem',
        },
    },
    badgecontainer: {
        width: '100%',
    },
    checkMark: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    addPictureButton: {
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
        },
    },
    movetrashBox: {
        display:'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end',
        [theme.breakpoints.up('xxl')]: {
            alignItems: 'center',
        },
        [theme.breakpoints.up('xxxl')]: {
            alignItems: 'center',
        },
    },
}));

const PictureOption = ({ productInfo, itemIndex, setProductInfo, setSnackbar, productOptionsMemo, setProductOptionsMemo }) => {

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
    });

    const [selected, setSelected] = useState(0);

    const handleOpdtionDelete = () => {
        setProductOptionsMemo(productOptionsMemo.filter(function(value, index, arr) {
            return index !== itemIndex
        }));
        setProductInfo({ ...productInfo, options: productInfo.options.filter(function(value, index, arr) {
            return index !== itemIndex
        })});
    };

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
            });
            
        } else {
            if (productOptionsMemo[itemIndex].variantName && productOptionsMemo[itemIndex].fileURL) {
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
                });
               
            } else {
                if (!productOptionsMemo[itemIndex].variantName && !productOptionsMemo[itemIndex].fileURL) {
                    setSnackbar({
                        message: 'Įrašykite pasirinkimą ir įkelkite paveikslėlį.',
                        open: true,
                    });
                } else if (!productOptionsMemo[itemIndex].variantName) {
                    setSnackbar({
                        message: 'Įrašykite pasirinkimą.',
                        open: true,
                    });
                } else {
                    setSnackbar({
                        message: 'Įkelkite paveikslėlį.',
                        open: true,
                    }); 
                }
                
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
        });
        setSelected(item_index);
    };

    const deleteOption = (item_index) => {
        const arrayCopy = productInfo.options;
        var innerArrayCopy = productInfo.options[itemIndex].menuOptions;
        innerArrayCopy = productInfo.options[itemIndex].menuOptions.filter(function(item, index) {
            return index !== item_index
        });
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
        });
    };

    return (
        <Box classes={{root: classes.root}}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box classes={{root: classes.movetrashBox}}>
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
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                    <Box classes={{root: classes.LeftItem}}>
                        <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                            <Box style={{marginRight: '1rem'}}>
                                {productInfo.options[itemIndex].name ?
                                    <h3 className={classes.header}>{productInfo.options[itemIndex].name}</h3>
                                :
                                    <h3 className={classes.header}>Peržiūra</h3>
                                }
                            </Box>
                            <Box>
                                {productInfo.options[itemIndex].info && 
                                    <Tooltip title={productInfo.options[itemIndex].info} placement="top">
                                        <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                            <FaInfoCircle 
                                                size={20} 
                                                className={classes.infoIcon} 
                                            />
                                        </Box>
                                    </Tooltip>
                                }
                            </Box>
                        </Box>
                        <Box>
                            { productInfo.options[itemIndex].menuOptions.length > 0  &&
                                <Grid container>
                                    { productInfo.options[itemIndex].menuOptions.map((item, index) => 
                                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6} style={{margin: '0 0 .5rem 0'}}>
                                           
                                                <Card className={classes.card} onClick={() => editOption(index)}>
                                                    <CardActionArea>
                                                        <CardMedia classes={{root: classes.cardContent}}>
                                                            <Badge 
                                                                classes={{badge: classes.previewSelectedBadge, root: classes.badgecontainer}}
                                                                anchorOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                }} 
                                                                invisible={index !== selected}
                                                                badgeContent={
                                                                    <FaCheck size={15} className={classes.checkMark}/>
                                                                }
                                                            >
                                                                <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                            </Badge>
                                                        </CardMedia>
                                                        <CardContent classes={{root: classes.cardContent}}>
                                                            <p className={classes.cardText}>{item.variantName}</p>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                           
                                        </Grid>
                                    )} 
                                </Grid>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={8} xs={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box className={classes.LeftItem}>
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
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box className={classes.LeftItem}>
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
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box classes={{root: classes.LeftItem}}>
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
                                            </Box>
                                        }
                                    </Box>
                                    <Box classes={{root: classes.addPictureButton}}>
                                        <label htmlFor={`upload_option_id${itemIndex}`}>
                                            <Button variant="contained" color="primary" component="span" classes={{root: classes.button}}>
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
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>    
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box className={classes.LeftItem}>
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
                                {productOptionsMemo[itemIndex].optionIndex === null ?
                                    <Button variant="contained" color="primary" component="span" classes={{root: classes.addButton}} onClick={addOption}> 
                                        Pridėti
                                    </Button> 
                                :    
                                    <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                        <Button variant="contained" color="primary" component="span" classes={{root: classes.saveEditButton}} style={{marginRight: '1rem'}} onClick={addOption}> 
                                            Išsaugoti
                                        </Button> 
                                        <Button variant="contained" color="primary" component="span" classes={{root: classes.saveEditButton}} onClick={() => deleteOption(productOptionsMemo[itemIndex].optionIndex)}> 
                                            Trinti
                                        </Button> 
                                    </Box>
                                }
                            </Box>
                        </Grid>         
                    </Grid>
                </Grid>             
            </Grid>
        </Box>
    )
}

export default PictureOption
