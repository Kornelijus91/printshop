import { Box, Grid, Tooltip, FormControl, Select, MenuItem, ListItem, ListItemAvatar, ListItemText, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    optionDisplayImage: {
        fontSize: theme.myTheme.sizeM,
        width: '2.5em',
        objectFit: 'contain',
    },
    selectRender1: {
        width: '100%', 
        lineHeight: 'normal',
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        verticalAlign: 'middle',
        fontSize: theme.myTheme.sizeM,
        margin: 0,
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
        width: '100%',
        margin: '.75em 0'
    },
    secondaryListText: {
        fontSize: theme.myTheme.sizeM,
        color: '#bfbfbf',
        fontFamily: theme.myTheme.sriftas,
        width: '100%',
        margin: '0 0 .75em 0'
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
        fontSize: theme.myTheme.sizeM,
        marginRight: '1em',
    },
    OptionTitleBox: theme.myTheme.OptionTitleBox,
    OptionTitleHeader: theme.myTheme.OptionTitleHeader,
    infoIcon: theme.myTheme.infoIcon,
    formVariantSelect: theme.myTheme.formVariantSelect,
    variantSelect: theme.myTheme.variantSelect,
    variantSelectIcon: theme.myTheme.variantSelectIcon,
    menuPaper: theme.myTheme.menuPaper,
    menuitself: theme.myTheme.menuitself,
    menuItem: theme.myTheme.menuItem,
    selectRenderOuterBox:  theme.myTheme.selectRenderOuterBox,
    selectRender2:  theme.myTheme.selectRender2,
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
                                    {/* <Box classes={{root: classes.truncateBox}}>  */}
                                        <p className={classes.selectRender2}>{product.options[index].menuOptions[value].variantName}</p>
                                    {/* </Box> */}
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
