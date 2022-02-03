import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        color: theme.myTheme.trecia,
        textAlign: 'center',

        marginBottom: '1em'
    },
    image: {
        width: 'clamp(6rem, 6vw + 1.4rem, 20rem)',
        height: 'clamp(6rem, 6vw + 1.4rem, 20rem)',
        objectFit: 'fill',
    },
    imageBox: {
        display: 'inline-block', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.myTheme.trecia,
        padding: '3em',
        borderRadius: '50%',
        boxShadow: "0 4px 8px 0 rgba(230, 57, 70, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: '1em',
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0 5px 11px 0 rgba(0, 0, 0, 0.2), 0 8px 27px 0 rgba(0, 0, 0, 0.19)",
            padding: '4em',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
            padding: '6em',
            marginBottom: '2em',
        },
        
    },
    header: {
        margin: '0 0 .5em 0',
        padding: '0',
        fontSize: '1.6rem',
        textShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.15rem',
            textShadow: "0 5px 11px 0 rgba(0, 0, 0, 0.2), 0 8px 27px 0 rgba(0, 0, 0, 0.19)",
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem',
            textShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)"
        },
    },
    parag: {
        margin: '0 0 1em 0',
        padding: '0',
        fontSize: '1.1rem',
        // fontWeight: 'bold',
        textAlign: 'justify',
        textJustify: 'inter-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.474rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.2rem',
        },
    },
}));

const TrippleSectionPiece = ({ pic, title, text }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.imageBox}}>
                <img src={pic} alt={`${title} ikona`} className={classes.image}/>
            </Box>
            <h2 className={classes.header}>{title}</h2>
            <p className={classes.parag}>{text}</p>
        </Box>
    )
}

export default TrippleSectionPiece
