import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '.7rem',
        width: '10rem',
        backgroundColor: theme.myTheme.trecia,
        maxHeight: '16rem'
    },
    cardButton: {
        margin: '0 0 .2rem 0',
        padding: '.2rem .5rem .2rem .5rem',
    },
    cardContent: {
        padding: '.7rem .7rem 0 .7rem',
        
    },
    cardActions: {
        paddingLeft: '.7rem',
    },
    skeletonPicture: {
        borderRadius: '4px',
        marginBottom: '.4rem'
    },
}));

const ProductSkeleton = () => {

    const classes = useStyles();

    return (
        <Card classes={{root: classes.card}} >
            <CardContent classes={{root: classes.cardContent}}>
                <Skeleton variant="rect" animation='wave' height={140} classes={{root: classes.skeletonPicture}}/>
                <Skeleton variant="text" animation='wave' height={25} />
                <Skeleton variant="text" animation='wave' height={25} />
            </CardContent>
            
            <CardActions classes={{root: classes.cardActions}}>
                <Skeleton variant="text" animation='wave' height={35} width={85}/>
            </CardActions>
            
        </Card> 
    )
}

export default ProductSkeleton
