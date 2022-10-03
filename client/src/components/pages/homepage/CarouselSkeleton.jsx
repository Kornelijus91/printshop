import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.myTheme.sizeM,
        backgroundColor: theme.myTheme.ruda.main,
    },
    carouselContent: {
        padding: '2em 0',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    carouselItem: {
        width: '100%',
        height: '20em',
        display: "flex", 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingLeft: '1em',
        [theme.breakpoints.up('md')]: {
            height: '30em',
        },
        [theme.breakpoints.up('lg')]: {
            height: '30em',
            paddingLeft: '4.5em'
        },
    },
    carouselIndicators: {
        width: '100%',
    },
    leftInner: {
       
    },
    skeletonHeader: {
        height: 30, 
        width: 100,
        
        [theme.breakpoints.up('lg')]: {
            height: 65, 
            width: 210
        },
        [theme.breakpoints.up('xxl')]: {
            height: 75, 
            width: 310
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 85, 
            width: 410
        },
    },
    skeletonText1: {
        height: 20, 
        width: 140,
        [theme.breakpoints.up('lg')]: {
            height: 45,
            width: 310
        },
        [theme.breakpoints.up('xxl')]: {
            height: 55, 
            width: 410
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 65, 
            width: 510
        },
    },
    skeletonText2: {
        height: 20, 
        width: 120,
        [theme.breakpoints.up('lg')]: {
            height: 45, 
            width: 270
        },
        [theme.breakpoints.up('xxl')]: {
            height: 55, 
            width: 370
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 65, 
            width: 470
        },
    },
    skeletonButton: {
        height: 30, 
        width: 60,
        [theme.breakpoints.up('lg')]: {
            height: 60, 
            width: 100
        },
        [theme.breakpoints.up('xxl')]: {
            height: 70, 
            width: 200
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 80, 
            width: 300
        },
    },
    skeletonPicture: {
        height: 200, 
        width: 120,
        [theme.breakpoints.up('sm')]: {
            height: 200, 
            width: 300,
        },
        [theme.breakpoints.up('lg')]: {
            height: 450, 
            width: 520
        },
        [theme.breakpoints.up('xxl')]: {
            height: 550, 
            width: 620
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 850, 
            width: 1020
        },
    },
}));


const CarouselSkeleton = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.carouselContent}}>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.carouselItem}}>
                            <Box classes={{root: classes.leftInner}}>
                                <Box classes={{root: classes.contentItem}}> 
                                    <Skeleton variant="text" animation='wave' classes={{root: classes.skeletonHeader}}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" animation='wave' classes={{root: classes.skeletonText1}}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" animation='wave' classes={{root: classes.skeletonText2}}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" animation='wave' classes={{root: classes.skeletonButton}}/>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.carouselItem}} display="flex" justifyContent='center' alignItems='center'>
                            <Box >
                                <Skeleton variant="text" animation='wave' classes={{root: classes.skeletonPicture}}/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box classes={{root: classes.carouselIndicators}} display="flex" justifyContent='center' alignItems='center'>
                    <Skeleton variant="circle"  width={10} height={10} animation='wave' style={{marginRight: '2rem'}}/>
                    <Skeleton variant="circle"  width={10} height={10} animation='wave' style={{marginRight: '2rem'}}/>
                    <Skeleton variant="circle"  width={10} height={10} animation='wave'/>
                </Box>
            </Box>
        </Box>
    )
}

export default CarouselSkeleton
