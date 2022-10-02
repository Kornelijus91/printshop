import { Box, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '86.05vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        backgroundColor: theme.myTheme.ruda.main,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    content: {
        width: '100%',
        height: '100%',
        padding: '1em 1em 3em 1em',
        [theme.breakpoints.up('xl')]: {
            width: '80%',
            padding: '1em 0 3em 0',
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        textDecoration: 'none',
        transition:' color .2s ease',
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            transition:' color .2s ease',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftasBold,
        fontSize: theme.myTheme.sizeM,
        textDecoration: 'none',
        pointerEvents: 'none',
    },
    breacrumbs: {
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        marginBottom: theme.myTheme.sizeXXL,
    },
}));

const Wrapper = ({ routes, children }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Box classes={{root: classes.content}}>
                <Breadcrumbs aria-label="breadcrumb" classes={{root: classes.breacrumbs}}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    {routes.map((item, index) => 
                        <Link to={`/${item.link}`} className={index === routes.length - 1 ? classes.breadcrumbLinkDisabled : classes.breadcrumbLink}>{item.name}</Link>
                    )}
                </Breadcrumbs>
                {children}
            </Box>
        </Box>
    )
}

export default Wrapper