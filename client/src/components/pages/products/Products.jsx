import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './ProductCard';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import Breadcurmbs from '../utils/Breadcurmbs';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        fontSize: theme.myTheme.sizeM,
        fontFamily: theme.myTheme.sriftas,
    },
    productGrid: {
        fontSize: theme.myTheme.sizeM,
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexFlow: 'row wrap',
        gap: '3em 0',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'auto auto auto',
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'auto auto auto auto',
        },
        [theme.breakpoints.up('lg')]: {
            gap: '3em',
            gridTemplateColumns: 'auto auto auto auto auto',
        },
    },
}));

const Products = ({ products, loyaltydiscount }) => {  

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}} >
            <Helmet>
                <title>Produktai | {ProjectName}</title>  
            </Helmet>
            <Breadcurmbs routes={[{path: 'products', name: 'Produktai'}]}/>
            <Box classes={{root: classes.productGrid}}>
                {products.map((item) => <ProductCard produktas={item} loyaltydiscount={loyaltydiscount}/>)}
            </Box>
        </Box>
    )
}

export default Products
