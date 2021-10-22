import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carouselv2 from './Carouselv2';
import ProductsSectionHome from './ProductsSectionHome';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
    },
    content: {
        width: '100%',
        margin: '0',
        padding: '0',
        backgroundColor: theme.myTheme.pirma,
    },
}));

const Homepage = ({ products, carousel, setCarousel }) => {

    const classes = useStyles();

    return (
        <Container maxWidth='xl' classes={{root: classes.root}}>
            <Carouselv2 carousel={carousel} setCarousel={setCarousel}/>
            <Box classes={{root: classes.content}}>
                <ProductsSectionHome products={products}/>
            </Box>
        </Container>
    )
}

export default Homepage
