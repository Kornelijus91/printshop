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
        width: '15em',
        [theme.breakpoints.up('xxl')]: {
            width: '20.25em',
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

const Settings = ({ newChatrooms, newOrders, maketavimoKaina, setMaketavimoKaina, setSnackbar }) => {

    const classes = useStyles();

    const handleMaketavimoKainaChange = (e) => {
        setMaketavimoKaina(e.target.value);
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
                setMaketavimoKaina(getSettingsResponse.maketavimoKaina);
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
            <Box classes={{root: classes.body}}>
                <h2 className={classes.header}>Maketavimo kaina, €:</h2>
                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                    <OutlinedInput
                        id="maketavimo_kaina_input"
                        type='number'
                        value={maketavimoKaina}
                        placeholder='Eur...'
                        onChange={handleMaketavimoKainaChange}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                        autoComplete='off'
                    />
                </FormControl> 
            </Box>
        </Box>
    )
}

export default Settings
