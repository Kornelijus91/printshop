import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '.7rem',
        width: '100%',
        // height: '100%',
        backgroundColor: theme.myTheme.trecia,
        // maxHeight: '16rem',
        // [theme.breakpoints.up('xxl')]: {
        //     height: '100rem',
        // },
    },
    cardButton: {
        margin: '0 0 .2rem 0',
        padding: '.2rem .5rem .2rem .5rem',
    },
    cardContent: {
        padding: '.7rem .7rem 0 .7rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '1rem 1rem 0 1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1.2rem 1.2rem 0 1.2rem',
        },
    },
    cardActions: {
        paddingLeft: '.7rem',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '1.2rem',
        },
    },
    skeletonPicture: {
        borderRadius: '4px',
        marginBottom: '.4rem',
        height: 140,
        [theme.breakpoints.up('xxl')]: {
            height: 200,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 340,
        },
    },
    text: {
        height: 25,
        [theme.breakpoints.up('xxl')]: {
            height: 35,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 45,
        },
    },
    button: {
        height: 35,
        width: 85,
        [theme.breakpoints.up('xxl')]: {
            height: 45,
            width: 95,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 55,
            width: 105,
        },
    },
}));

const ProductSkeleton = () => {

    const classes = useStyles();

    return (
        <Card classes={{root: classes.card}} >
            <CardContent classes={{root: classes.cardContent}}>
                <Skeleton variant="rect" animation='wave' classes={{root: classes.skeletonPicture}}/>
                <Skeleton variant="text" animation='wave' classes={{root: classes.text}}/>
                <Skeleton variant="text" animation='wave' classes={{root: classes.text}}/>
            </CardContent>
            
            <CardActions classes={{root: classes.cardActions}}>
                <Skeleton variant="text" animation='wave' classes={{root: classes.button}}/>
            </CardActions>
            
        </Card> 
    )
}

export default ProductSkeleton
