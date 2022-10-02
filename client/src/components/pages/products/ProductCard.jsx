import { useState, useRef, useEffect } from 'react'
import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        fontSize: theme.myTheme.sizeM,
        width: '10em', 
        height: '10em', 
        marginBottom: '1em',
        backgroundColor: theme.myTheme.ruda.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: theme.myTheme.sizeBorderRadiusMedium,
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.up('sm')]: {
            width: '12em',
            height: '12em'
        },
        [theme.breakpoints.up('md')]: {
            width: '10em',
            height: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(14rem, 11.31vw, 28rem)',
            height: 'clamp(14rem, 11.31vw, 28rem)',
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: '0 5.6px 11.2px 0 rgba(0, 0, 0, 0.2), 0 8.4px 28px 0 rgba(0, 0, 0, 0.19)',
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)',
        },
    },
    cardTextBox: {
        textAlign: 'center',
        marginTop: theme.myTheme.sizeS,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeMM,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeMM,
        backgroundColor: theme.myTheme.juoda,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    productTitle: {
        margin: '0',
        padding: '0',
        fontSize: theme.myTheme.sizeM,
        fontFamily: theme.myTheme.sriftasBold,
        maxWidth: '10em',
        overflow: 'hidden',
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '12em',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '14em',
        },
    },
    kainaTitle: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 .3em 0 0',
        maxWidth: '10em',
        overflow: 'hidden',
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '12em',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '14em',
        },
    },
    kainaTitleNew: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.sZalia.dark,
        padding: '0',
        margin: '0 .3em 0 0',
        maxWidth: '10em',
        overflow: 'hidden',
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '12em',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '14em',
        },
    },
    cardText: {
        margin: '0',
        padding: '0',
        fontSize: theme.myTheme.sizeM,
        maxWidth: '6em',
        overflow: 'hidden',
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '8em',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '6em',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '10em',
        },
    },
    cardContent: {
        paddingTop: theme.myTheme.sizeXXL,
        paddingRight: theme.myTheme.sizeMM,
        paddingLeft: theme.myTheme.sizeMM,
    },
    imageInnerBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(8rem, 6.5vw, 16rem)',
            height: 'clamp(8rem, 6.5vw, 16rem)',
        },
        // marginBottom: theme.myTheme.sizeXS,
    },
    img: {
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        objectFit: 'contain',
        transition:'all .2s ease-in-out', 
        [theme.breakpoints.up('xl')]: {
            height: 'clamp(7rem, 5.6vw, 14rem)',
            width: 'clamp(7rem, 5.6vw, 14rem)',
        },
    },
    imgHover: {
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        objectFit: 'contain',
        transition:'all .2s ease-in-out', 
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(8rem, 6.5vw, 16rem)',
            height: 'clamp(8rem, 6.5vw, 16rem)',
        },
    },
    skeletonPicture: {
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        marginBottom: theme.myTheme.sizeXXS,
        height: 140,
        [theme.breakpoints.up('xxl')]: {
            height: 200,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 340,
        },
    },
    Isbraukta: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 .3em 0 0',
        overflowWrap: 'break-word',
        // fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '.2em',
            borderRadius: '.1em',
            backgroundColor: theme.myTheme.sZalia.dark,
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
    },
}));

const ProductCard = ({ produktas, loyaltydiscount }) => {   

    const classes = useStyles();
    const history = useHistory();
    const picRef = useRef()
    const sortedAmountDiscount = produktas.amountDiscount.sort((a, b) => a.amount - b.amount);

    const [imgLoaded, setImgLoaded] = useState(false);
    const [finalPriceDiscount, setFinalPriceDiscount] = useState([0, 0, 0]);

    const getLowestPrice = () => {
        if (produktas.kainosModelis !== 1){ 
            const discount = Math.max(loyaltydiscount, sortedAmountDiscount[0].discount)
            const price = Number((Math.abs(sortedAmountDiscount[0].price * sortedAmountDiscount[0].amount * (1 - (discount / 100))) * 100).toPrecision(15));
            const roundedPrice = Math.round(price) / 100 * Math.sign(sortedAmountDiscount[0].price * sortedAmountDiscount[0].amount * (1 - (discount / 100)));
            return [roundedPrice.toFixed(2), (sortedAmountDiscount[0].price * sortedAmountDiscount[0].amount).toFixed(2), discount];
        } else {
            const discount2 = Math.max(loyaltydiscount, produktas.baseDiscount)
            const price2 = Number((Math.abs(produktas.basePrice * sortedAmountDiscount[0].amount * (1 - (discount2 / 100))) * 100).toPrecision(15));
            const roundedPrice2 = Math.round(price2) / 100 * Math.sign(produktas.basePrice * sortedAmountDiscount[0].amount * (1 - (discount2 / 100)));
            return [roundedPrice2.toFixed(2), (produktas.basePrice * sortedAmountDiscount[0].amount).toFixed(2), discount2];
        }
    };

    useEffect(() => {
        setFinalPriceDiscount(getLowestPrice(produktas.amountDiscount));
        // eslint-disable-next-line
    },[produktas, loyaltydiscount])

    return (
        <Box>
            <Card 
                classes={{root: classes.card}} 
                onClick={
                    () => {
                        history.push(`/products/${produktas.link}`);
                        window.scrollTo({top: 0, left: 0});
                    }
                }
            > 
                <CardContent 
                    classes={{root: classes.cardContent}} 
                    onMouseEnter={() => picRef.current.className = classes.imgHover} 
                    onMouseLeave={() => picRef.current.className = classes.img}
                    >
                        <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center' style={{height: '100%', width: '100%'}}>
                            <Box classes={{root: classes.imageInnerBox}}>
                                {!imgLoaded && <Skeleton variant="rect" animation='wave' classes={{root: classes.skeletonPicture}}/>}
                                <img ref={picRef} src={produktas.image} alt={produktas.name} className={classes.img} onLoad={() => setImgLoaded(true)} />
                            </Box>
                            <Box classes={{root: classes.cardTextBox}}>
                                <p className={classes.cardText}>Užsakyti</p>
                            </Box>
                        </Box>
                </CardContent>           
            </Card> 
            <p className={classes.productTitle}>{produktas.name}</p>
            {/* <p className={classes.kainaTitle}>Nuo {getLowestPrice(produktas.amountDiscount)} &euro;</p> */}

            {finalPriceDiscount[2] > 0 ? 
                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                    <p className={classes.kainaTitle}>Nuo</p>
                    <span className={classes.Isbraukta}>{`${finalPriceDiscount[1]} €`}</span>
                    <p className={classes.kainaTitleNew}>{`${finalPriceDiscount[0]} €`}</p>
                </Box>
            :
                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                    <p className={classes.kainaTitle}>Nuo</p>
                    <p className={classes.kainaTitle}>{` ${finalPriceDiscount[0]} €`}</p>
                </Box>
            }
        </Box>
    )
}

export default ProductCard
