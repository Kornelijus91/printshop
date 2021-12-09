import { useState, useRef, useEffect } from 'react'
import {Helmet} from "react-helmet";
import { ProjectName, ClientID, ViewID } from '../../../Variables.jsx'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button } from '@material-ui/core';
// import { AnalyticsDashboard, SessionsByDateChart } from 'react-analytics-charts';
import { useAnalyticsApi, useAuthorize, useSignOut } from "react-use-analytics-api";
import { SessionsByDateChart, PageViewsPerPathChart, SessionsByDeviceCategoryChart, SessionsBySourceChart} from 'react-analytics-charts'; //SessionsByHourChart, BounceRateChart, OrganicSearchesChart 

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.myTheme.ketvirta,
        margin: '1rem 0 0 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '4rem 0 0 0',
            fontSize: '1.8rem'
        },
    },
    button: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
}));

const Statistics = () => {

    const classes = useStyles();

    const { ready, gapi, authorized, error } = useAnalyticsApi();

    const authorize = useAuthorize(gapi, {
        clientId: ClientID,
        container: "authorize-container-id",
    });

    const signOut = useSignOut(gapi);

    const [authorizeCalled, setAuthorizeCalled] = useState(false);

    const authDiv = useRef(null);
    const hasAuthElements = authDiv.current && authDiv?.current?.children?.length > 0;

    useEffect(() => {
        if (ready && !error && !authorizeCalled) {
          authorize();
          setAuthorizeCalled(true);
        }
    }, [authorize, authorizeCalled, error, ready]);

    // const test = () => {
    //     console.log('READY => ', ready);
    //     console.log('AUTH => ', authorized);
    //     console.log('GAPI => ', gapi);
    //     console.log('ERROR => ', error);
    // };

    // const query = {
    //     ids: ViewID,
    //     "start-date": "28daysAgo",
    //     "end-date": "today",
    //     metrics: "ga:sessions",
    //     dimensions: "ga:date",
    // };
    // const chart = {
    //     container: "data-chart-container",
    //     type: "LINE",
    //     options: {
    //         title: "Sessions (28 Days)",
    //     },
    // };
    // useDataChart(authorized ? gapi : undefined, query, chart);

    return (
        <div >
            <Helmet>
                <title>Statistika | {ProjectName}</title>  
            </Helmet>
            <Grid container className={classes.root}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box style={{padding: '.5rem'}}>
                        {!error &&
                            (ready && !!gapi ? (
                                <div>
                                    {authorized && (
                                        <div>
                                            Prisijungta prie Google Analytics!{" "}
                                            <Button onClick={() => signOut()} classes={{root: classes.button}}>Atsijungti</Button>
                                        </div>
                                    )}
                                    {!authorized && <div>Neprisijungta prie Google Analytics</div>}
                                    <div id="authorize-container-id" ref={authDiv} />
                                    {!authorized && authorizeCalled && !hasAuthElements && (
                                        <div>Perkraukite puslapį kad matytumėte Google analytics.</div>
                                    )}
                                </div>
                            ) : (
                                <div>Kraunasi...</div>
                            ))}
                        {error && <div>{error.toString()}</div>}
                    </Box>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <SessionsByDateChart gapi={gapi} viewId={ViewID} days={30} showPageViews={true} showUsers={true}/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <PageViewsPerPathChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <SessionsByDeviceCategoryChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <SessionsBySourceChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid>
                {/* <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <SessionsByHourChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <BounceRateChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <OrganicSearchesChart gapi={gapi} viewId={ViewID} days={30} />
                </Grid> */}
            </Grid>
        </div>
    )
}

export default Statistics
