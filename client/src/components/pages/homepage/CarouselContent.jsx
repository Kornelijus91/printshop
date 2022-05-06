import { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Box, Fade, IconButton, useMediaQuery } from '@material-ui/core';
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    carouselContent: {
        width: '100%',
        maxWidth: '3840px',
        position: 'absolute',
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    carouselItem: {
        height: '20rem',
        display: "flex", 
        justifyContent: 'center', 
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            height: '30rem',
        },
        [theme.breakpoints.up('lg')]: {
            height: '40rem',
        },
    },
    contentTextHeader: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '5rem',
        },
    },
    contentTextBlue: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    contentTextRed: {
        margin: '0',
        padding: '0',
        fontSize: '1rem',
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    contentButton: {
        padding: '.4rem .7rem .4rem .7rem',
        backgroundColor: theme.myTheme.antra,
        fontSize: '1rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        transition:'background-color .4s ease',
        borderRadius: '5px',
        height: '2rem',
        '&:hover': {
            backgroundColor: theme.myTheme.sriftoSpalva,
        },
        [theme.breakpoints.up('sm')]: {
            height: '2.2rem'
        },
        [theme.breakpoints.up('md')]: {
            height: '2.35rem'
        },
        [theme.breakpoints.up('lg')]: {
            height: '2.5rem'
        },
        [theme.breakpoints.up('xxl')]: {
            height: '3rem',
            fontSize: '1.6rem',
            borderRadius: '7px',
            padding: '.6rem 1.05rem .6rem 1.05rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '3.5rem',
            fontSize: '2rem',
            borderRadius: '9px',
            padding: '.8rem 1.4rem .8rem 1.05rem',
        },
    },
    animation0: {
        transform: 'perspective(900px) rotateX(20deg) ',
        boxShadow: '0px 20px 100px #555',
        transition: '0.5s ease transform',
        '&:hover': {
            transform: 'rotate(0deg)'
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'perspective(1350px) rotateX(20deg) ',
            boxShadow: '0px 30px 150px #555',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'perspective(1800px) rotateX(20deg) ',
            boxShadow: '0px 40px 200px #555',
        },
    },
    animation1: {
        transform: 'perspective(800px) rotateY(-8deg)',
        boxShadow: '20px 20px 50px #555',
        transition: 'transform 1s ease 0s',
        '&:hover': {
            transform: 'perspective(800px) rotateY(-4deg)'
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'perspective(1200px) rotateY(-8deg)',
            boxShadow: '30px 30px 75px #555',
            '&:hover': {
                transform: 'perspective(1200px) rotateY(-4deg)'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'perspective(1600px) rotateY(-8deg)',
            boxShadow: '40px 40px 100px #555',
            '&:hover': {
                transform: 'perspective(1600px) rotateY(-4deg)'
            },
        },
    },
    animation2: {
        transform: 'rotateX(51deg) rotateZ(43deg)',
        transformStyle: 'preserve-3d',
        boxShadow: '-1px 0 28px 0 rgba(34, 33, 81, 0.01), 28px 28px 28px 0 rgba(34, 33, 81, 0.25)',
        transition: '.4s ease-in-out transform, .4s ease-in-out box-shadow',
        '&:hover': {
            transform: 'translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg)',
            boxShadow: '-1px 0 28px 0 rgba(34, 33, 81, 0.01), 54px 54px 28px -10px rgba(34, 33, 81, 0.15)',
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: '-1px 0 42px 0 rgba(34, 33, 81, 0.01), 42px 42px 42px 0 rgba(34, 33, 81, 0.25)',
            '&:hover': {
                transform: 'translate3d(0px, -24px, 0px) rotateX(51deg) rotateZ(43deg)',
                boxShadow: '-1px 0 42px 0 rgba(34, 33, 81, 0.01), 81px 81px 42px -15px rgba(34, 33, 81, 0.15)',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: '-2px 0 56px 0 rgba(34, 33, 81, 0.01), 56px 56px 56px 0 rgba(34, 33, 81, 0.25)',
            '&:hover': {
                transform: 'translate3d(0px, -32px, 0px) rotateX(51deg) rotateZ(43deg)',
                boxShadow: '-2px 0 56px 0 rgba(34, 33, 81, 0.01), 108px 108px 108px -20px rgba(34, 33, 81, 0.15)',
            },
        },
    },
    animation3: {
        transform: 'rotate3d(.5,-.866,0,15deg) rotate(1deg)',
        boxShadow: '2em 4em 6em -2em rgba(0,0,0,.5), 1em 2em 3.5em -2.5em rgba(0,0,0,.5) ',
        transition:'transform .4s ease, box-shadow .4s ease',
        '&:hover': {
            transform: 'rotate3d(0,0,0,0deg) rotate(0deg)',
            transition:' transform .4s ease',
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: '3em 6em 9em -3em rgba(0,0,0,.5), 1.5em 3em 5.2em -3.75em rgba(0,0,0,.5) ',
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: '4em 8em 12em -4em rgba(0,0,0,.5), 2em 4em 7em -5em rgba(0,0,0,.5) ',
        },
    },
    animation4: {
        transform: 'perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg) scale(0.9, 0.9)',
        boxShadow: '0 70px 40px -20px rgba(0, 0, 0, 0.2)',
        // '-webkit-filter': 'drop-shadow(70px 40px 20px rgba(0, 0, 0, 0.2))',
        // filter: 'drop-shadow(70px 40px 20px rgba(0, 0, 0, 0.2))',
        transition: '0.4s ease-in-out transform',
        '&:hover': {
            transform: 'translate3d(0px, 0px, -250px)'
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'perspective(1125px) translate3d(0px, 0px, -375px) rotateX(27deg) scale(0.9, 0.9)',
            boxShadow: '0 105px 60px -30px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                transform: 'translate3d(0px, 0px, -375px)'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'perspective(1500px) translate3d(0px, 0px, -500px) rotateX(27deg) scale(0.9, 0.9)',
            boxShadow: '0 140px 80px -40px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                transform: 'translate3d(0px, 0px, -500px)'
            },
        },
    },
    animation5: {
        transform: 'perspective(800px) rotateY(25deg) scale(0.9) rotateX(10deg)',
        transition: '0.6s ease transform',
        '&:hover': {
            transform: 'perspective(800px) rotateY(-15deg) translateY(-25px) rotateX(10deg) scale(1)',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'perspective(1200px) rotateY(25deg) scale(0.9) rotateX(10deg)',
            '&:hover': {
                transform: 'perspective(1200px) rotateY(-15deg) translateY(-37px) rotateX(10deg) scale(1)',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'perspective(1600px) rotateY(25deg) scale(0.9) rotateX(10deg)',
            '&:hover': {
                transform: 'perspective(1600px) rotateY(-15deg) translateY(-50px) rotateX(10deg) scale(1)',
            },
        },
    },
    animation6: {
        
    },
    carouselIndicators: {
        marginTop: '17rem',
        [theme.breakpoints.up('md')]: {
            marginTop: '27rem',
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: '37rem',
        },
        [theme.breakpoints.up('xxl')]: {
            marginTop: '44rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '47rem',
        },
    },
    indicator: {
        fontSize: 20,
        [theme.breakpoints.up('xxl')]: {
            fontSize: 30,
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: 40,
        },
    },
    leftCarouselSideContentParent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
        },
        [theme.breakpoints.up('xl')]: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '0',
        },
        
    },
    leftCarouselSideContent: {
        width: '70%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '70%',
        },
    },
    contentButtonBox: {
        marginTop: '.8rem',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '1.6rem',
        },
    },
}));

