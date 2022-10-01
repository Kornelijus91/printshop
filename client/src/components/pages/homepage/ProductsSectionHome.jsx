import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeproductCard from './HomeproductCard';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.myTheme.sZalia.main,
        fontSize: theme.myTheme.sizeM,
        padding: '9em 1em 7em 1em',
    },
    innerBox: {
        width: "100%",
        backgroundColor: theme.myTheme.sZalia.main,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexFlow: 'row wrap',
        [theme.breakpoints.up('lg')]: {
            width: "90%",
        },
        [theme.breakpoints.up('xl')]: {
            width: "80%",
        },
    },
    header: {
        marginTop: theme.myTheme.sizeM,
        marginBottom: theme.myTheme.sizeXXS,
        marginRight: 0,
        marginLeft: 0,
        padding: '0',
        fontSize: theme.myTheme.sizeXXL,
        textAlign: 'center',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    cardMargin: {
        margin: theme.myTheme.sizeM,
        width: '100%',
    },
}));

const ProductsSectionHome = ({ products }) => {     

    const classes = useStyles();

    return (
        <Box display="flex" justifyContent='center' alignItems='center' classes={{root: classes.root}}> 
            <Box classes={{root: classes.innerBox}}>
                {products.map((item) => {return item.homepage && <HomeproductCard produktas={item} />})}
            </Box>
        </Box>
    )
}

export default ProductsSectionHome
