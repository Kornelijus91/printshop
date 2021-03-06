import { Box, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import freeDelivery from '../../../media/freedelivery.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 4px 0 #A8DADC',
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

const FreeShippingSection = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.body}}>
                <Grid container>
                    
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Hidden smDown implementation="css">
                            <Box classes={{root: classes.imageBox}}>
                                <img src={freeDelivery} alt="Nemokamas siuntimas ikona" className={classes.image}/>
                            </Box>
                        </Hidden>
                    </Grid>
                    
                    <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                        <h2 className={classes.header}>Nemokamas siuntimas!</h2>
                        <p className={classes.parag}>J??s?? u??sakymas visada pristatomas nemokamai Jus pasirinktu b??du: kurjeri?? tarnyba, autobus?? siuntomis arba ?? J??s?? nurodyt?? pa??tomat??.</p>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default FreeShippingSection
