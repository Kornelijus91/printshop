import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Tooltip, Card, CardActionArea, CardContent, CardMedia, Badge, useMediaQuery } from '@material-ui/core';
import { FaInfo, FaCheck } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.myTheme.sriftoSpalva,
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
    LeftItem: {
        margin: '0',
        // [theme.breakpoints.up('sm')]: {
        //     margin: '0 0 0 1.8rem',
        // },
        // [theme.breakpoints.up('md')]: {
        //     margin: '0 0 0 1.8rem',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     margin: '0 0 0 1.8rem',
        // },
    },
    card: {
        margin: '0 .5rem 0 0',
        height: '100%',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 .75rem 0 0',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1rem 0 0',
            borderRadius: '7px'
        },
        '&:hover': {
            cursor: 'pointer',
            // outline: `2px solid ${theme.myTheme.ketvirta}`
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
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 1rem 0',
            fontSize: '1.9rem',
        },
    },
    cardContent: {
        margin: '0',
        padding: '.5rem .5rem 0 .5rem',
        // objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem .75rem 0 .75rem',
            width: '100%',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem 1rem 0 1rem',
            width: '100%',
        },
    },
    badgecontainer: {
        width: '100%',
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
    checkMark: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    gridItem: {
        margin: '0 0 .5rem 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 .75rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 1rem 0',
        },
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
        copy[index].value = product.options[0].menuOptions[selected].variantName;
        copy[index].price = product.options[0].menuOptions[selected].priceAdd;
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
                                            screenSizexxxl ? {border: `4px solid ${theme.myTheme.trecia}`} 
                                            :
                                            screenSizexxl ? {border: `3px solid ${theme.myTheme.trecia}`} 
                                            : 
                                            {border: `2px solid ${theme.myTheme.trecia}`} 
                                        :
                                            screenSizexxxl ? {border: `4px solid ${theme.myTheme.pirma}`} 
                                            :
                                            screenSizexxl ? {border: `3px solid ${theme.myTheme.pirma}`} 
                                            : 
                                            {border: `2px solid ${theme.myTheme.pirma}`}
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
                                            <CardContent classes={{root: classes.cardContent}} style={{paddingBottom: '0'}}>
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
