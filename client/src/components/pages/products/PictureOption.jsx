import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Tooltip, Card, CardActionArea, CardContent, CardMedia, Badge } from '@material-ui/core';
import { FaInfo, FaCheck } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.myTheme.sriftoSpalva,
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
    image: {
        maxWidth: '10rem',
        maxheight: '15rem',
        objectFit: 'contain',
        margin: '0 0 1rem 0',
        padding: '1rem',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px'
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
    },
    cardContent: {
        margin: '0',
        padding: '.5rem .5rem 0 .5rem'
    },
    optionDisplayImage: {
        width: '100%',
        objectFit: 'contain',
    },
    previewSelectedBadge: {
        marginRight: '.5rem',
        marginTop: '.5rem',
        height: '1.6rem',
        borderRadius: '50%',
        backgroundColor: theme.myTheme.pirma
    },
    checkMark: {
        color: theme.myTheme.trecia
    },
}));

const PictureOption = ({ optionsValues, setOptionsValues, index, product }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [selected, setSelected] = useState(0);

    const handleSelect = (selected) => {
        setSelected(selected);
        var copy = [...optionsValues];
        copy[index].value = product.options[0].menuOptions[selected].variantName;
        copy[index].price = product.options[0].menuOptions[selected].priceAdd;
        setOptionsValues(copy);
    };

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
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6} style={{margin: '0 0 .5rem 0'}}>
                                <Card className={classes.card} onClick={() => handleSelect(indexinner)} style={indexinner !== selected ? {border: `2px solid ${theme.myTheme.trecia}`} : {border: `2px solid ${theme.myTheme.pirma}`}}>
                                    <CardActionArea style={{height: '100%', display: 'flex', alignItems: 'flex-start'}} >
                                        <Box>
                                            <CardMedia classes={{root: classes.cardContent}}>
                                                <Badge 
                                                    classes={{badge: classes.previewSelectedBadge}}
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
