import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carouselv2 from './Carouselv2';
import ProductsSectionHome from './ProductsSectionHome';
import SectionOne from './SectionOne'
import TrippleSection from './TrippleSection';
// import SectionTwo from './SectionTwo';
// import FreeShippingSection from './FreeShippingSection';
// import ClubSection from './ClubSection';
import Divider from './Divider';
// import Divider2 from './Divider2';
// import Divider3 from './Divider3';
// import HowItWorksSection from './HowItWorksSection';
// import ApieMusSection from './ApieMusSection';

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

const Homepage = ({ products, carousel, setCarousel, loyaltydiscount }) => {

    const classes = useStyles();

    return (
        <Box maxWidth='xl' classes={{root: classes.root}}>
            <Carouselv2 carousel={carousel} setCarousel={setCarousel}/>
            <Box classes={{root: classes.content}}>
                <ProductsSectionHome products={products} loyaltydiscount={loyaltydiscount}/>
                <Divider />
                <SectionOne />
                <TrippleSection />
                {/* <FreeShippingSection />
                <Divider />
                <ClubSection />
                <Divider2 />
                <HowItWorksSection />
                <Divider3 />
                <ApieMusSection /> */}
            </Box>
        </Box>
    )
}

export default Homepage
