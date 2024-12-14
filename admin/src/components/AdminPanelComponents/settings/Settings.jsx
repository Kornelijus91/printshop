import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Box, FormControl, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99.5%',
        marginTop: '1em',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            marginTop: '2em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '4em',
        },
    },
    body: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    formVariantOptionNameInfo: {
        width: '16em',
        [theme.breakpoints.up('xxl')]: {
            width: '20em',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '30em',
        },
    },
    textInput: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.juoda}`,
    },
    diasbleOutline: {
        border: 'none',
    },
    header: {
        margin: '0 1em 0 0',
        fontSize: '1.2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.62rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
}));

const Settings = ({ newChatrooms, newOrders, nustatymai, setNustatymai, setSnackbar }) => {

    const classes = useStyles();

    const handleSettingsChange = (e, field) => {
        setNustatymai({
            ...nustatymai,
            [field]: e.target.value
        });
    };

    const getSettings = async () => {
        try {
            const getSettingsRequest = await fetch("/users/getSettings/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const getSettingsResponse= await getSettingsRequest.json();
            if (getSettingsResponse.success) {
                setNustatymai({
                    maketavimoKaina: getSettingsResponse.maketavimoKaina,
                    shippingHome: getSettingsResponse.shippingHome,
                    shippingTeleport: getSettingsResponse.shippingTeleport,
                    shippingBus: getSettingsResponse.shippingBus
                });
            } 
        } catch (error) {
            setSnackbar({
                message: 'Nepavyko gauti nustatymų.',
                open: true,
            });
        }
    };

    useEffect(() => {
        getSettings();
        // eslint-disable-next-line
    }, []);

    return (
        <Box classes={{root: classes.root}}>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Nustatymai | {ProjectName}</title>  
            </Helmet>
            <h2 className={classes.header}>Pristatymas</h2>
            <Box sx={{borderTop: '1px solid black', padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined" sx={{display: 'flex', width: '100%'}}>
                    <h2 className={classes.header}>Į namus, kaina €:</h2>
                    <OutlinedInput
                        id="shippingHome_input"
                        type='number'
                        value={nustatymai.shippingHome}
                        placeholder='Eur...'
                        onChange={(e) => handleSettingsChange(e, 'shippingHome')}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                        autoComplete='off'
                    />
                </FormControl> 
                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined" sx={{display: 'flex', width: '100%'}}>
                    <h2 className={classes.header}>Paštomatas, kaina €:</h2>
                    <OutlinedInput
                        id="shippingTeleport_input"
                        type='number'
                        value={nustatymai.shippingTeleport}
                        placeholder='Eur...'
                        onChange={(e) => handleSettingsChange(e, 'shippingTeleport')}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                        autoComplete='off'
                    />
                </FormControl> 
                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined" sx={{display: 'flex', width: '100%'}}>
                    <h2 className={classes.header}>Autobusas, kaina €:</h2>
                    <OutlinedInput
                        id="shippingBus_input"
                        type='number'
                        value={nustatymai.shippingBus}
                        placeholder='Eur...'
                        onChange={(e) => handleSettingsChange(e, 'shippingBus')}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                        autoComplete='off'
                    />
                </FormControl> 
            </Box>
            <h2 className={classes.header}>Maketavimas</h2>
            <Box classes={{root: classes.body}} sx={{borderTop: '1px solid black', padding: '0.5rem 0'}}>
                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                    <h2 className={classes.header}>Kaina €:</h2>
                    <OutlinedInput
                        id="maketavimo_kaina_input"
                        type='number'
                        value={nustatymai.maketavimoKaina}
                        placeholder='Eur...'
                        onChange={(e) => handleSettingsChange(e, 'maketavimoKaina')}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                        autoComplete='off'
                    />
                </FormControl> 
            </Box>
        </Box>
    )
}

export default Settings
