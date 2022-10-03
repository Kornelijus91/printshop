import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        width: '94%',
        textAlign: 'left',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
        "& p": {
            margin: '0 0 .5em 0',
            padding: 0,
            fontSize: theme.myTheme.sizeM,
        },
        "& h1": {
            margin: '1em 0 1em 0',
            padding: 0,
            fontSize: theme.myTheme.sizeXL,
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%',
        },
    },
}));

const Apmokejimas = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Mokėjimo būdai | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcurmbs routes={[{path: 'klubas', name: 'Mokėjimo būdai'}]}/>
                <h1>Mokėjimo būdai</h1>

                <h2>Mokėkite grynaisiais pinigais atsiėmimo metu!</h2>
                <p>Jūsų patogumui siūlome atsiskaityti už prekes grynaisiais pinigais. Pasirinkę šį mokėjimo būdą, atsiskaityti galėsite kurjeriui prekių pristatymo metu.</p>
                <p>Dėmesio! Prekių pristatymo į namus metu turėkite tikslią grynųjų pinigų sumą, nurodytą Jūsų užsakyme.</p>

                <h2>Mokėkite mokėjimo kortele!</h2>
                <p>Jūsų patogumui siūlome atsiskaityti už prekes mokėjimo kortele.</p>
                <p><b>SVARBU!</b> Atsiskaitymai kortele vykdomi tik jei Jūsų kortelę išdavęs bankas dalyvauja saugių atsiskaitymų internetu programose (MasterCard SecureCode arba Verified by Visa). Suvedus kortelės duomenis Jūs galite būti nukreiptas į Jūsų kortelę išdavusio banko puslapį saugos kodo suvedimui, kuris reikalingas Jūsų tapatybės patvirtinimui.  Jei mokėjimas nebus patvirtintas, prašome kreiptis į Jūsų kortelę išdavusį banką arba pasirinkti kitą mokėjimo būdą.</p>
                
                <h2>Mokėkite per elektroninę bankininkystę!</h2>
                <p>Atsiskaityti galima naudojantis elektronine bankininkyste arba per Paysera mokėjimų sistemą.</p>
                <p><b>Kaip apmokėti užsakymą naudojantis elektronine bankininkyste?</b></p>
                <p>1. Užpildykite užsakymą ir užsakymo žingsnyje „Mokėjimo būdas“ pasirinkite savo banką.</p>
                <p>2. treklama.lt nukreips Jus į banko puslapį ir perduos elektroninės bankininkystės sistemai duomenis apie sumą, kurią reikia apmokėti.</p>
                <p>3. Elektroninės bankininkystės puslapyje prisijunkite įprastu būdu ir sistema jau bus Jums suformavusi mokėjimą už išsirinktas prekes. Beliks tik patvirtinti mokėjimą.</p>
                <p>4. Patvirtinus mokėjimą, elektroninės bankininkystės puslapis užsidarys, o Jūs vėl sugrįšite į treklama.lt. Prisijungimo prie elektroninės bankininkystės duomenys naudojami tik prisijungimui prie banko puslapio, o grįžtant į internetinę parduotuvę treklama.lt neperduodami.</p>
            </Box>
        </Box>
    )
}

export default Apmokejimas
