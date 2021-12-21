import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import freedelivery from '../../../media/freedelivery.png';
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
    grid1: {
        padding: 0,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 3em 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 4em 0 0',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 6em 0 0',
            marginBottom: '2em',
        },
    },
    grid2: {
        padding: 0,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 1.5em',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 2em',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2em',
            marginBottom: '3em',
        },
    },
    grid3: {
        padding: 0,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 3em',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 0 0 4em',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 0 0 6em',
            marginBottom: '2em',
        },
    },
}));

const TrippleSection = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}> 
            <Box classes={{root: classes.body}}>
                <Grid container >
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid1}>
                        <TrippleSectionPiece 
                            pic={freedelivery} 
                            title={'Nemokamas siuntimas'}
                            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid2}>
                        <TrippleSectionPiece 
                            pic={printing} 
                            title={'Kaip tai veikia?'}
                            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid3}>
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
