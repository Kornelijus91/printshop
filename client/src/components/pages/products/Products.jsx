import { Box, Grid, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductSkeleton from '../homepage/ProductSkeleton';
import ProductCard from '../homepage/ProductCard';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        minHeight: '50rem',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000'
    },
    header: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '0 0 1rem 0'
    },
    content: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '94%',
        },
        // [theme.breakpoints.up('lg')]: {
        //     width: '94%',
        // },
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    cardShadow: {
        boxShadow: '2px 2px 3px #737373',
        transition:'box-shadow .2s ease', 
        borderRadius: '5px',
        margin: '.7rem',
        '&:hover': {
            boxShadow: '3px 3px 3px #737373',
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none'
    },
}));

const Products = ({ products }) => {

    const classes = useStyles();

    const fillWithSkeletons = () => {
        var skeletons = [];
        for (var i = 0; i < 18; i++) {
            skeletons.push(<ProductSkeleton/>);
        }
        return skeletons;
    };

    return (
        <Box maxWidth='xl' classes={{root: classes.root}} >
            <Helmet>
                <title>Produktai | {ProjectName}</title>  
            </Helmet>
            <Box display='flex' justifyContent='center'>
                <Box classes={{root: classes.content}}>
                    <Breadcrumbs aria-label="breadcrumb" style={{margin: '1rem 0 0 .7rem'}}>
                        <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                        <Link to='/products' className={classes.breadcrumbLinkDisabled}>Produktai</Link>
                    </Breadcrumbs>
                </Box>
            </Box>
            <h1 className={classes.header}>Produktai</h1>
            <Box display='flex' justifyContent='center'>
                <Box classes={{root: classes.content}} style={{marginBottom: '2rem'}}>
                    {products.length > 0 ?
                        <Grid container display="flex" justifyContent='flex-start' >
                            {products.map((item) => 
                                <Grid item xl={2} lg={2} md={3} sm={3} xs={6} key={item._id} style={{display: 'flex', justifyContent: 'center'}}>
                                    <Box classes={{root: classes.cardShadow}} style={{display: 'flex', justifyContent: 'center'}}>
                                        <ProductCard 
                                            image={item.image}
                                            name={item.name}
                                            amountDiscount={item.amountDiscount}
                                            link={item.link}
                                        />
                                    </Box>
                                </Grid>
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
                </Box>
            </Box>
        </Box>
    )
}

export default Products
