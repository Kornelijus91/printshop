import { Box, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import printing from '../../../media/printing.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 3px 0 #457B9D, 0 -3px 0 #457B9D',
        padding: '2em 0'
    },
    body: {
        width: '100%',
        padding: '1em',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
    },
    header: {
        margin: '0 0 .5em 0',
        padding: '0',
        fontSize: '2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '3rem',
            
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '4rem',
            
        },
    },
    parag: {
        margin: '0',
        padding: '0',
        fontSize: '1.2rem',
        textAlign: 'justify',
        textJustify: 'inter-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.62rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    image: {
        width: 'clamp(6rem, 10vw + 2rem, 32rem)',
        height: 'clamp(6rem, 10vw + 2rem, 32rem)',
        objectFit: 'fill'
    },
    imageBox: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center'
        },
        
    },
}));

const HowItWorksSection = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.body}}>
                <Grid container>
                    
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Hidden smDown implementation="css">
                            <Box classes={{root: classes.imageBox}}>
                                <img src={printing} alt="Spausdintuvo ikona" className={classes.image}/>
                            </Box>
                        </Hidden>
                    </Grid>
                    
                    <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                        <h2 className={classes.header}>Kaip tai veikia?</h2>
                        <p className={classes.parag}>Pasirinkite produkt??  ir jo parametrus, ??kelkite, susikurkite arba u??sakykite fail?? ir pasirink?? dominant?? kiek?? ??d??kite produkt?? ?? krep??el??. Pasirinkite gamybos termin?? ir pristatymo b??d??. Apmok??jus u??sakym?? jis bus prad??tas gamintis.</p>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default HowItWorksSection
