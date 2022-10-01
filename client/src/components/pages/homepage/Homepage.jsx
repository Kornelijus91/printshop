import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from './Carousel';
import ProductsSectionHome from './ProductsSectionHome';
import TrippleSection from './TrippleSection';
import ClubSection from './ClubSection';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
    },
}));

const Homepage = ({ products, carousel, setCarousel }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Carousel carousel={carousel} setCarousel={setCarousel}/>
            <ProductsSectionHome products={products} />
            <ClubSection />
            <TrippleSection />
        </Box>
    )
}

export default Homepage
