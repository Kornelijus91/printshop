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
        marginBottom: '2em',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '2.7em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '4em',
        },
    },
    bodyparent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '35em',
        padding: '2em 0',
        boxShadow: `0 10px 0 0 ${theme.myTheme.trecia}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            padding: '2.8em 0',
            height: '44em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '4em 0',
            height: '70em',
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
        // backgroundColor: theme.myTheme.pirma,
        // padding: '2em',
        // borderRadius: '50%',
        // boxShadow: "0 4px 8px 0 rgba(230, 57, 70, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        // [theme.breakpoints.up('xxl')]: {
        //     boxShadow: "0 5px 11px 0 rgba(0, 0, 0, 0.2), 0 8px 27px 0 rgba(0, 0, 0, 0.19)",
        //     padding: '2.8em',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
        //     padding: '4em',
        // },
        
    },
    textBox: {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'flex-start',
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
    shapeDividerParentTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        '& svg': {
            position: 'relative',
            display: 'block',
            width: 'calc(187% + 1.3px)',
            height: '50px',
        },
        '& .shape-fill': {
            fill: '#E63946'
        },
        [theme.breakpoints.up('xxl')]: {
            '& svg': {
                position: 'relative',
                display: 'block',
                width: 'calc(187% + 1.3px)',
                height: '69px',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            '& svg': {
                position: 'relative',
                display: 'block',
                width: 'calc(187% + 1.3px)',
                height: '100px',
            },
        },
    },
    shapeDividerParentBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: 'rotate(180deg)',
        '& svg': {
            position: 'relative',
            display: 'block',
            width: 'calc(187% + 1.3px)',
            height: '50px',
        },
        '& .shape-fill': {
            fill: '#E63946'
        },
        [theme.breakpoints.up('xxl')]: {
            '& svg': {
                position: 'relative',
                display: 'block',
                width: 'calc(187% + 1.3px)',
                height: '67.5px',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            '& svg': {
                position: 'relative',
                display: 'block',
                width: 'calc(187% + 1.3px)',
                height: '100px',
            },
        },
    },
    bottomSVGParent: {
        position: 'relative',
        width: '100%',
        height: '36em',
        backgroundColor: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            height: '46em',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '71em',
        },
    },
}));

const SectionOne = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.bottomSVGParent}}>
                {/* <div className={classes.shapeDividerParentTop}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                    </svg>
                </div> */}
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
                                <Box classes={{root: classes.textBox}}>
                                    <h2 className={classes.header}>Tavo Reklama klubas!</h2>
                                    <p className={classes.parag}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi, suscipit nostrum, voluptatem ab, quod voluptate ipsam libero magnam delectus architecto. Tempore illum nihil reprehenderit eligendi quibusdam itaque sed cum?</p>
                                    <Link to="/klubas" className={classes.link} onClick={() => window.scrollTo({top: 0, left: 0})}>Sužinoti daugiau</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <div className={classes.shapeDividerParentBottom}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                    </svg>
                </div> */}
            </Box>
            
        </Box>
    )
}

export default SectionOne
