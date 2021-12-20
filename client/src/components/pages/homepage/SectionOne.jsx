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
    lowerSVG: {
        display: 'block',
        filter: 'drop-shadow(4px 8px 4px rgba(0, 0, 0, 0.2))',
        [theme.breakpoints.up('xxl')]: {
            filter: 'drop-shadow(5px 11px 5px rgba(0, 0, 0, 0.2))',
        },
        [theme.breakpoints.up('xxxl')]: {
            filter: 'drop-shadow(8px 16px 8px rgba(0, 0, 0, 0.2))',
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
            <svg className={classes.lowerSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F1FAEE" fill-opacity="1" d="M0,64L6.2,96C12.3,128,25,192,37,218.7C49.2,245,62,235,74,208C86.2,181,98,139,111,117.3C123.1,96,135,96,148,117.3C160,139,172,181,185,192C196.9,203,209,181,222,176C233.8,171,246,181,258,202.7C270.8,224,283,256,295,261.3C307.7,267,320,245,332,218.7C344.6,192,357,160,369,133.3C381.5,107,394,85,406,74.7C418.5,64,431,64,443,58.7C455.4,53,468,43,480,53.3C492.3,64,505,96,517,106.7C529.2,117,542,107,554,128C566.2,149,578,203,591,208C603.1,213,615,171,628,138.7C640,107,652,85,665,90.7C676.9,96,689,128,702,133.3C713.8,139,726,117,738,138.7C750.8,160,763,224,775,224C787.7,224,800,160,812,144C824.6,128,837,160,849,181.3C861.5,203,874,213,886,234.7C898.5,256,911,288,923,288C935.4,288,948,256,960,245.3C972.3,235,985,245,997,229.3C1009.2,213,1022,171,1034,128C1046.2,85,1058,43,1071,42.7C1083.1,43,1095,85,1108,133.3C1120,181,1132,235,1145,234.7C1156.9,235,1169,181,1182,138.7C1193.8,96,1206,64,1218,90.7C1230.8,117,1243,203,1255,245.3C1267.7,288,1280,288,1292,261.3C1304.6,235,1317,181,1329,170.7C1341.5,160,1354,192,1366,218.7C1378.5,245,1391,267,1403,261.3C1415.4,256,1428,224,1434,208L1440,192L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"></path></svg>
        </Box>
    )
}

export default SectionOne