const CarouselContent = ({carousel}) => {

    const classes = useStyles();
    const theme = useTheme();

    const [carouselItem, setCarouselItem] = useState(0);

    // const screenSizeXs = useMediaQuery(theme.breakpoints.up('xs'));
    const screenSizeSm = useMediaQuery(theme.breakpoints.up('sm'));
    const screenSizeMd = useMediaQuery(theme.breakpoints.up('md'));
    const screenSizelg = useMediaQuery(theme.breakpoints.up('lg'));
    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    useEffect(() => {
        const timer = setTimeout(() => {
            if (carouselItem >= carousel.length - 1 ) {
                setCarouselItem(0);
            } else {
                setCarouselItem(carouselItem + 1);
            }
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [carouselItem])

    return (
        <>
            {carousel.map((item, index) => 
                <Fade in={carouselItem === index} key={index}>
                    <Box classes={{root: classes.carouselContent}}>
                        <Grid container display="flex" justifyContent='center' alignItems='center'>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Box classes={{root: classes.leftCarouselSideContentParent}}>
                                    <Box classes={{root: classes.leftCarouselSideContent}}>
                                        <Box>
                                            <Box > 
                                                <h1 className={classes.contentTextHeader}>{item.title}</h1>
                                            </Box>
                                            <Box >
                                                <h3 className={classes.contentTextBlue}>{item.bluetext}</h3>
                                            </Box>
                                            {item.redtext &&
                                                <Box >
                                                    <h3 className={classes.contentTextRed}>{item.redtext}</h3>
                                                </Box>
                                            }
                                            {item.productLink &&
                                                <Box classes={{root: classes.contentButtonBox}}>
                                                    <Link to={`/products/${item.productLink}`} className={classes.contentButton}>Užsakyti...</Link>
                                                </Box>
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Box classes={{root: classes.carouselItem}}>
                                    <img 
                                        src={item.imageURL} 
                                        alt={item.title}
                                        className={
                                            {
                                                0: classes.animation0,
                                                1: classes.animation1,     
                                                2: classes.animation2,
                                                3: classes.animation3,
                                                4: classes.animation4,
                                                5: classes.animation5,
                                                6: classes.animation6,
                                            }[item.animation]
                                        }
                                        style={{
                                            width: `${
                                                screenSizexxxl ?  item.size * 1.8 : 
                                                screenSizexxl ?  item.size * 1.35 : 
                                                screenSizelg ? item.size : 
                                                screenSizeMd ? item.size / 1.5 : 
                                                screenSizeSm ? item.size / 2 : 
                                                item.size / 3.5
                                                // screenSizeXs && item.size / 3.5
                                            }rem`,
                                            borderRadius: `${
                                                screenSizexxxl ?  item.borderRadius * 1.8 : 
                                                screenSizexxl ?  item.borderRadius * 1.35 : 
                                                screenSizelg ? item.borderRadius : 
                                                screenSizeMd ? item.borderRadius / 1.5 : 
                                                screenSizeSm ? item.borderRadius / 2 : 
                                                item.borderRadius / 3.5
                                            }rem`,
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            )}

            <Box classes={{root: classes.carouselIndicators}} display="flex" justifyContent='center' alignItems='center'>
                {carousel.map((item, index) => 
                    <IconButton  onClick={() => setCarouselItem(index)} variant="contained" key={index}>
                        <GoPrimitiveDot style={{
                            color: carouselItem === index ? `${theme.myTheme.antra}` : `${theme.myTheme.ketvirta}`}} className={classes.indicator}/>
                    </IconButton >
                )}
            </Box> 
        </>
    )
}

export default CarouselContent
