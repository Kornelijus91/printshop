import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import freedelivery from '../../../media/freedelivery.png';
// import printing from '../../../media/printing.png';
// import man from '../../../media/man.png';
import masina from '../../../media/masina.webp'
import printeris from '../../../media/printeris.webp'
import zmogs from '../../../media/zmogs.webp'
import TrippleSectionPiece from './TrippleSectionPiece';
import minifonas from '../../../media/minifonas.webp'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeM,
        padding: '5em 2em 3em 2em',
        fontFamily: theme.myTheme.sriftas,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${minifonas})`,
        backgroundSize: 'cover',
    },
    body: {
        width: '100%',
        fontSize: theme.myTheme.sizeM,
        padding: '1em',
        [theme.breakpoints.up('xl')]: {
            width: '80%',
        },
    },
    grid1: {
        padding: 0,
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 3em 0 0',
        },
    },
    grid2: {
        padding: 0,
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 1.5em',
        },
    },
    grid3: {
        padding: 0,
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 3em',
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
                            pic={masina} 
                            title={'Pristatymas'}
                            text={'Visi užsakymai pasieks Jus nemokamai Jums patogiausiu būdu: Kurjeriu tarnyba, autobusų siuntomis arba į Jūsų nurodytą artimiausia paštomatą.'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid2}>
                        <TrippleSectionPiece 
                            pic={printeris} 
                            title={'Kaip tai veikia?'}
                            text={'Pasirinkus produktą, nustatykite jo ypatybes, sukurkite, įkelkite arba užsakykite dizaino paslaugą (maketą). Įdėkite produktą į krepšelį. Pasirinkite gamybos terminą ir pristatymo būdą. Apmokėjus, gaminiai Jus pasieks Jus artimiausiu metu.'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid3}>
                        <TrippleSectionPiece 
                            pic={zmogs} 
                            title={'Apie mus'}
                            text={'Tavo reklama tai šiuolaikinė erdvė internete kurios tikslas supaprastinti ir pagreitinti visus procesus susijusius su spauda ir jos gamyba. Mūsų komanda patars ir padės Jums bet kokiais Jums iškilusiais klausimais.'}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TrippleSection
