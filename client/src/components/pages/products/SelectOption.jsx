import { Box, Grid, Tooltip, FormControl, Select, MenuItem, ListItem, ListItemAvatar, ListItemText, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
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
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    infoIcon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
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
            borderRadius: '7px',
            minHeight: '5.25rem',
            '&:focus': {
                borderRadius: '7px',
           }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            borderRadius: '9px',
            minHeight: '7rem',
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
    menuitself: {
        [theme.breakpoints.up('lg')]: {
            width: '13rem'
        },
        [theme.breakpoints.up('xxl')]: {
            width: '19.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '26rem'
        },
    },
    optionDisplayImage: {
        width: '2.5rem',
        objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            width: '3.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '5rem',
        },
    },
    selectRender1: {
        width: '100%', 
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        verticalAlign: 'middle',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: 0,
            padding: '1.2rem 0 1rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: 0,
            padding: '2rem 0 1.5rem 0',
        },
    },
    selectRender2: {
        width: '100%', 
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        verticalAlign: 'middle',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: 0,
            padding: '1rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: 0,
            padding: '1.5rem 0',
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
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: '1rem 0'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: '1.5rem 0'
        },
    },
    secondaryListText: {
        color: '#bfbfbf',
        fontFamily: theme.myTheme.sriftas,
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: '0 0 1rem 0'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: '0 0 1.5rem 0'
        },
    },
    selectRenderOuterBox: {
        height: '100%',
        paddingLeft: '1rem',
        width: '90%', 
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '2rem',
        },
    },
    truncateBox: {
        width: '100%', 
        height: '100%', 
        display: 'inline-block',
        overflow: 'hidden',
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
    },
    selectRenderInnerBox: {
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '2rem',
        },
    },
}));

const SelectOption = ({ index, product, handleOptionChange, select, optionsValues }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(0);

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    useEffect(() => {
        if (select[index]) {
            setValue(select[index]);
        } else {
            setValue(0);
        }
        // eslint-disable-next-line
    }, [optionsValues, select]);

    return (
        <>
            <Box className={classes.OptionTitleBox}>
                <Grid container justifyContent="space-between">
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                        <h2 className={classes.OptionTitleHeader}>{product.options[index].name}</h2>
                    </Grid>    
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                        {product.options[index].info && 
                            <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                <Tooltip title={product.options[index].info} placement="top" arrow>
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
                        value={value}
                        onChange={(e) => handleOptionChange(e, index)}
                        defaultValue={0}
                        MenuProps={{ classes: { paper: classes.menuitself, list: classes.menuPaper } }}
                        renderValue={(value) => 
                            {return(product.options[index].menuOptions[value].fileURL ? 
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.selectRenderOuterBox}}>
                                    <Grid container display='flex' justifyContent="flex-start" alignItems='center'>
                                        <Grid item xl={2} lg={2} md={2} sm={1} xs={2} >
                                            <Box display='flex' justifyContent="flex-start" alignItems='center' style={{height: '100%'}}>
                                                <img src={product.options[index].menuOptions[value].fileURL} alt={product.options[index].menuOptions[value].variantName} className={classes.optionDisplayImage} />
                                            </Box>
                                        </Grid>    
                                        <Grid item xl={10} lg={10} md={10} sm={11} xs={10}>
                                            <p className={classes.selectRender1}>{product.options[index].menuOptions[value].variantName}</p>
                                        </Grid> 
                                    </Grid>
                                </Box>
                            :
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.selectRenderOuterBox}}>
                                    <Box classes={{root: classes.truncateBox}}> 
                                        <p className={classes.selectRender2}>{product.options[index].menuOptions[value].variantName}</p>
                                    </Box>
                                </Box>
                            )}
                        }
                    >
                        { product.options[index].menuOptions.length > 0 && product.options[index].menuOptions.map((item, index) => 
                            <MenuItem value={index} classes={{root: classes.menuItem}}>
                                { item.fileURL && item.variantName && item.variantDesc ? 
                                    <ListItem classes={{root: classes.listItem}}>
                                        <ListItemAvatar style={screenSizexxxl ? {marginRight: '1.5rem'} : screenSizexxl ? {marginRight: '1rem'} : {marginRight: '.5rem'}}>
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
                                        <ListItemAvatar style={screenSizexxxl ? {marginRight: '1.5rem'} : screenSizexxl ? {marginRight: '1rem'} : {marginRight: '.5rem'}}>
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
        </>
    )
}

export default SelectOption
