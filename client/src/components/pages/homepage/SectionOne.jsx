import { Box, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import crown from '../../../media/crown.png';
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: '4em 0'
    },
    bodyparent: {
        width: '100%',
        padding: '2em 0',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `0 10px 0 0 ${theme.myTheme.trecia}`,
        [theme.breakpoints.up('xxl')]: {
            padding: '2.8em 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '4em 0',
        },
    },
    body: {
        width: '100%',
        padding: '1em',
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    header: {
        margin: '0 0 .5em 0',
        padding: '0',
        fontSize: '2rem',
        textShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '3rem',
            textShadow: "0 5px 11px 0 rgba(0, 0, 0, 0.2), 0 8px 27px 0 rgba(0, 0, 0, 0.19)",
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '4rem',
            textShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)"
        },
    },
    parag: {
        margin: '0 0 1em 0',
        padding: '0',
        fontSize: '1.2rem',
        fontWeight: 'bold',
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
        objectFit: 'fill',
    },
    imageBox: {
        display: 'inline-block', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.myTheme.pirma,
        padding: '2em',
        borderRadius: '50%',
        boxShadow: "0 4px 8px 0 rgba(230, 57, 70, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0 5px 11px 0 rgba(0, 0, 0, 0.2), 0 8px 27px 0 rgba(0, 0, 0, 0.19)",
            padding: '2.8em',
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
            padding: '4em',
        },
        
    },
    link: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        transition:'color .4s ease', 
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
}));

const SectionOne = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            {/* <svg className={classes.upperSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L60,96C120,96,240,96,360,112C480,128,600,160,720,154.7C840,149,960,107,1080,101.3C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
            <Box classes={{root: classes.bodyparent}}>
                <Box classes={{root: classes.body}}>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Hidden smDown implementation="css">
                                <Box classes={{root: classes.imageBox}}>
                                    <img src={crown} alt="Tavo Reklama klubas ikona" className={classes.image}/>
                                </Box>
                            </Hidden>
                        </Grid>
                        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <h2 className={classes.header}>Tavo Reklama klubas!</h2>
                            <p className={classes.parag}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?</p>
                            <Link to="/klubas" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Sužinoti daugiau</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default SectionOne
