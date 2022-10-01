import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carouselv2 from './Carouselv2';
import ProductsSectionHome from './ProductsSectionHome';
import TrippleSection from './TrippleSection';
import ClubSection from './ClubSection';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
    },
    content: {
        width: '100%',
        margin: '0',
        padding: '0',
    },
}));

const Homepage = ({ products, carousel, setCarousel }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Carouselv2 carousel={carousel} setCarousel={setCarousel}/>
            <Box classes={{root: classes.content}}>
                <ProductsSectionHome products={products} />
                <ClubSection />
                <TrippleSection />
            </Box>
        </Box>
    )
}

export default Homepage
