import { useState, useEffect } from 'react'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CarouselSkeleton from './CarouselSkeleton';
import CarouselContent from './CarouselContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
        backgroundColor: theme.myTheme.balta,
    },
}));

const Carousel = ({ carousel, setCarousel }) => {

    const classes = useStyles();

    const [carouselItem, setCarouselItem] = useState(1);

    const getCarouselItems = async () => {
        try {
            const res = await fetch("/users/getCarouselItems/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `JWT ${user.token}`,
                },
            });
            const response = await res.json();
            if (response.success) {
                setCarousel(response.data);   
                
            } 
        } catch (error) {
            // console.log('Klaida gaunant karuselės elementus!');
        }
    };

    useEffect(() => {
        if (carousel.length <= 0) {
            getCarouselItems();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (carouselItem >= 3 ) {
                setCarouselItem(1);
            } else {
                setCarouselItem(carouselItem + 1);
            }
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [carouselItem])

    return (
        <Box classes={{root: classes.root}} >
            {carousel.length > 0 ?
                <CarouselContent carousel={carousel}/>
            :
                <CarouselSkeleton />
            }
        </Box>
    )
}

export default Carousel
