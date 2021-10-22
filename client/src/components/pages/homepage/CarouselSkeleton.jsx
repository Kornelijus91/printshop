import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0',
        height: '40rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselContent: {
        width: '100%',
    },
    carouselItem: {
        height: '37rem'
    },
    carouselIndicators: {
        width: '100%'
    },
}));


const CarouselSkeleton = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.carouselContent}}>
                <Grid container display="flex" justifyContent='center' alignItems='center'>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.carouselItem}} display="flex" justifyContent='center' alignItems='center'>
                            <Box >
                                <Box classes={{root: classes.contentItem}}> 
                                    <Skeleton variant="text" animation='wave' height={65} width={210}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" animation='wave' height={45} width={310}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" animation='wave' height={45} width={270}/>
                                </Box>
                                <Box classes={{root: classes.contentItem}}>
                                    <Skeleton variant="text" width={100} height={60} animation='wave'/>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Box classes={{root: classes.carouselItem}} display="flex" justifyContent='center' alignItems='center'>
                            <Box >
                                <Skeleton variant="text" width={520} height={450} animation='wave'/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box classes={{root: classes.carouselIndicators}} display="flex" justifyContent='center' alignItems='center'>
                    <Skeleton variant="circle"  width={15} height={15} animation='wave' style={{marginRight: '1rem'}}/>
                    <Skeleton variant="circle"  width={15} height={15} animation='wave' style={{marginRight: '1rem'}}/>
                    <Skeleton variant="circle"  width={15} height={15} animation='wave'/>
                </Box>
            </Box>
        </Box>
    )
}

export default CarouselSkeleton
