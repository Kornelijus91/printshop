import { useState, useRef } from 'react'
import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        fontSize: theme.myTheme.sizeM,
        width: '10em', 
        height: '10em', 
        marginBottom: '2em',
        backgroundColor: theme.myTheme.ruda.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: theme.myTheme.sizeBorderRadiusMedium,
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.up('sm')]: {
            width: '12em',
            height: '12em'
        },
        [theme.breakpoints.up('md')]: {
            width: '10em',
            height: '10em',
        },
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(14rem, 11.31vw, 28rem)',
            height: 'clamp(14rem, 11.31vw, 28rem)',
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: '0 5.6px 11.2px 0 rgba(0, 0, 0, 0.2), 0 8.4px 28px 0 rgba(0, 0, 0, 0.19)',
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)',
        },
    },
    cardTextBox: {
        textAlign: 'center',
        marginTop: theme.myTheme.sizeS,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeMM,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeMM,
        backgroundColor: theme.myTheme.juoda,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    cardText: {
        margin: '0',
        padding: '0',
        fontSize: theme.myTheme.sizeM,
        maxWidth: '6em',
        overflow: 'hidden',
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '8em',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '6em',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '10em',
        },
    },
    cardContent: {
        paddingTop: theme.myTheme.sizeXXL,
        paddingRight: theme.myTheme.sizeMM,
        paddingLeft: theme.myTheme.sizeMM,
    },
    imageInnerBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(8rem, 6.5vw, 16rem)',
            height: 'clamp(8rem, 6.5vw, 16rem)',
        },
        // marginBottom: theme.myTheme.sizeXS,
    },
    img: {
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        objectFit: 'contain',
        transition:'all .2s ease-in-out', 
        [theme.breakpoints.up('xl')]: {
            height: 'clamp(7rem, 5.6vw, 14rem)',
            width: 'clamp(7rem, 5.6vw, 14rem)',
        },
    },
    imgHover: {
        width: 'clamp(5rem, 4vw, 10rem)',
        height: 'clamp(5rem, 4vw, 10rem)',
        objectFit: 'contain',
        transition:'all .2s ease-in-out', 
        [theme.breakpoints.up('xl')]: {
            width: 'clamp(8rem, 6.5vw, 16rem)',
            height: 'clamp(8rem, 6.5vw, 16rem)',
        },
    },
    skeletonPicture: {
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        marginBottom: theme.myTheme.sizeXXS,
        height: 140,
        [theme.breakpoints.up('xxl')]: {
            height: 200,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 340,
        },
    },
}));

const HomeproductCard = ({ produktas }) => {  

    const classes = useStyles();
    const history = useHistory();

    const picRef = useRef()

    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <Card 
            classes={{root: classes.card}} 
            onClick={() => {
                    history.push(`/products/${produktas.link}`);
                    window.scrollTo({top: 0, left: 0});
                }}
            > 
            <CardContent 
                classes={{root: classes.cardContent}} 
                onMouseEnter={() => picRef.current.className = classes.imgHover} 
                onMouseLeave={() => picRef.current.className = classes.img}
                >
                    <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center' style={{height: '100%', width: '100%'}}>
                        <Box classes={{root: classes.imageInnerBox}}>
                            {!imgLoaded && <Skeleton variant="rect" animation='wave' classes={{root: classes.skeletonPicture}}/>}
                            <img ref={picRef} src={produktas.image} alt={produktas.name} className={classes.img} onLoad={() => setImgLoaded(true)} />
                        </Box>
                        <Box classes={{root: classes.cardTextBox}}>
                            <p className={classes.cardText}>{produktas.name}</p>
                        </Box>
                    </Box>
            </CardContent>           
        </Card> 
    )
}

export default HomeproductCard
