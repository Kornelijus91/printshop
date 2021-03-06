import { Box, Stepper, Step, StepLabel, StepConnector } from '@material-ui/core'; // , Grid, Tooltip, Button
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import DeliveryInfo from './DeliveryInfo.jsx';
import Checkout from './Checkout.jsx';
import Thanks from './Thanks.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '80vh',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        justifyContent: 'center',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        padding: '1em',
        [theme.breakpoints.up('xxl')]: {
            '-moz-box-shadow': 'inset 0 0 7px #000000',
            '-webkit-box-shadow': 'inset 0 0 7px #000000',
            boxShadow: 'inset 0 0 7px #000000',
            padding: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            '-moz-box-shadow': 'inset 0 0 10px #000000',
            '-webkit-box-shadow': 'inset 0 0 10px #000000',
            boxShadow: 'inset 0 0 10px #000000',
            padding: '2em',
        },
    },
    body: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xl')]: {
            width: '60%',
        },
    },
    stepper: {
        backgroundColor: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            // padding: '6rem 0 1.5rem 0',
            fontSize: '1.4rem',
            marginBottom: '.5em'
        },
        [theme.breakpoints.up('xxxl')]: {
            // padding: '8rem 0 2rem 0',
            fontSize: '1.8rem',
            marginBottom: '1em'
        },
    },
    steplabel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    step: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
    },
    stepConnector: {
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2rem'
        },
    },
    stepIcon: {
        fontSize: '1.5rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.25rem',
            marginTop: '-.3rem',
            outline: `1.5rem solid ${theme.myTheme.trecia}`
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3rem',
            marginTop: '-.6rem',
            outline: `1.5rem solid ${theme.myTheme.trecia}`
        },
    },
}));

const Order = ({ pasirinktasPristatymoBudas, setPasirinktasPristatymoBudas, setCart, setKodoNuolaida, delivery, setDelivery, loggedIn, token, getAddresses, addresses, cart, kodoNuolaida, priceSum, pasirinktasGamybosLaikas, findMaxDiscount, getItemProductionCost, roundTwoDec }) => {

    const classes = useStyles();

    const [orderStep, setOrderStep] = useState(0);

    useEffect(() => {
        if (cart.length <= 0) {
            setOrderStep(2)
        }
        // eslint-disable-next-line
    }, [])


    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>U??sakymas | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.body}}>
                <Stepper activeStep={orderStep} alternativeLabel classes={{root: classes.stepper}} connector={<StepConnector classes={{root: classes.stepConnector}}/>}>
                    <Step>
                        <StepLabel 
                            classes={{label: classes.steplabel}}
                            StepIconProps={{ 
                                classes: { text: classes.step, root: classes.stepIcon } 
                            }}
                        >
                            Pristatymas
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel 
                            classes={{label: classes.steplabel}}
                            StepIconProps={{ 
                                classes: { text: classes.step, root: classes.stepIcon } 
                            }}
                        >
                            Mok??jimas
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel 
                            classes={{label: classes.steplabel}}
                            StepIconProps={{ 
                                classes: { text: classes.step, root: classes.stepIcon } 
                            }}
                        >
                            A??i??
                        </StepLabel>
                    </Step>
                </Stepper>
                {
                    {
                        0: <DeliveryInfo 
                            delivery={delivery} 
                            setDelivery={setDelivery} 
                            loggedIn={loggedIn} 
                            token={token} 
                            getAddresses={getAddresses} 
                            addresses={addresses} 
                            setOrderStep={setOrderStep}
                        />,
                        1: <Checkout 
                            token={token} 
                            delivery={delivery} 
                            setDelivery={setDelivery} 
                            setOrderStep={setOrderStep} 
                            cart={cart} 
                            kodoNuolaida={kodoNuolaida} 
                            priceSum={priceSum} 
                            loggedIn={loggedIn} 
                            setCart={setCart} 
                            setKodoNuolaida={setKodoNuolaida} 
                            pasirinktasGamybosLaikas={pasirinktasGamybosLaikas} 
                            findMaxDiscount={findMaxDiscount}
                            getItemProductionCost={getItemProductionCost}
                            roundTwoDec={roundTwoDec}
                            pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}
                            // setPasirinktasPristatymoBudas={setPasirinktasPristatymoBudas}
                        />,     
                        2: <Thanks pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}/>
                    }[orderStep]
                }
            </Box>
        </Box>
    )
}

export default Order
