import { Box, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const Breadcurmbs = ({ routes }) => {

    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb" classes={{root: classes.breacrumbs}}>
            <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
            {routes.map((item, index) => 
                <Link to={`/${item.path}`} className={index === routes.length - 1 ? classes.breadcrumbLinkDisabled : classes.breadcrumbLink}>{item.name}</Link>
            )}
        </Breadcrumbs>
    )
}

export default Breadcurmbs