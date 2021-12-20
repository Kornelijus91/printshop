import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import freeDelivery from '../../../media/freeDelivery.png';
import printing from '../../../media/printing.png';
import man from '../../../media/man.png';
import TrippleSectionPiece from './TrippleSectionPiece';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: '4em 0'
    },
    body: {
        width: '100%',
        padding: '1em',
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    grid: {
        padding: 0,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 2em',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 2.4em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 3em',
        },
    },
}));

const TrippleSection = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.body}}>
                <Grid container >
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid}>
                        <TrippleSectionPiece 
                            pic={freeDelivery} 
                            title={'Nemokamas siuntimas'}
                            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid}>
                        <TrippleSectionPiece 
                            pic={printing} 
                            title={'Kaip tai veikia?'}
                            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid}>
                        <TrippleSectionPiece 
                            pic={man} 
                            title={'Apie mus'}
                            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?'}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TrippleSection
