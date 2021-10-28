import { Box, Grid, Tooltip, FormControl, Select, MenuItem, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';

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
    optionDisplayImage: {
        width: '2.5rem',
        objectFit: 'contain',
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
    secondaryListText: {
        color: '#bfbfbf',
        fontFamily: theme.myTheme.sriftas,
    },
}));

const SelectOption = ({ index, product, handleOptionChange, select }) => {

    const classes = useStyles();

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
                        value={select[index]}
                        onChange={(e) => handleOptionChange(e, index)}
                        defaultValue={0}
                        MenuProps={{ classes: { list: classes.menuPaper } }}
                        renderValue={(value) => 
                            {return(product.options[index].menuOptions[value].fileURL ? 
                                <Box display='flex' justifyContent='flex-start' alignItems='center' style={{paddingLeft: '1rem'}}>
                                    <Box display='flex' justifyContent='center' alignItems='center' style={{marginRight: '1rem'}}>
                                        <img src={product.options[index].menuOptions[value].fileURL} alt={product.options[index].menuOptions[value].variantName} className={classes.optionDisplayImage} />
                                    </Box>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                        <p className={classes.selectRender1}>{product.options[index].menuOptions[value].variantName}</p>
                                    </Box>
                                </Box>
                            :
                                <Box display='flex' justifyContent='flex-start' alignItems='center' style={{paddingLeft: '1rem'}}>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
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
        </>
    )
}

export default SelectOption
