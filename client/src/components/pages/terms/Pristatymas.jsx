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
        paddingBottom: '2em',
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

const Pristatymas = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Pristatymas | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcurmbs routes={[{path: 'pristatymas', name: 'Pristatymas'}]}/>
                <h1>Prekių pristatymas į namus</h1>
                <p>Prekių pristatymu į namus rūpinasi mūsų partneriai kurjerių tarnybą Venipak išskyrus Kuršių Neriją, kur prekės pristatomos per Omnivą paštomatus.</p>
                <p>Jei pasirinkote prekių pristatymą į namus, jos bus pristatytos per terminą, nurodytą prie pasirinktos prekės.</p>
                <p>Kurjeriai prekes pristato pagal iš anksto numatytą maršrutą, todėl galimybės pasirinkti tikslų pristatymo laiką nėra.</p>
                <p>Didžiuosiuose miestuose (Vilniuje, Kaune, Klaipėdoje, Alytuje, Marijampolėje, Šiauliuose, Panevėžyje, Tauragėje, Telšiuose, Utenoje bei jų rajonuose) prekės pristatomos darbo dienomis <b>8–22 val.</b>, kitur Lietuvoje <b>8–18 val.</b></p>
                <h1>Prekių pristatymas į siuntų taškus ir paštomatus</h1>
                <p>Jei pasirinkote prekių pristatymą į LP Express, Omniva, DPD, Venipak paštomatus, jos bus pristatytos per terminą, nurodytą prie pasirinktos prekės.</p>
                <h1>Prekių pristatymas autobusu</h1>
                <p>Jei pasirinkote prekių autobusu, jos bus pristatytos į siuntos autobusais terminalus per terminą, nurodytą prie pasirinktos prekės.</p>
                <p><b>Svarbu.</b> Įsitikinkite ar Jūsų mieste yra veikiantis siuntos autobusais terminalas. Jei jo nėra prekes teks atsiimti konkrečiu laiku tiesiogiai iš autobuso vairuotojo.</p>
            </Box>
        </Box>
    )
}

export default Pristatymas
