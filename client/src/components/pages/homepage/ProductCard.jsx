import { Box, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        // margin: '.7rem',
        width: '10rem',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        // transition:'background-color .4s ease', //, box-shadow .2s ease
        flexDirection: 'column',
        justifyContent: 'space-between',
        // boxShadow: '2px 2px 3px #737373',
        border: `1px solid #edf7f8`,
        '&:hover': {
            // backgroundColor: '#edf7f8',
            // boxShadow: '4px 4px 3px #737373',
            // transition:'background-color .4s ease, box-shadow .2s ease',
            cursor: 'pointer'
        },
    },
    cardText: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    cardTextRed: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
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
    },
    cardContent: {
        padding: '.7rem .7rem 0 .7rem',
    },
    cardActions: {
        paddingLeft: '.7rem',
    },
    img: {
        marginBottom: '.5rem',
        height: '100%', 
        width: '100%', 
        objectFit: 'contain'
    },
}));

const ProductCard = ({ image, name, amountDiscount, link}) => {

    const classes = useStyles();
    const history = useHistory();

    const getLowestPrice = (items) => {
        items.sort((a, b) => a.amount - b.amount);
        const price = items[0].price * items[0].amount * (1 - (items[0].discount / 100));
        return price.toFixed(2);
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
        <Card classes={{root: classes.card}} onClick={() => history.push(`/products/${link}`)}>
            <CardContent classes={{root: classes.cardContent}}>
                <Box>
                    <Box display="flex" justifyContent='center' alignItems='center' style={{height: '100%', width: '100%'}}>
                        <img src={image} alt={name} className={classes.img}/>
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
