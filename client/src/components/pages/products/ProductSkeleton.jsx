import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '.5rem .5rem',
        '& p': {
            fontFamily: theme.myTheme.sriftas,
            margin: '.2rem',
            padding: 0
        },
        [theme.breakpoints.up('lg')]: {
            width: '94%',
            padding: '.5rem 0',
        },
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
        [theme.breakpoints.up('xxl')]: {
            '& p': {
                margin: '.6rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            '& p': {
                margin: '1rem',
            },
        },
    },
    body: {
        backgroundColor: theme.myTheme.trecia,
        minHeight: '90vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    link: {
        width: 100,
        height: 25,
        [theme.breakpoints.up('xxl')]: {
            width: 150,
            height: 37,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 200,
            height: 50,
        },
    },
    headerBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerBoxLeft: {
        width: '60%'
    },
    headerBoxRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '40%',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    stepper: {
        marginTop: '2rem',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    stepperLabel: {
        marginBottom: '2rem',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    content: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    mobileSkeletonAligncontent: {
        display: 'flex', 
        justifyContent: 'flex-start',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
    header: {
        width: 150,
        height: 40,
        [theme.breakpoints.up('md')]: {
            width: 300,
            height: 85,
        },
        [theme.breakpoints.up('xxl')]: {
            width: 450,
            height: 127,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 600,
            height: 170,
        },
    },
    text: {
        width: 200,
        height: 20,
        [theme.breakpoints.up('md')]: {
            width: 600,
            height: 40,
        },
        [theme.breakpoints.up('xxl')]: {
            width: 800,
            height: 60,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 1200,
            height: 80,
        },
    },
    pic: {
        width: 400,
        height: 300,
        [theme.breakpoints.up('xxl')]: {
            width: 600,
            height: 450,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 800,
            height: 600,
        },
    },
    step: {
        width: 35,
        height: 35,
        [theme.breakpoints.up('xxl')]: {
            width: 52,
            height: 52,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 70,
            height: 70,
        },
    },
    line: {
        width: 400,
        height: 10,
        margin: '.6rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            width: 500,
            height: 15,
            margin: '.9rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 800,
            height: 20,
            margin: '1.2rem 2rem',
        },
    },
    label: {
        width: 200,
        height: 30,
        [theme.breakpoints.up('xxl')]: {
            width: 300,
            height: 45,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 400,
            height: 60,
        },
    },
    select: {
        width: 250,
        height: 65,
        [theme.breakpoints.up('md')]: {
            width: 350,
            height: 65,
        },
        [theme.breakpoints.up('xxl')]: {
            width: 470,
            height: 97,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 700,
            height: 130,
        },
    },
    pastaba: {
        width: 250,
        height: 140,
        [theme.breakpoints.up('md')]: {
            width: 350,
            height: 140,
        },
        [theme.breakpoints.up('xxl')]: {
            width: 470,
            height: 210,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 700,
            height: 280,
        },
    },
    divider: {
        width: 5,
        height: 400,
        [theme.breakpoints.up('xxl')]: {
            width: 7,
            height: 600,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 10,
            height: 800,
        },
    },
    explainer: {
        width: 350,
        height: 30,
        [theme.breakpoints.up('xxl')]: {
            width: 470,
            height: 45,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 700,
            height: 60,
        },
    },
    button: {
        width: 350,
        height: 55,
        [theme.breakpoints.up('xxl')]: {
            width: 470,
            height: 72,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 700,
            height: 110,
        },
    },
}));

const ProductSkeleton = () => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.body}}>
            <Box classes={{root: classes.root}}>
                <Box display='flex' justifyContent='flex-start'>
                    <Skeleton variant="text" classes={{root: classes.link}}/>
                    <p>/</p>
                    <Skeleton variant="text" classes={{root: classes.link}}/>
                    <p>/</p>
                    <Skeleton variant="text" classes={{root: classes.link}}/>
                </Box>
                <Box classes={{root: classes.headerBox}}>
                    <Box classes={{root: classes.headerBoxLeft}}>
                        <Skeleton variant="text" classes={{root: classes.header}}/>
                        <Skeleton variant="text" classes={{root: classes.text}}/>
                        <Skeleton variant="text" classes={{root: classes.text}}/>
                        <Skeleton variant="text" classes={{root: classes.text}}/>
                        <Skeleton variant="text" classes={{root: classes.text}}/>
                    </Box>
                    <Box classes={{root: classes.headerBoxRight}}>
                        <Skeleton variant="rect" classes={{root: classes.pic}}/>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center' classes={{root: classes.stepper}}>
                    <Skeleton variant="circle" classes={{root: classes.step}}/>
                    <Skeleton variant="text" classes={{root: classes.line}}/>
                    <Skeleton variant="circle" classes={{root: classes.step}}/>
                    <Skeleton variant="text" classes={{root: classes.line}}/>
                    <Skeleton variant="circle" classes={{root: classes.step}}/>
                </Box>
                <Box display='flex' justifyContent='center' classes={{root: classes.stepperLabel}}>
                    <Box display='flex' justifyContent='flex-start' style={{width: '33%'}}>
                        <Skeleton variant="text" classes={{root: classes.label}}/>
                    </Box>
                    <Box display='flex' justifyContent='center' style={{width: '34%'}}>
                        <Skeleton variant="text" classes={{root: classes.label}}/>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' style={{width: '33%'}}>
                        <Skeleton variant="text" classes={{root: classes.label}}/>
                    </Box>
                </Box>
                <Box classes={{root: classes.mobileSkeletonAligncontent}}>
                    <Box style={{width: '32%'}}>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.pastaba}}/>
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' style={{width: '2%'}} classes={{root: classes.content}}>
                        <Skeleton variant="rect" classes={{root: classes.divider}}/>
                    </Box>
                    <Box style={{width: '32%'}} classes={{root: classes.content}}>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.button}}/>
                    </Box>
                    <Box display='flex' justifyContent='centert' alignItems='center' style={{width: '2%'}} classes={{root: classes.content}}>
                        <Skeleton variant="rect" classes={{root: classes.divider}}/>
                    </Box>
                    <Box style={{width: '32%'}} classes={{root: classes.content}}>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.select}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.explainer}}/>
                        <Skeleton variant="text" classes={{root: classes.button}}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductSkeleton
