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
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        [theme.breakpoints.up('xxl')]: {
            height: '55rem', 
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '65rem', 
        },
    },
    carousel: {
        width: '100%',
        margin: '0',
        padding: '0',
        height: '20rem',
        [theme.breakpoints.up('md')]: {
            height: '30rem',
            width: '80%',
        },
        [theme.breakpoints.up('lg')]: {
            height: '40rem',
            width: '80%',
        },
    },
}));

const Carouselv2 = ({ carousel, setCarousel }) => {

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
        <Box classes={{root: classes.root}} display="flex" justifyContent="center" alignItems="center">
            <Box classes={{root: classes.carousel}}>
                {carousel.length > 0 ?
                    <CarouselContent carousel={carousel}/>
                :
                    <CarouselSkeleton />
                }
            </Box>
            
        </Box>
    )
}

export default Carouselv2
