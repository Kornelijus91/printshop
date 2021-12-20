import { Box, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import crown from '../../../media/crown.png';
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        backgroundColor: theme.myTheme.trecia,
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

const SectionTwo = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <svg className={classes.lowerSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#E63946" fill-opacity="1" d="M0,96L6.2,122.7C12.3,149,25,203,37,197.3C49.2,192,62,128,74,128C86.2,128,98,192,111,202.7C123.1,213,135,171,148,149.3C160,128,172,128,185,112C196.9,96,209,64,222,85.3C233.8,107,246,181,258,202.7C270.8,224,283,192,295,160C307.7,128,320,96,332,117.3C344.6,139,357,213,369,250.7C381.5,288,394,288,406,261.3C418.5,235,431,181,443,160C455.4,139,468,149,480,165.3C492.3,181,505,203,517,181.3C529.2,160,542,96,554,64C566.2,32,578,32,591,58.7C603.1,85,615,139,628,160C640,181,652,171,665,154.7C676.9,139,689,117,702,128C713.8,139,726,181,738,192C750.8,203,763,181,775,176C787.7,171,800,181,812,165.3C824.6,149,837,107,849,80C861.5,53,874,43,886,69.3C898.5,96,911,160,923,192C935.4,224,948,224,960,208C972.3,192,985,160,997,138.7C1009.2,117,1022,107,1034,117.3C1046.2,128,1058,160,1071,192C1083.1,224,1095,256,1108,240C1120,224,1132,160,1145,138.7C1156.9,117,1169,139,1182,144C1193.8,149,1206,139,1218,122.7C1230.8,107,1243,85,1255,74.7C1267.7,64,1280,64,1292,80C1304.6,96,1317,128,1329,133.3C1341.5,139,1354,117,1366,112C1378.5,107,1391,117,1403,122.7C1415.4,128,1428,128,1434,128L1440,128L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"></path></svg>
            <Box classes={{root: classes.bodyparent}}>
                <Box classes={{root: classes.body}}>
                    <Grid container>
                        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <h2 className={classes.header}>Apie mus!</h2>
                            <p className={classes.parag}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?</p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Hidden smDown implementation="css">
                                <Box classes={{root: classes.imageBox}}>
                                    {/* <img src={man} alt="zmones ikona" className={classes.image}/> */}
                                </Box>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default SectionTwo
