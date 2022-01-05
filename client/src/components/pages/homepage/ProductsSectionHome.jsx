import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        [theme.breakpoints.up('lg')]: {
            width: "90%",
        },
        [theme.breakpoints.up('xl')]: {
            width: "60%",
        },
        
    },
    header: {
        margin: '1rem 0 .5rem 0',
        padding: '0',
        fontSize: '2rem',
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '4rem',
        },
    },
    link: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        margin: '.5rem 0 1rem 0',
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        transition:'color .4s ease', 
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
            padding: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
            padding: '1.4rem'
        },
    },
    cardMargin: {
        margin: '.7rem',
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.05rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '1.4rem',
        },
    },
}));

const ProductsSectionHome = ({ products, loyaltydiscount }) => {     

    const classes = useStyles();

    const fillWithSkeletons = () => {
        const skeletons = [
            <ProductSkeleton/>,
            <ProductSkeleton/>,
            <ProductSkeleton/>,
            <ProductSkeleton/>,
            <ProductSkeleton/>,
            <ProductSkeleton/>
        ];
        return skeletons;
    };

    return (
        <Box display="flex" justifyContent='center' alignItems='center'> 
            <Box classes={{root: classes.root}}>
                <h2 className={classes.header}>Produktai</h2>
                {products.length > 0 ?
                    <Grid container display="flex" justifyContent='center' >
                        {products.map((item) => 
                            {return item.homepage &&
                                <Grid item xl={2} lg={2} md={2} sm={4} xs={6} key={item._id} style={{display: 'flex', justifyContent: 'center'}}>
                                    <Box classes={{root: classes.cardMargin}} style={{display: 'flex', justifyContent: 'center'}}>
                                        <ProductCard 
                                            image={item.image}
                                            name={item.name}
                                            amountDiscount={item.amountDiscount}
                                            link={item.link}
                                            loyaltydiscount={loyaltydiscount}
                                        />
                                    </Box>
                                </Grid>
                            }
                        )}
                    </Grid>
                :
                    <Grid container display="flex" justifyContent='center' >
                        {fillWithSkeletons().map((item, index) => 
                            <Grid item xl={2} lg={2} md={2} sm={4} xs={6} key={index} style={{display: 'flex', justifyContent: 'center'}}>
                                {item}
                            </Grid>
                        )}
                    </Grid>    
                }
                <Box display="flex" justifyContent='center' alignItems='center'>
                    <Link to="/products" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Žiūrėti visus produktus</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductsSectionHome
