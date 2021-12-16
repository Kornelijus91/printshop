import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Accordion, AccordionSummary, AccordionDetails, FormControl, OutlinedInput, CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState, useEffect } from 'react';
import { FaRegImage } from "react-icons/fa";
import OrderConfirmModal from './OrderConfirmModal';

const useStyles = makeStyles((theme) => ({
    accountsBox: {
        backgroundColor: theme.myTheme.antra,
        borderRadius: '7px',
        padding: '1em',
        width: '100%',
        height: '85%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        '& h2': {
            margin: '0 1em 1em 0',
            padding: 0,
            fontSize: '1.2rem',
        },
        '& p': {
            margin: 0,
            padding: 0,
            fontSize: '.9rem',
        },
        [theme.breakpoints.up('md')]: {
            '& h2': {
                margin: 0,
                padding: 0,
                fontSize: '1.4rem',
            },
            '& p': {
                margin: 0,
                padding: 0,
                fontSize: '1rem',
            },
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            '& h2': {
                fontSize: '1.89rem',
            },
            '& p': {
                fontSize: '1.35rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            '& h2': {
                fontSize: '2.8rem',
            },
            '& p': {
                fontSize: '2rem',
            },
        },
    },
    columnNotLast: {
        borderRight: '1px solid #1D3557',
        borderBottom: '1px solid #1D3557',
        '& h2': {
            margin: '0 0 1em 0',
            padding: 0,
            fontSize: '1.2rem',
        },
        '& p': {
            margin: '0 0 .7em 0',
            padding: 0,
            fontSize: '.9rem',
        },
        [theme.breakpoints.up('md')]: {
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '1.4rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '1rem',
            },
        },
        [theme.breakpoints.up('xxl')]: {
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '1.89rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '1.35rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRight: '2px solid #1D3557',
            borderBottom: '2px solid #1D3557',
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '2.8rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '2rem',
            },
        },
    },
    columnLast: {
        borderBottom: '1px solid #1D3557',
        '& h2': {
            margin: '0 0 1em 0',
            padding: 0,
            fontSize: '1.2rem',
        },
        '& p': {
            margin: '0 0 .7em 0',
            padding: 0,
            fontSize: '.9rem',
        },
        [theme.breakpoints.up('md')]: {
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '1.4rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '1rem',
            },
        },
        [theme.breakpoints.up('xxl')]: {
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '1.89rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '1.35rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderBottom: '2px solid #1D3557',
            '& h2': {
                margin: '0 0 1em 0',
                padding: 0,
                fontSize: '2.8rem',
            },
            '& p': {
                margin: '0 0 .7em 0',
                padding: 0,
                fontSize: '2rem',
            },
        },
    },
    Button: {
        width: '100%',
        height: '2.5em',
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
            height: '3.375em',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '5em',
            borderRadius: '9px',
        },
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
    icon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    accordion: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.sriftoSpalva,
    },
    accSum: {
        borderBottom: '1px solid rgba(241, 250, 238, 0.7)'
    },
    accdet: {
        [theme.breakpoints.up('md')]: {
            paddingRight: '3.8em'
        },
    },
    accDetGridItem: {
        marginBottom: '1em',
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        },
    },
    kainuhr: {
        display: 'block', 
        height: '1px',
        border: 0, 
        borderTop: `1px solid ${theme.myTheme.sriftoSpalva}`,
        margin: '1em 0', 
        padding: 0
    },
    formVariantOptionNameInfo: {
        width: '100%',
    },
    textInput: {
        marginBottom: "1em",
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
        }, 
    },
    diasbleOutline: {
        border: 'none',
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
}));

const OrderDetail = ({ order, user, getOrders, ordersPage, setOrder, setSnackbar, orderFilter }) => {

    const classes = useStyles();

    const [modal, setModal] = useState(false);
    const [updateingSanaudas, setUpdateingSanaudas] = useState(false);
    const [sanaudos, setSanaudos] = useState(0);

    const handleModalOpen = () => {
        setModal(true);
    };

    const shouldShow = (option, summon, name) => {
        for (const item of option) {
            if (item.summon === summon && item.name !== name) {
                return true;
            }
        }
        return false;
    };

    const handleSanaudosChange = (e) => {
        setSanaudos(e.target.value);
    };

    const updateSanaudas = async () => {
        setUpdateingSanaudas(true);
        try {
            const req = await fetch("/administracija/updateSanaudas/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    orderID: order.id,
                    san: sanaudos
                }),
            });
            const response = await req.json();
            if (response.success) {
                getOrders(ordersPage, orderFilter);
                setSnackbar({
                    message: 'Užsakymo sanaudos atnaujintos.',
                    open: true,
                });
                setUpdateingSanaudas(false);
            } else {
                setUpdateingSanaudas(false);
                setSnackbar({
                    message: 'Klaida! Pabandykite vėliau.',
                    open: true,
                });
            }
        } catch (error) {
            setUpdateingSanaudas(false);
            setSnackbar({
                message: 'Klaida! Pabandykite vėliau.',
                open: true,
            });
        }
    };

    useEffect(() => {
        setSanaudos(order.sanaudos);
        // eslint-disable-next-line
    }, [order])

    return (
        <Box classes={{root: classes.accountsBox}}>
            <OrderConfirmModal 
                order={order} 
                user={user} 
                getOrders={getOrders} 
                ordersPage={ordersPage} 
                setOrder={setOrder} 
                setSnackbar={setSnackbar} 
                orderFilter={orderFilter} 
                modal={modal} 
                setModal={setModal} 
            />
            <Grid container spacing={4}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{borderBottom: '1px solid #1D3557'}}>
                    <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                        <Box>
                            <h2>Užsakymo NR - {order.uzsakymoNr}</h2>
                        </Box>
                        <Box>
                            <h2>Pateikimo data - {new Date(order.createdAt).getFullYear()+"-"+(new Date(order.createdAt).getMonth() + 1)+"-"+new Date(order.createdAt).getDate()}</h2>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <h2 style={{marginRight: '.2em'}}>Statusas -</h2>
                            <h2 style={
                                order.status === 'Įvykdytas' ? 
                                    {color: '#26a69a'}
                                : order.status === 'Apmokėtas' ? 
                                    {color: '#f4a261'}
                                : order.status === 'Atšauktas' ? 
                                    {color: '#E63946'}
                                : 
                                    {color: '#1D3557'}
                            }>
                                {order.status}
                            </h2>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.columnNotLast}>
                    <h2>Užsakovas</h2>
                    <p>Vardas: <b>{order.delivery.firstName}</b></p>
                    <p>Pavardė: <b>{order.delivery.lastName}</b></p>
                    <p>El. paštas: <b>{order.delivery.email}</b></p>
                    <p>Tel. Nr.: <b>{order.delivery.phone}</b></p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.columnNotLast}>
                    <h2>Pristatymo adresas</h2>
                    <p>Miestas: <b>{order.delivery.city}</b></p>
                    <p>Adresas: <b>{order.delivery.address}</b></p>
                    <p>Pašto kodas: <b>{order.delivery.zipcode}</b></p>
                    {order.delivery.juridinis &&
                        <>
                            <p>Įmonės pavadinimas: <b>{order.delivery.companyName}</b></p>
                            <p>Įmonės kodas: <b>{order.delivery.companyCode}</b></p>
                            <p>Įmonės adresas: <b>{order.delivery.companyAddress}</b></p>
                            <p>Įmonės PVM kodas: <b>{order.delivery.companyPVM}</b></p>
                        </>
                    }
                    {order.delivery.pastabaKurjeriui !== '' &&
                        <p>Pastaba kurjeriui: <b>{order.delivery.pastabaKurjeriui}</b></p>
                    }
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.columnNotLast}>
                    <h2>Kainos</h2>
                    {order.nuolaidosKodas !== '' &&
                        <>
                            <p>Panaudotas nuolaidos kodas: <b>{order.nuolaidosKodas}</b></p>
                            <p>Kodo nuolaida: <b>{order.nuolaidosKodoNuolaida}%</b></p>
                        </>
                    }
                    {/* {order.TRDiscount &&
                        <p>Tavo Reklama klubo nuolaida: <b>{order.TRDiscount}%</b></p>
                    } */}
                    {order.price !== order.discountPrice ?
                            <>  
                                <p>Pilna kaina: <b>{(order.price).toFixed(2)}€</b></p>
                                <p>Suteikta nuolaida: <b>{(order.price - order.discountPrice).toFixed(2)}€</b></p>
                                <p>Galutinė kaina su nuolaidomis: <b>{(order.discountPrice).toFixed(2)}€</b></p>
                            </>
                        :
                            <>  
                                <p>Galutinė kaina: <b>{(order.price).toFixed(2)}€</b></p>
                            </>
                    }
                    <hr className={classes.kainuhr} />
                    <h2>Sanaudos, €</h2>
                    <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                        <OutlinedInput
                            id="saunaudos_input"
                            type='number'
                            value={sanaudos}
                            placeholder='Eur...'
                            onChange={handleSanaudosChange}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                            autoComplete='off'
                        />
                    </FormControl> 
                    <Button 
                        classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }}
                        disabled={updateingSanaudas}
                        onClick={updateSanaudas}
                    >
                        {updateingSanaudas ? <CircularProgress size={20} className={classes.loadingIcon}/> : "Išsaugoti" }
                    </Button>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.columnLast}>
                    <h2>Veiksmai</h2>
                    <Button classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }} disabled={order.status !== 'Apmokėtas'} onClick={handleModalOpen}>
                        Įvykdyti
                    </Button>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {order.cartItems.map((item) => 
                        <Accordion key={item.id} classes={{root: classes.accordion}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.icon}/>}
                                aria-controls="panel1a-content"
                                id={`item.id`}
                                classes={{root: classes.accSum}}
                            >
                                <Grid container>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <p>{item.name}</p>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <p>Kiekis: {item.quantity}</p>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <p>Gamybos laikas: {item.gamybosLaikas}</p>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails classes={{root: classes.accdet}}>
                                <Grid container>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.accDetGridItem}>
                                        {item.options.map((opt, i) => 
                                            <>
                                                {(opt.type === 0 || opt.type === 2) && (!opt.summon || opt.summon === 0) ? 
                                                    <p key={i}>{opt.name}: <b>{opt.value}</b></p>
                                                : (opt.type === 0 || opt.type === 2) && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) ?
                                                    <p key={i}>{opt.name}: <b>{opt.value}</b></p>
                                                : opt.type === 1 && (!opt.summon || opt.summon === 0) ?
                                                    <p key={i}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}, {opt.secondName}- {opt.secondValue}</b></p>
                                                : opt.type === 1 && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) ?
                                                    <p key={i}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}, {opt.secondName}- {opt.secondValue}</b></p>
                                                : opt.type === 3 && (!opt.summon || opt.summon === 0) ?
                                                    <p key={i}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}</b></p>
                                                : opt.type === 3 && opt.summon && opt.summon !== 0 && shouldShow(item.options, opt.summonID, opt.name) &&
                                                    <p key={i}>{opt.name}: <b>{opt.firstName}- {opt.firstValue}</b></p>
                                                }
                                            </>
                                        )}
                                        <p>Maketavimas: <b>{item.maketavimoKaina > 0 ? 'Taip' : 'Ne'}</b></p>
                                        {item.pastaba !== '' && 
                                            <p>Pastaba: <b>{item.pastaba}</b></p>
                                        }
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.accDetGridItem}>
                                        {item.discount > 0 && 
                                            <p>Nuolaida: <b>{item.discount}%</b></p>
                                        }
                                        {order.TRDiscount > 0 && 
                                            <p>TR Klubo nuolaida: <b>{order.TRDiscount}%</b></p>
                                        }
                                        <p>Vieneto kaina: <b>{(item.unitPrice).toFixed(2)}€</b></p>
                                        <p>Viso kaina: <b>{(item.price).toFixed(2)}€</b></p>
                                        {item.maketavimoKaina > 0 &&
                                            <p>Maketavimo kaina: <b>{(item.maketavimoKaina).toFixed(2)}€</b></p>
                                        }
                                        {item.price !== item.discountedPrice && 
                                            <p>Suteiktos nuolaidos: <b>{(item.price - (item.price * ((100 - (item.discount + order.TRDiscount)) / 100))).toFixed(2)}€</b></p>
                                        }
                                        {item.price !== item.discountedPrice && 
                                            <p>Viso kaina su nuolaidomis: <b>{((item.price * ((100 - (item.discount + order.TRDiscount)) / 100)) + item.maketavimoKaina).toFixed(2)}€</b></p>
                                        }
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.accDetGridItem}>
                                        <Button 
                                            component='a'
                                            href={item.image} 
                                            download 
                                            disabled={item.image === '' || item.image === null || !item.image }
                                            classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }}
                                            startIcon={<FaRegImage size={20} className={classes.icon}/>}
                                        >
                                            Parsisiusti
                                        </Button>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderDetail
