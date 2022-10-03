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

const Trklubas = ({ loyalty, loyaltydiscount }) => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Tavo Reklama klubas | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcurmbs routes={[{path: 'klubas', name: 'Tavo Reklama klubas'}]}/>
                <h1>Tavo Reklama klubas</h1>
                <p>
                    Užsiregistravę tavo reklama klientai automatiškai tampa klubo nariais. Tavo reklama klubas yra unikali lojalumo programa kuri turi net 5 kis skirtingus lygius. Visus kalendorinius metus, klubo nario bendra užsakymų vertė sumuosis. Pasiekus tam tikrą lygį, klubo nariui bus taikoma individuali nurodyta nuolaida visiems tų metų užsakymams.
                </p>
                {loyalty.length > 0 &&
                    <>
                        {loyalty.map((item, i) => 
                            <p style={item.discount === loyaltydiscount ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}>Lygis {i + 1} - Nuo: {item.money}€ - Nuolaida: {item.discount}%</p>
                        )}
                    </>
                }
            </Box>
        </Box>
    )
}

export default Trklubas
