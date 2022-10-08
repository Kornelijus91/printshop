import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Tooltip, Card, CardActionArea, CardContent, CardMedia, Badge, useMediaQuery } from '@material-ui/core';
import { FaInfo, FaCheck } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    infoIcon: {
        color: theme.myTheme.juoda,
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
        fontSize: theme.myTheme.sizeM,
        objectFit: 'contain',
        margin: '0 0 1em 0',
        padding: '1em',
        backgroundColor: theme.myTheme.balta,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall
    },
    LeftItem: {
        margin: '0',
    },
    card: {
        fontSize: theme.myTheme.sizeM,
        margin: '0 .5em 0 0',
        height: '100%',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        '&:hover': {
            cursor: 'pointer',
        }, 
    },
    cardText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        color: theme.myTheme.juodas,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
    },
    cardContent: {
        fontSize: theme.myTheme.sizeM,
        margin: '1em',
        width: '5em',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '8em',
        },
        [theme.breakpoints.up('md')]: {
            width: '5em',
        },
        [theme.breakpoints.up('lg')]: {
            width: '7em',
        },
        [theme.breakpoints.up('xl')]: {
            width: '8em',
        },
    },
    cardContentBottom: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        "&:last-child": {
            paddingBottom: 0
        }
    },
    badgecontainer: {
        width: '100%',
    },
    optionDisplayImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    imageBox: {
        width: '5em',
        height: '100%',
        objectFit: 'contain',
    },
    previewSelectedBadge: {
        fontSize: theme.myTheme.sizeM,
        marginRight: '.5em',
        marginTop: '.5em',
        height: '1.6em',
        width: '1.6em',
        borderRadius: '50%',
        backgroundColor: theme.myTheme.sZalia.main,
    },
    checkMark: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.4)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    gridItem: {
        fontSize: theme.myTheme.sizeM,
        margin: '0 0 .5em 0',
    },
}));

const PictureOption = ({ optionsValues, setOptionsValues, index, product }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [selected, setSelected] = useState(0);

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    const handleSelect = (selected) => {
        setSelected(selected);
        var copy = [...optionsValues];
        copy[index].value = product.options[index].menuOptions[selected].variantName;
        copy[index].price = product.options[index].menuOptions[selected].priceAdd;
        setOptionsValues(copy);
    };

    useEffect(() => {
        if (optionsValues[index]) {
            for (var i = 0; i <= product.options[index].menuOptions.length - 1; i++) {
                if (product.options[index].menuOptions[i].variantName ===  optionsValues[index].value) {
                    setSelected(i);
                    break;
                }
            }
        } else {
            setSelected(0);
        }

        // eslint-disable-next-line
    }, [optionsValues]);

    return (
        <Box classes={{root: classes.LeftItem}}>
            <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                <Box style={{marginRight: '1rem'}}>
                    <h3 className={classes.header}>{product.options[index].name}</h3>
                </Box>
                <Box>
                    {product.options[index].info && 
                        <Tooltip title={product.options[index].info} placement="top" arrow>
                            <div>
                                <FaInfo 
                                    size={17} 
                                    className={classes.infoIcon} 
                                />
                            </div>
                        </Tooltip>
                    }
                </Box>
            </Box>
            <Box display='flex' justifyContent='flex-start'>
                { product.options[index].menuOptions.length > 0  &&
                    <Grid container>
                        { product.options[index].menuOptions.map((item, indexinner) => 
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.gridItem}>
                                <Card 
                                    className={classes.card} 
                                    onClick={() => handleSelect(indexinner)} 
                                    style={
                                        indexinner !== selected ? 
                                            screenSizexxxl ? {border: `4px solid transparent`} 
                                            :
                                            screenSizexxl ? {border: `3px solid transparent`} 
                                            : 
                                            {border: `2px solid transparent`} 
                                        :
                                            screenSizexxxl ? {border: `4px solid ${theme.myTheme.tZalia.main}`} 
                                            :
                                            screenSizexxl ? {border: `3px solid ${theme.myTheme.tZalia.main}`} 
                                            : 
                                            {border: `2px solid ${theme.myTheme.tZalia.main}`}
                                    }
                                >
                                    <CardActionArea style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}} >
                                        <Box>
                                            <CardMedia classes={{root: classes.cardContent}}>
                                                <Badge 
                                                    classes={{badge: classes.previewSelectedBadge, root: classes.badgecontainer}}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }} 
                                                    invisible={indexinner !== selected}
                                                    badgeContent={
                                                        <FaCheck size={15} className={classes.checkMark}/>
                                                    }
                                                >
                                                    <img src={item.fileURL} alt={item.variantName} className={classes.optionDisplayImage} />
                                                </Badge>
                                            </CardMedia>
                                            <CardContent classes={{root: classes.cardContentBottom}}>
                                                <p className={classes.cardText}>{item.variantName}</p>
                                            </CardContent>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )} 
                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default PictureOption
