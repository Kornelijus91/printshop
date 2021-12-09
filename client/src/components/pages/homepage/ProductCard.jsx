import { useState } from 'react'
import { Box, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `1px solid #edf7f8`,
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.up('xxl')]: {
            border: `2px solid #edf7f8`,
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `3px solid #edf7f8`,
            borderRadius: '9px',
        },
        // [theme.breakpoints.up('sm')]: {
        //     width: '10rem',
        // },
    },
    cardText: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
            margin: '.2rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            margin: '.4rem 0',
        },
    },
    cardTextRed: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
            margin: '.2rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            margin: '.4rem 0',
        },
    },
    cardButton: {
        margin: '0 0 .2rem 0',
        padding: '.4rem .7rem .4rem .7rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        borderRadius: '5px',
        textDecoration: 'none',
        transition:'background-color .4s ease',
        '&:hover': {
            backgroundColor: theme.myTheme.sriftoSpalva,
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: '0 0 .3rem 0',
            padding: '.6rem 1.05rem .6rem 1.05rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            margin: '0 0 .4rem 0',
            padding: '.8rem 1.4rem .8rem 1.4rem',
            borderRadius: '9px',
        },
    },
    cardContent: {
        padding: '.7rem .7rem 0 .7rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '1rem 1rem 0 1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1.3rem 1.3rem 0 1.3rem',
        },
    },
    cardActions: {
        paddingLeft: '.7rem',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '1.3rem',
        },
    },
    img: {
        marginBottom: '.5rem',
        height: '100%', 
        width: '100%', 
        objectFit: 'contain'
    },
    skeletonPicture: {
        borderRadius: '4px',
        marginBottom: '.4rem',
        height: 140,
        [theme.breakpoints.up('xxl')]: {
            height: 200,
            borderRadius: '8px',
            marginBottom: '.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 340,
            borderRadius: '8px',
            marginBottom: '.8rem',
        },
    },
}));

const ProductCard = ({ image, name, amountDiscount, link, loyaltydiscount}) => {

    const classes = useStyles();
    const history = useHistory();

    const [imgLoaded, setImgLoaded] = useState(false);

    const getLowestPrice = (items) => {
        items.sort((a, b) => a.amount - b.amount);
        const price = Number((Math.abs(items[0].price * items[0].amount * (1 - (items[0].discount / 100) - (loyaltydiscount / 100))) * 100).toPrecision(15));
        const roundedPrice = Math.round(price) / 100 * Math.sign(items[0].price * items[0].amount * (1 - (items[0].discount / 100) - (loyaltydiscount / 100)));
        return roundedPrice.toFixed(2);
    };

    const getHighestDiscount = (items) => {
        var discount = items[0].discount;
        for (const x of items) {
            if (discount < x.discount) {
                discount = x.discount
            }
        }
        return discount;
    };

    return (
        <Card 
            classes={{root: classes.card}} 
            onClick={() => {
                    history.push(`/products/${link}`);
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}
            > 
            <CardContent classes={{root: classes.cardContent}}>
                <Box>
                    <Box display="flex" justifyContent='center' alignItems='center' style={{height: '100%', width: '100%'}}>
                        {!imgLoaded && <Skeleton variant="rect" animation='wave' classes={{root: classes.skeletonPicture}}/>}
                        <img src={image} alt={name} className={classes.img} onLoad={() => setImgLoaded(true)} />
                    </Box>
                    <h3 className={classes.cardText}>{name}</h3>
                    <h3 className={classes.cardText}>Nuo {getLowestPrice(amountDiscount)} &euro;</h3>
                    {getHighestDiscount(amountDiscount) > 0 &&
                        <h3 className={classes.cardTextRed}>Nuolaidos iki {getHighestDiscount(amountDiscount)}%</h3>
                    }
                </Box>
            </CardContent>
            
            <CardActions classes={{root: classes.cardActions}}>
                <Link to={`/products/${link}`} className={classes.cardButton}>Užsakyti</Link>
            </CardActions>
            
        </Card> 
    )
}

export default ProductCard
