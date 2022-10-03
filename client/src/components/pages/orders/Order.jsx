import { Box, Stepper, Step, StepLabel } from '@material-ui/core';
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
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    stepper: {
        fontSize: theme.myTheme.sizeS,
        backgroundColor: 'transparent',
    },
    steplabel: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    step: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    stepConnector: {
        fontSize: theme.myTheme.sizeM,
        backgroundColor: theme.myTheme.sZalia.main,
        width: '70%',
        height: '.2em',
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        transform: 'translate(-60%, .8em)',
        [theme.breakpoints.up('lg')]: {
            width: '90%',
            transform: 'translate(-52%, .8em)',
        },
    },
    stepIcon: {
        fontSize: theme.myTheme.sizeXL,
    },
}));

const Order = ({ pasirinktasPristatymoBudas, setCart, setKodoNuolaida, delivery, setDelivery, loggedIn, token, getAddresses, addresses, cart, kodoNuolaida, priceSum, pasirinktasGamybosLaikas, findMaxDiscount, getItemProductionCost, roundTwoDec }) => {

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
                <title>Užsakymas | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.body}}>
                <Stepper 
                    activeStep={orderStep} 
                    alternativeLabel 
                    classes={{root: classes.stepper}} 
                    connector={
                        <div className={classes.stepConnector}/>
                    }
                >
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
                            Mokėjimas
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel 
                            classes={{label: classes.steplabel}}
                            StepIconProps={{ 
                                classes: { text: classes.step, root: classes.stepIcon } 
                            }}
                        >
                            Ačiū
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
                        />,     
                        2: <Thanks pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}/>
                    }[orderStep]
                }
            </Box>
        </Box>
    )
}

export default Order
