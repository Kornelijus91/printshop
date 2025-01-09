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
                            text={'Visi užsakymai pasieks Jus laiku Jums patogiausiu būdu: kurjerių tarnyba, autobusų siuntomis arba į Jūsų nurodytą artimiausią paštomatą. Esant bet kokiems klausimams ar neaiškumams mūsų komanda susisieks asmeniškai ir ras Jums tinkamiausią sprendimą.'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid2}>
                        <TrippleSectionPiece 
                            pic={printeris} 
                            title={'Kaip tai veikia?'}
                            text={'Ši platforma sukurta taupyti visų laiką ir išlaidas, o užsakymo procesas - paprastas ir greitas. Visų prekių savybės supildytos jau pagal prekių standartus, kurie užtikrins visų gaminių kokybę ir sumažins klaidų galimybes. Jums tiesiog reikia pasirinkti produktą, nustatyti jo savybes, sukurti, įkelti į sistemą arba užsakyti mūsų dizainerio maketavimo paslaugas. Užbaigus užsakymą gaminiai Jus pasieks pasirinktu artimiausiu metu. Iškilus bet kokiems klausimams mielai Jums padėsime, susisiekite nurodytais kontaktais arba paspaudę pranešimo piktogramą.'}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.grid3}>
                        <TrippleSectionPiece 
                            pic={zmogs} 
                            title={'Apie mus'}
                            text={'Mes esame maža. bet veržli ir stabili komanda. Mūsų pagrindinis tikslas - supaprastinti visus mažo ar vidutinio tiražo spaudos procesus, eliminuojant dažniausiai pasitaikančias klaidas. Visi komandos nariai yra savo srities profesionalai, kurie seks Jūsų užsakymą nuo pat pradžių iki galo. Galite likti ramūs dėl gamybos eigos, pastebėjus netikslumus ar klaidas susisieksime su Jumis ir kartu jas pašalinsime. „Tavo reklama“ - tai šiuolaikinė ir patikima spaustuvė internete.'}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TrippleSection
