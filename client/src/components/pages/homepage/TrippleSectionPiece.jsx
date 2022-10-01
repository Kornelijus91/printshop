import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        color: theme.myTheme.trecia,
        textAlign: 'center',
        marginBottom: '1em'
    },
    image: {
        width: 'clamp(6rem, 6vw + 1.4rem, 20rem)',
        height: 'clamp(6rem, 6vw + 1.4rem, 20rem)',
        objectFit: 'contain',
    },
    cardTextBox: {
        fontSize: theme.myTheme.sizeM,
        width: '14em',
        marginBottom: '2em',
        textAlign: 'center',
        marginTop: theme.myTheme.sizeMM,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeMM,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeMM,
        backgroundColor: theme.myTheme.juoda,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    header: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftasBold,
        fontSize: theme.myTheme.sizeM,
    },
    parag: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        margin: '0 0 1em 0',
        padding: '0',
    },
}));

const TrippleSectionPiece = ({ pic, title, text }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <img src={pic} alt={`${title} ikona`} className={classes.image}/>
            <Box classes={{root: classes.cardTextBox}}>
                <p className={classes.header}>{title}</p>
            </Box>
            <p className={classes.parag}>{text}</p>
        </Box>
    )
}

export default TrippleSectionPiece
