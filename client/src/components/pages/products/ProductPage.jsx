import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //Redirect
import { Box, Grid, Breadcrumbs, Stepper, Step, StepLabel, Tooltip, FormControl, Select, MenuItem, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx' //ProjectURL
import { Link } from 'react-router-dom'; // useHistory, useLocation 
import { FaInfo } from 'react-icons/fa';
import NumberDoubleOption from './NumberDoubleOption.jsx';
import NumberOption from './NumberOption.jsx';
import PictureOption from './PictureOption.jsx'

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
    Stepper: {
        backgroundColor: 'transparent',
        padding: '4rem 0 1rem 0',
    },
    OptionTitleBox: {
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
    infoIcon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '0',
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
    primaryListText: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    secondaryListText: {
        color: '#bfbfbf',
        fontFamily: theme.myTheme.sriftas,
    },
    selectRender1: {
        width: '15rem', 
        display: 'inline-block',
        overflow: 'hidden',
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    selectRender2: {
        width: '19rem', 
        display: 'inline-block',
        overflow: 'hidden',
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    gridItem: {
        padding: '0 .5rem 0 .5rem',
    },
}));

const ProductPage = ({ products }) => {

    let { link } = useParams();
    const classes = useStyles();
    // const history = useHistory();
    // const location = useLocation();

    const [product, setProduct] = useState({});
    const [optionsValues, setOptionsValues] = useState([]);
    const [select, setSelect] = useState([]);

    const handleOptionChange = (event, index) => {
        var copy = optionsValues;
        copy[index].value = product.options[index].menuOptions[event.target.value].variantName;
        copy[index].price = product.options[index].menuOptions[event.target.value].priceAdd;
        setOptionsValues(copy);
        var selectArrayCopy = select;
        selectArrayCopy[index] = event.target.value;
        setSelect(selectArrayCopy);
    };

    useEffect(() => {
        if (products.length !== 0) {
            var result = products.find(obj => {
                return obj.link === encodeURIComponent(link)
            });
            setProduct(result);
            var copy18 = optionsValues;
            for (const item of result.options) {
                if (item.type === 0) {
                    copy18.push({
                        name: item.name,
                        value: item.menuOptions[0].variantName,
                        price: item.menuOptions[0].priceAdd,
                    });
                } else if (item.type === 1) {
                    copy18.push({
                        name: item.name,
                        firstName: item.firstItemName,
                        firstValue: item.fistItemMinValue,
                        firstPrice: item.firstItemAdditionalPrice,
                        secondName: item.secondItemName,
                        secondValue: item.secondItemMinValue,
                        secondPrice: item.secondItemAdditionalPrice,
                    });
                } else if (item.type === 2) {
                    copy18.push({
                        name: item.name,
                        value: item.menuOptions[0].variantName,
                        price: item.menuOptions[0].priceAdd,
                    });
                } else if (item.type === 3) {
                    copy18.push({
                        name: item.name,
                        firstName: item.firstItemName,
                        firstValue: item.fistItemMinValue,
                        firstPrice: item.firstItemAdditionalPrice,
                    });
                } 
            }
            setOptionsValues(copy18);
        }
        // eslint-disable-next-line
    }, [products]);

    return (
        <Box maxWidth='xl' classes={{root: classes.root}} >
            <Helmet>
                <title>{product.name} | {ProjectName}</title>  
            </Helmet>
            <Box display='flex' justifyContent='center' style={{paddingBottom: '2rem'}}>
                <Box classes={{root: classes.content}}>
                    <Breadcrumbs aria-label="breadcrumb" style={{margin: '1rem 0 0 .7rem'}}>
                        <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                        <Link to='/products' className={classes.breadcrumbLink}>Produktai</Link>
                        <Link to={`/products/${encodeURIComponent(link)}`} className={classes.breadcrumbLinkDisabled}>{product.name}</Link>
                    </Breadcrumbs>
                    <Grid container style={{margin: '0 0 0 .7rem'}}>
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
                            <StepLabel><p className={classes.stepText}>Pasirinkite produkto parametrus</p></StepLabel>
                        </Step>
                        <Step active={true}>
                            <StepLabel><p className={classes.stepText}>Įkelkite failą</p></StepLabel>
                        </Step>
                        <Step active={true}>
                            <StepLabel><p className={classes.stepText}>Pasirinkite kiekį, gamybos laiką ir užsakykite</p></StepLabel>
                        </Step>
                    </Stepper>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.gridItem}>
                            {Object.keys(product).length > 0 &&
                                <Box>
                                    {product.options.map((item, index) => 
                                        <>
                                        {item.type === 0 ? 
                                            <>
                                                <Box className={classes.OptionTitleBox}>
                                                    <Grid container justifyContent="space-between">
                                                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                                                            <h2 className={classes.OptionTitleHeader}>{item.name}</h2>
                                                        </Grid>    
                                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                                                            {item.info && 
                                                                <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                                                    <Tooltip title={item.info} placement="top" arrow>
                                                                        <div>
                                                                            <FaInfo 
                                                                                size={17} 
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
                                                    <FormControl variant="outlined" classes={{root: classes.formVariantSelect}} focused={false}>
                                                        <Select
                                                            id="simple-select-outlined"
                                                            variant='outlined'
                                                            classes={{outlined: classes.variantSelect, iconOutlined: classes.variantSelectIcon}}
                                                            value={select[index]}
                                                            onChange={(e) => handleOptionChange(e, index)}
                                                            defaultValue={0}
                                                            MenuProps={{ classes: { list: classes.menuPaper } }}
                                                            renderValue={(value) => 
                                                                {return(item.menuOptions[value].fileURL ? 
                                                                    <Box display='flex' justifyContent='flex-start' alignItems='center' style={{paddingLeft: '1rem'}}>
                                                                        <Box display='flex' justifyContent='center' alignItems='center' style={{marginRight: '1rem'}}>
                                                                            <img src={item.menuOptions[value].fileURL} alt={item.menuOptions[value].variantName} className={classes.optionDisplayImage} />
                                                                        </Box>
                                                                        <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                                                            <p className={classes.selectRender1}>{item.menuOptions[value].variantName}</p>
                                                                        </Box>
                                                                    </Box>
                                                                :
                                                                    <Box display='flex' justifyContent='flex-start' alignItems='center' style={{paddingLeft: '1rem'}}>
                                                                        <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                                                            <p className={classes.selectRender2}>{item.menuOptions[value].variantName}</p>
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                            }
                                                        >
                                                            { item.menuOptions.length > 0 && item.menuOptions.map((itemInner, index) => 
                                                                <MenuItem value={index} classes={{root: classes.menuItem}}>
                                                                    { itemInner.fileURL && itemInner.variantName && itemInner.variantDesc ? 
                                                                        <ListItem classes={{root: classes.listItem}}>
                                                                            <ListItemAvatar style={{marginRight: '.5rem'}}>
                                                                                <img src={itemInner.fileURL} alt={itemInner.variantName} className={classes.optionDisplayImage} />
                                                                            </ListItemAvatar>
                                                                            <ListItemText 
                                                                                classes={{
                                                                                    primary: classes.primaryListText,
                                                                                    secondary: classes.secondaryListText,
                                                                                }}
                                                                                style={{maxWidth: '13rem'}}
                                                                                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                secondaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                primary={itemInner.variantName} 
                                                                                secondary={itemInner.variantDesc} 
                                                                            />
                                                                        </ListItem>
                                                                    :
                                                                    itemInner.fileURL && itemInner.variantName && !itemInner.variantDesc ? 
                                                                        <ListItem classes={{root: classes.listItem}}>
                                                                            <ListItemAvatar style={{marginRight: '.5rem'}}>
                                                                                <img src={itemInner.fileURL} alt={itemInner.variantName} className={classes.optionDisplayImage} />
                                                                            </ListItemAvatar>
                                                                            <ListItemText 
                                                                                classes={{
                                                                                    primary: classes.primaryListText,
                                                                                }}
                                                                                style={{maxWidth: '13rem'}}
                                                                                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                primary={itemInner.variantName}
                                                                            />
                                                                        </ListItem>
                                                                    :
                                                                    !itemInner.fileURL && itemInner.variantName && itemInner.variantDesc ? 
                                                                        <ListItem classes={{root: classes.listItem}}>
                                                                            <ListItemText 
                                                                                classes={{
                                                                                    primary: classes.primaryListText,
                                                                                    secondary: classes.secondaryListText,
                                                                                }}
                                                                                style={{maxWidth: '17rem'}}
                                                                                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                secondaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                primary={itemInner.variantName} 
                                                                                secondary={itemInner.variantDesc}
                                                                            />
                                                                        </ListItem>
                                                                    :
                                                                    !itemInner.fileURL && itemInner.variantName && !itemInner.variantDesc &&
                                                                        <ListItem classes={{root: classes.listItem}}>
                                                                            <ListItemText 
                                                                                classes={{
                                                                                    primary: classes.primaryListText,
                                                                                }}
                                                                                style={{maxWidth: '17rem'}}
                                                                                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                                                                primary={itemInner.variantName}
                                                                            />
                                                                        </ListItem>
                                                                    }
                                                                </MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </>
                                        : item.type === 1 ? 
                                            <NumberDoubleOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        : item.type === 2 ? 
                                            <PictureOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        : item.type === 3 &&
                                            <NumberOption 
                                                optionsValues={optionsValues} 
                                                setOptionsValues={setOptionsValues} 
                                                index={index} 
                                                product={product}
                                            />
                                        }
                                        </>
                                    )}
                                </Box>
                            }
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductPage
