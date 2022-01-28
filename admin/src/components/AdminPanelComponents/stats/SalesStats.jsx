import SalesChart from './SalesChart'
import PieChartComponent from './PieChartComponent'
import { Box, Button, CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ltLocale from "date-fns/locale/lt";
import { useState, useEffect } from 'react'; //useCallback
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '1em',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '1em',
            paddingTop: '1.5em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '2em',
            paddingTop: '2.5em',
        },
    },
    dates: {
        marginBottom: '1em',
        '& h2': {
            color: theme.myTheme.trecia,
            fontFamily: theme.myTheme.sriftas,
            fontSize: '1.3rem',
            margin: '0 .5em 0 0',
            padding: 0
        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        [theme.breakpoints.up('xxl')]: {
            '& h2': {
                color: theme.myTheme.trecia,
                fontFamily: theme.myTheme.sriftas,
                fontSize: '1.755rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            '& h2': {
                color: theme.myTheme.trecia,
                fontFamily: theme.myTheme.sriftas,
                fontSize: '2.6rem'
            },
        },
    },
    datePickerParent: {
        margin: '0 1em 1em 0',
        [theme.breakpoints.up('lg')]: {
            margin: '0 1em 0 0',
        },
    },
    chartBox: {   
        width: '100%',
        height: '30em',
        [theme.breakpoints.up('xxl')]: {
            height: '40.5em',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '60em',
        },
    },
    datepicker: {
        padding: '0',
        margin: '0',
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.trecia,
        width: '100%',
        borderRadius: '4px',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
        },
    },
    calendarIcon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35) translateX(-.5rem)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateX(-.7rem)'
        },
    },
    calendarPopover: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35) translateY(-4rem)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2) translateY(-7.5rem)'
        },
    },
    Button: {
        padding: '.8em 2em',
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        // [theme.breakpoints.up('xxl')]: {
        //     borderRadius: '6px',
        //     height: '3.375em',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     height: '5em',
        //     borderRadius: '9px',
        // },
    },
    ButtonLabel: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    ButtonDisabled: {
        backgroundColor: 'rgba(230, 57, 70, 0.7)',
    },
    loadingIconBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    loadingIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        }, 
    },
    sumUpBox: {
        width: '100%',
        backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.sriftoSpalva,
        borderRadius: '5px',
        fontFamily: theme.myTheme.sriftas,
        padding: '1em 3em',
        '& h2': {
            fontSize: '1.6rem'
        },
        '& p': {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.up('lg')]: {
            width: '65%',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            padding: '1.35em 4em',
            '& h2': {
                fontSize: '2.16rem'
            },
            '& p': {
                fontSize: '1.62rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            padding: '2em 6em',
            '& h2': {
                fontSize: '3.2rem'
            },
            '& p': {
                fontSize: '2.4rem'
            },
        }, 
    },
    bottomBox: {
        padding: '0 .5em',
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '0 2em',
        },
    },
    // piechartbox: {
    //     width: '30rem',
    //     height: '20em',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     [theme.breakpoints.up('xxl')]: {
    //         height: '27em',
    //     },
    //     [theme.breakpoints.up('xxxl')]: {
    //         height: '40em',
    //     }, 
    // },
    // suvestinebox: {
    //     width: '30rem',
    // },
}));

const SalesStats = ({ newChatrooms, newOrders, user, setSnackbar }) => {

    const classes = useStyles();

    const [dates, setDates] = useState({
        nuo: new Date().setDate(new Date().getDate() - 30),
        iki: new Date(),
    });

    const [stats, setStats] = useState([]);
    const [productstats, setProductStats] = useState([]);
    const [totals, setTotals] = useState({
        price: 0,
        discountedPrice: 0,
        orders: 0,
        sanaudos: 0,
    });

    const [gettingstats, setGettingstats] = useState(false);

    const handleNuoChange = (date) => {
        setDates({
            ...dates,
            nuo: new Date(date),
        });
    };

    const handleIkiChange = (date) => {
        setDates({
            ...dates,
            iki: new Date(date),
        });
        
    };

    const sumUp = () => {
        if (stats.length > 0) {
            var totalPrice = 0;
            var totalDiscountedPrice = 0;
            var totalOrders = 0;
            var totalSanaudos = 0;
            for (const item of stats) {
                totalPrice = totalPrice + item.totalPrice;
                totalDiscountedPrice = totalDiscountedPrice + item.totalDiscountedPrice;
                totalOrders = totalOrders + item.totalOrders;
                totalSanaudos = totalSanaudos + item.totalSanaudos;
            }
            setTotals({
                price: totalPrice,
                discountedPrice: totalDiscountedPrice,
                orders: totalOrders,
                sanaudos: totalSanaudos,
            });
        } else {
            setTotals({
                price: 0,
                discountedPrice: 0,
                orders: 0,
                sanaudos: 0,
            });
        }
    };

    const getStats = async () => {
        setGettingstats(true);
        setStats(response.data);
        setProductStats(response.groupedProducts);
        try {
            const req = await fetch("/administracija/getStats/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    nuo: dates.nuo,
                    iki: dates.iki,
                }),
            });
            const response = await req.json();
            if (response.success) {
                setGettingstats(false);
                setStats(response.data);
                setProductStats(response.groupedProducts);
            } else {
                setGettingstats(false);
                setSnackbar({
                    message: 'Klaida! Pabandykite vėliau.',
                    open: true,
                });
            }
        } catch (error) {
            setGettingstats(false);
            setSnackbar({
                message: 'Klaida! Pabandykite vėliau.',
                open: true,
            });
        }
    };

    useEffect(() => {
        getStats();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        sumUp();
        // eslint-disable-next-line
    }, [stats])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Statistika | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.dates}}>
                <h2>Nuo:</h2>
                <Box classes={{root: classes.datePickerParent}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ltLocale}>
                        <KeyboardDatePicker
                            disableToolbar
                            classes={{root: classes.datepicker}}
                            variant="inline"
                            format="yyyy-MM-dd" // "dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            // label="Nuo"
                            disableFuture={true}
                            autoOk={true}
                            invalidDateMessage='Netinkama data'
                            inputVariant="outlined"
                            value={dates.nuo}
                            onChange={handleNuoChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                                classes: {
                                    root: classes.calendarIcon,
                                },
                            }}
                            PopoverProps={{
                                classes: {
                                    root: classes.calendarPopover,
                                },
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                <h2>Iki:</h2>
                <Box classes={{root: classes.datePickerParent}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ltLocale}>
                        <KeyboardDatePicker
                            disableToolbar
                            classes={{root: classes.datepicker}}
                            variant="inline"
                            format="yyyy-MM-dd" // "dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            // label="Iki"
                            disableFuture={true}
                            autoOk={true}
                            invalidDateMessage='Netinkama data'
                            inputVariant="outlined"
                            value={dates.iki}
                            onChange={handleIkiChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                                classes: {
                                    root: classes.calendarIcon,
                                },
                            }}
                            PopoverProps={{
                                classes: {
                                    root: classes.calendarPopover,
                                },
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                <Button classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }} onClick={() => getStats()}>
                    Rodyti
                </Button>
            </Box>
            <Box classes={{root: classes.chartBox}}>
                {!gettingstats ? 
                    <SalesChart stats={stats}/>
                :
                    <Box classes={{root: classes.loadingIconBox}}>
                        <CircularProgress size={50} className={classes.loadingIcon}/>
                    </Box> 
                }
            </Box>
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start' alignItems='flex-start' classes={{root: classes.bottomBox}}>
                <Box classes={{root: classes.sumUpBox}}>
                    <Grid container>
                        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                            <h2>Laikotarpio suvestinė:</h2>
                            <p>Užsakymai: <b>{totals.orders}</b></p>
                            <p>Apyvarta: <b>{totals.price !== totals.discountedPrice ? (totals.discountedPrice).toFixed(2) : (totals.price).toFixed(2)}€</b></p>
                            <p>Sanaudos: <b>{(totals.sanaudos).toFixed(2)}€</b></p>
                            <p>Pelnas: <b>{(totals.discountedPrice - totals.sanaudos).toFixed(2)}€</b></p>
                        </Grid>
                        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                            <PieChartComponent stats={productstats}/>
                        </Grid>
                    </Grid>
                    {/* <Box classes={{root: classes.suvestinebox}}>
                        <h2>Laikotarpio suvestinė:</h2>
                        <p>Užsakymai: <b>{totals.orders}</b></p>
                        <p>Apyvarta: <b>{totals.price !== totals.discountedPrice ? (totals.discountedPrice).toFixed(2) : (totals.price).toFixed(2)}€</b></p>
                        <p>Sanaudos: <b>{(totals.sanaudos).toFixed(2)}€</b></p>
                        <p>Pelnas: <b>{(totals.discountedPrice - totals.sanaudos).toFixed(2)}€</b></p>
                    </Box>
                    <Box classes={{root: classes.piechartbox}}>
                        <PieChartComponent stats={productstats}/>
                    </Box>  */}
                </Box>
                
            </Box>
            {/* <Grid container>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Box classes={{root: classes.sumUpBox}}>
                        <h2>Laikotarpio suvestinė:</h2>
                        <p>Užsakymai: <b>{totals.orders}</b></p>
                        <p>Apyvarta: <b>{totals.price !== totals.discountedPrice ? (totals.discountedPrice).toFixed(2) : (totals.price).toFixed(2)}€</b></p>
                        <p>Sanaudos: <b>{(totals.sanaudos).toFixed(2)}€</b></p>
                        <p>Pelnas: <b>{(totals.discountedPrice - totals.sanaudos).toFixed(2)}€</b></p>
                    </Box>
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <Box classes={{root: classes.piechartbox}}>
                        <PieChartComponent stats={productstats}/>
                    </Box> 
                </Grid>
            </Grid> */}
            
        </Box>
    )
}

export default SalesStats
